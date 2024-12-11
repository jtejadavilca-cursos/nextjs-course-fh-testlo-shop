"use server";
import prisma from "@/lib/prisma";

export const getStockBySlug = async (slug: string): Promise<number> => {
    try {
        const product = await prisma.product.findUnique({
            where: {
                slug,
            },
        });

        if (!product) {
            return 0;
        }

        return product.inStock;
    } catch (error) {
        console.error(error);
        throw new Error(`Error while fetching stock with slug: ${slug}`);
    }
};
