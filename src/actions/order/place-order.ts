"use server";

import prisma from "@/lib/prisma";
import { Product } from "@prisma/client";

import { auth } from "@/auth.config";
import { sleep } from "@/utils";
import type { Address, Size } from "@/interfaces";

interface ProductToOrder {
    productId: string;
    quantity: number;
    size: Size;
}

export const placeOrder = async (productsInOrder: ProductToOrder[], address: Address) => {
    try {
        const session = await auth();
        const userId = session?.user.id;
        if (!userId) {
            return {
                success: false,
                message: "User not authenticated",
            };
        }

        await sleep(3);

        // Init transaction:
        const prismaTx = await prisma.$transaction(async (tx) => {
            try {
                // 1. Getting producs and user from DB to use their prices
                const ids = [...new Set(productsInOrder.map((product) => product.productId))];
                const products = await tx.product.findMany({
                    where: {
                        id: {
                            in: ids,
                        },
                    },
                });

                const productsMap = products.reduce((acc: Record<string, Product>, product) => {
                    acc[product.id] = product;
                    return acc;
                }, {});

                // 2. Before anything, check if all products have enough stock, if not, throw an error
                const quantityByProduct = ids.map((id) => ({
                    productId: id,
                    quantityToBuy: 0,
                }));
                productsInOrder.forEach((prod) => {
                    quantityByProduct.find((q) => q.productId === prod.productId)!.quantityToBuy += prod.quantity;
                });

                quantityByProduct.forEach((qp) => {
                    if (qp.quantityToBuy > productsMap[qp.productId].inStock) {
                        console.error("Not enough stock");
                        throw new Error(`Product "${productsMap[qp.productId].title}" has not enough stock`);
                    }
                });

                console.log("Start updating stock");
                // 3. Update stock of products
                await Promise.all(
                    quantityByProduct.map(async (qp) => {
                        await tx.product.update({
                            where: {
                                id: qp.productId,
                            },
                            data: {
                                inStock: {
                                    decrement: qp.quantityToBuy,
                                },
                            },
                        });
                    })
                );

                // 2. Calculating total items in order
                const itemsInOrder = productsInOrder.reduce((count, prod) => count + prod.quantity, 0);

                // 3. Calculating total amount, subTotal and taxes of the order
                const subTotalAmount = productsInOrder.reduce((total, prod) => {
                    const product = productsMap[prod.productId];
                    if (!product) throw new Error(`Product ${prod.productId} not found`);

                    return total + product.price * prod.quantity;
                }, 0);

                const taxes = subTotalAmount * 0.15;
                const totalAmount = subTotalAmount + taxes;
                //---------------------

                // 4.1. Create order - Master-Detail
                const order = await tx.order.create({
                    data: {
                        subTotal: subTotalAmount,
                        tax: taxes,
                        total: totalAmount,
                        itemsInOrder,
                        userId,
                        OrderItem: {
                            createMany: {
                                data: productsInOrder.map((prod) => ({
                                    quantity: prod.quantity,
                                    price: productsMap[prod.productId].price,
                                    size: prod.size,
                                    productId: prod.productId,
                                })),
                            },
                        },
                        OrderAddress: {
                            create: {
                                firstName: address.firstName,
                                lastName: address.lastName,
                                address: address.address,
                                address2: address.address2,
                                postalCode: address.postalCode,
                                city: address.city,
                                countryId: address.country,
                                phone: address.phone,
                            },
                        },
                    },
                });

                // 4.2. Return order successfully
                return {
                    order,
                    itemsInOrder,
                    subTotalAmount,
                    taxes,
                    totalAmount,
                    updatedProducts: [],
                    orderAddress: {},
                };
            } catch (error) {
                throw error;
            }
        });
        return {
            success: true,
            message: "Order placed successfully",
            order: prismaTx.order,
            itemsInOrder: prismaTx.itemsInOrder,
            subTotalAmount: prismaTx.subTotalAmount,
            taxes: prismaTx.taxes,
            totalAmount: prismaTx.totalAmount,
        };
    } catch (error: any) {
        console.error("Aqui..");
        return {
            success: false,
            message: error?.message,
        };
    }
};
