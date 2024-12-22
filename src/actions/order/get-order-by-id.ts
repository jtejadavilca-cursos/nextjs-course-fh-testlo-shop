"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderById = async (orderId: string) => {
    try {
        const session = await auth();
        const userId = session?.user.id;
        const userRole = session?.user.role;
        console.log("User role: ", userRole);

        const order = await prisma.order.findUnique({
            where: {
                id: orderId,
                userId: userRole === "ADMIN" ? undefined : userId,
            },
            include: {
                OrderItem: {
                    include: {
                        product: {
                            include: {
                                ProductImage: {
                                    select: {
                                        url: true,
                                    },
                                },
                            },
                        },
                    },
                },
                OrderAddress: {
                    include: {
                        country: true,
                    },
                },
            },
        });

        if (!order) {
            return null;
        }

        return {
            ...order,
            items: order.OrderItem.map((oi) => ({
                ...oi,
                product: {
                    ...oi.product,
                    images: oi.product.ProductImage.map((pi) => pi.url),
                },
            })),
        };
    } catch (error) {
        console.error(error);
        throw new Error(`Error while fetching order with id: ${orderId}`);
    }
};
