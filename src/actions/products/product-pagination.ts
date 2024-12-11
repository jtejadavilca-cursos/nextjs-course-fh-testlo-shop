"use server";

import prisma from "@/lib/prisma";
import { Gender } from "@prisma/client";

interface PaginationOptions {
    page: number;
    limit: number;
    gender?: string;
}

export const getPaginatedProductsWithImages = async ({ page = 1, limit = 12, gender }: PaginationOptions) => {
    try {
        //1. Obtaining products
        const products = await prisma.product.findMany({
            where: {
                gender: gender as Gender,
            },
            take: limit,
            skip: (page - 1) * limit,
            include: {
                ProductImage: {
                    take: 2,
                    select: {
                        url: true,
                    },
                },
            },
        });

        // 2. Calculating total of pages
        const totalProducts = await prisma.product.count({
            where: {
                gender: gender as Gender,
            },
        });

        const totalPages = Math.ceil(totalProducts / limit) ?? 1;

        return {
            currentPage: page,
            totalPages: totalPages,
            products: products.map((p) => ({
                ...p,
                images: p.ProductImage.map((i) => i.url),
            })),
        };
    } catch (error) {
        console.error(error);
    }
    return { products: [], totalPages: 1, currentPage: 1 };
};
