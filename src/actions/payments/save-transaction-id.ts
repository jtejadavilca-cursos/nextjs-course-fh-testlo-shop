"use server";

import prisma from "@/lib/prisma";

export const saveTransactionId = async (transactionId: string, orderId: string) => {
    try {
        const orderExist =
            (await prisma.order.count({
                where: {
                    id: orderId,
                },
            })) > 0;

        if (!orderExist) {
            return {
                success: false,
                message: `Order with id ${orderId} not found`,
            };
        }

        const savedOrderWithTransactionId = await prisma.order.update({
            where: {
                id: orderId,
            },
            data: {
                transactionId,
            },
        });

        return {
            success: true,
            savedTransactionId: savedOrderWithTransactionId,
        };
    } catch (error) {
        console.error("Error saving transactionId", error);
    }

    return {
        success: false,
        message: "Error saving transactionId",
    };
};
