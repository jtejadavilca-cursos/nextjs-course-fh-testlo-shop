import prisma from "@/lib/prisma";

export const getProductBySlug = async (slug: string) => {
    try {
        const product = await prisma.product.findUnique({
            where: {
                slug,
            },
            include: {
                ProductImage: {
                    select: {
                        id: true,
                        url: true,
                    },
                },
            },
        });

        if (!product) {
            return null;
        }

        return {
            ...product,
            images: product.ProductImage.map((i) => i.url),
        };
    } catch (error) {
        console.error(error);
        throw new Error(`Error while fetching product with slug: ${slug}`);
    }
};
