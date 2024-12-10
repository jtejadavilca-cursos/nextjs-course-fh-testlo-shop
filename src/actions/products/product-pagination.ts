"use server";

import { Category } from "@/interfaces";
import prisma from "@/lib/prisma";

interface PaginationOptions {
    page: number;
    limit: number;
    category?: Category;
}

export const getPaginatedProductsWithImages = async ({ page = 1, limit = 12, category }: PaginationOptions) => {
    try {
        //1. Obtaining products
        const products = await prisma.product.findMany({
            where: {
                gender: category,
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
                gender: category,
            },
        });

        const totalPages = Math.ceil(totalProducts / limit) ?? 1;

        return {
            currentPage: page,
            totalPages: totalPages, //TODO: Calculate total pages
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
