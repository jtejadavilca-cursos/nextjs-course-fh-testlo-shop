"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrdersByUser = async () => {
    try {
        const session = await auth();
        const userId = session?.user.id;

        const orders = await prisma.order.findMany({
            where: {
                userId,
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

        return orders.map((order) => ({
            ...order,
            items: order.OrderItem.map((oi) => ({
                ...oi,
                product: {
                    ...oi.product,
                    images: oi.product.ProductImage.map((pi) => pi.url),
                },
            })),
        }));
    } catch (error) {
        console.error(error);
        throw new Error("Error while fetching orders");
    }
};
