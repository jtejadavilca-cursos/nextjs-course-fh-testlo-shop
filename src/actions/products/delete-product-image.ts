"use server";

import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const deleteProductImage = async (imageId: string, imageUrl: string) => {
    try {
        if (!imageUrl.startsWith("http")) {
            return {
                success: false,
                message: "Invalid image URL",
            };
        }

        const imageName = imageUrl.split("/").pop()?.split(".")[0];

        if (imageName) {
            await cloudinary.uploader.destroy(`teslo-products-nextjs-fh/${imageName}`, {
                invalidate: true,
            });

            const deletedImage = await prisma.productImage.delete({
                where: {
                    id: imageId,
                },
                select: {
                    product: {
                        select: {
                            slug: true,
                        },
                    },
                },
            });

            // Revalidate paths
            revalidatePath(`/admin/products`);
            revalidatePath(`/admin/product/${deletedImage.product.slug}`);
            revalidatePath(`/product/${deletedImage.product.slug}`);
        }

        return {
            success: true,
        };
    } catch (error) {
        return {
            success: false,
            message: "Error deleting image",
        };
    }
};
