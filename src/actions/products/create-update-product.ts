"use server";

import { Size } from "@/interfaces";
import prisma from "@/lib/prisma";
import { Gender } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { uploadProductImages } from "./upload-product-images";

const productSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    title: z.string().min(3).max(255),
    slug: z.string().min(3).max(255),
    description: z.string(),
    price: z.coerce
        .number()
        .min(0)
        .positive()
        .transform((v) => Number(v.toFixed(2))),
    inStock: z.coerce
        .number()
        .min(0)
        .transform((v) => Number(v.toFixed(0))),
    categoryId: z.string().uuid(),
    sizes: z.coerce.string().transform((v) => v.split(",")),
    tags: z.string(),
    gender: z.nativeEnum(Gender),
});

export const createUpdateProduct = async (formData: FormData) => {
    const data = Object.fromEntries(formData);
    const productParsed = productSchema.safeParse(data);

    if (!productParsed.success) {
        return {
            success: false,
            error: productParsed.error,
        };
    }

    const product = productParsed.data;
    product.slug = product.slug.trim().toLowerCase().replace(/ /g, "-");

    const prismaTx = await prisma.$transaction(async () => {
        const { id, ...productToSave } = product;

        console.log(id ? "Updating product..." : "Creating product...");

        const tagsArray = productToSave.tags.split(",").filter((t) => t.trim().length > 0 && t.trim().length < 255);
        const productSaved = id
            ? await prisma.product.update({
                  where: { id },
                  data: {
                      ...productToSave,
                      tags: {
                          set: tagsArray,
                      },
                      sizes: {
                          set: productToSave.sizes as Size[],
                      },
                  },
              })
            : await prisma.product.create({
                  data: {
                      ...productToSave,
                      tags: {
                          set: tagsArray,
                      },
                      sizes: {
                          set: productToSave.sizes as Size[],
                      },
                  },
              });

        // Upload and save images
        const hastImages = formData.has("images");
        console.log(hastImages ? "Uploading images..." : "No images to upload");
        if (formData.has("images")) {
            const images = await uploadProductImages(formData.getAll("images") as File[]);
            if (!images) {
                throw new Error("Error uploading images, rolling back transaction");
            }

            //Saving images
            await prisma.productImage.createMany({
                data: images.map((image) => ({
                    url: image,
                    productId: productSaved.id,
                })),
            });
        }

        return {
            data: productSaved,
        };
    });

    revalidatePath("/admin/products");
    revalidatePath(`/admin/product/${prismaTx.data.slug}`);
    revalidatePath(`/product/${prismaTx.data.slug}`);

    return {
        success: true,
        product: prismaTx.data,
    };
};
