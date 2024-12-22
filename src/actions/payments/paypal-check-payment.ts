"use server";

import { PayPalOrderStatusResponse } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (transactionId: string) => {
    const paypalBearerToken = await getPaypalBearerToken();
    if (!paypalBearerToken) {
        return { success: false, message: "Error getting PayPal token" };
    }

    const response = await fetch(`${process.env.PAYPAL_ORDERS_URL}/${transactionId}`, {
        cache: "no-cache",
        headers: {
            Authorization: `Bearer ${paypalBearerToken}`,
        },
    });

    if (response.ok) {
        const data: PayPalOrderStatusResponse = await response.json();
        console.log("paypalCheckPayment data=", data);
        if (data.status === "COMPLETED") {
            // Update order status
            const orderId = data.purchase_units[0].invoice_id;
            const updatedStatus = await updateOrderStatusAsPaid(orderId);
            if (!updatedStatus.success) {
                return { success: false, message: updatedStatus.message };
            }

            // Return success
            return { success: true };
        }
    }

    return { success: false, message: "Payment not completed" };
};

const getPaypalBearerToken = async () => {
    const response = await fetch(process.env.PAYPAL_OAUTH_URL ?? "", {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(
                `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
            ).toString("base64")}`,
        },
        body: "grant_type=client_credentials",
    });

    if (response.ok) {
        const data = await response.json();
        return data.access_token;
    }

    return null;
};

const updateOrderStatusAsPaid = async (orderId: string) => {
    // Update order status as paid
    try {
        await prisma.order.update({
            where: {
                id: orderId,
            },
            data: {
                isPaid: true,
                paidAt: new Date(),
            },
        });

        // Revalidate path
        revalidatePath(`/orders/${orderId}`);
        return { success: true };
    } catch (error) {
        console.error("Error updating order status as paid", error);
        return { success: false, message: "Error updating order status as paid" };
    }
};
