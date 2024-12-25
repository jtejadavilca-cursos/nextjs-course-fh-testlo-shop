"use client";

import { useForm } from "react-hook-form";
import clsx from "clsx";
import { CategoryDomain, ProductDomain, ProductImageDomain } from "@/interfaces";
import { createUpdateProduct, deleteProductImage } from "@/actions";
import { ProductImage } from "@/components";
import { useRouter } from "next/navigation";

interface Props {
    product: (ProductDomain & { ProductImage?: ProductImageDomain[] }) | null;
    categories: CategoryDomain[];
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

interface FormInputs {
    title: string;
    slug: string;
    description: string;
    price: number;
    inStock: number;
    sizes: string[];
    tags: string;
    gender: "men" | "women" | "kid" | "unisex";
    categoryId: string;

    //TODO: Images
    images?: FileList;
}

export const ProductForm = ({ product, categories }: Props) => {
    const router = useRouter();
    const { register, handleSubmit, formState, getValues, setValue, watch } = useForm<FormInputs>({
        defaultValues: {
            ...product,
            sizes: product?.sizes ?? [],
            tags: (product?.tags ?? [""]).join(", "),
            images: undefined,
        },
    });

    watch("sizes");
    const onSizeChanged = (size: string) => {
        const sizes = new Set(getValues("sizes"));
        sizes.has(size) ? sizes.delete(size) : sizes.add(size);
        setValue("sizes", Array.from(sizes));
    };

    const onSubmit = async (data: FormInputs) => {
        const { images, ...productToSave } = data;

        const formData = new FormData();
        if (product?.id) {
            formData.append("id", product?.id ?? "");
        }
        formData.append("title", productToSave.title);
        formData.append("slug", productToSave.slug);
        formData.append("description", productToSave.description);
        formData.append("price", productToSave.price.toString());
        formData.append("inStock", productToSave.inStock.toString());
        formData.append("sizes", productToSave.sizes.toString());
        formData.append("tags", productToSave.tags);
        formData.append("categoryId", productToSave.categoryId);
        formData.append("gender", productToSave.gender);

        if (images) {
            for (let i = 0; i < images.length; i++) {
                formData.append("images", images[i]);
            }
        }

        const resp = await createUpdateProduct(formData);
        if (resp.success) {
            console.log("Product saved successfully");
            router.replace(`/admin/product/${resp.product?.slug}`);
        } else {
            console.error(resp.error);
        }
    };

    const onDeleteImage = async (imageId: string, imageUrl: string) => {
        const resp = await deleteProductImage(imageId, imageUrl);
        if (resp.success) {
            console.log("Image deleted successfully");
        } else {
            console.error("Error deleting image", resp.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
            {/* Textos */}
            <div className="w-full">
                <div className="flex flex-col mb-2">
                    <span>Título</span>
                    <input
                        type="text"
                        className="p-2 border rounded-md bg-gray-200"
                        {...register("title", { required: true })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Slug</span>
                    <input
                        type="text"
                        className="p-2 border rounded-md bg-gray-200"
                        {...register("slug", { required: true })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Descripción</span>
                    <textarea
                        rows={5}
                        className="p-2 border rounded-md bg-gray-200"
                        {...register("description", { required: true })}
                    ></textarea>
                </div>

                <div className="flex flex-col mb-2">
                    <span>Price</span>
                    <input
                        type="number"
                        className="p-2 border rounded-md bg-gray-200"
                        {...register("price", { required: true, min: 0 })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Stock</span>
                    <input
                        type="number"
                        className="p-2 border rounded-md bg-gray-200"
                        {...register("inStock", { required: true, min: 0 })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Tags</span>
                    <input
                        type="text"
                        className="p-2 border rounded-md bg-gray-200"
                        {...register("tags", { required: true })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Gender</span>
                    <select className="p-2 border rounded-md bg-gray-200" {...register("gender", { required: true })}>
                        <option value="">[Seleccione]</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kid">Kid</option>
                        <option value="unisex">Unisex</option>
                    </select>
                </div>

                <div className="flex flex-col mb-2">
                    <span>Categoria</span>
                    <select
                        className="p-2 border rounded-md bg-gray-200"
                        {...register("categoryId", { required: true })}
                    >
                        <option value="">[Seleccione]</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button className="btn-primary w-full">Guardar</button>
            </div>

            {/* Selector de tallas y fotos */}
            <div className="w-full">
                {/* As checkboxes */}
                <div className="flex flex-col">
                    <span>Tallas</span>
                    <div className="flex flex-wrap">
                        {sizes.map((size) => (
                            <div
                                key={size}
                                onClick={() => onSizeChanged(size)}
                                className={clsx(
                                    "p-2 border rounded-md mr-2 mb-2 w-14 transition-all text-center cursor-pointer hover:scale-105 hover:bg-slate-200",
                                    {
                                        "bg-blue-500 hover:bg-blue-500 text-white": getValues("sizes").includes(size),
                                    }
                                )}
                            >
                                <span>{size}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col mb-2">
                        <span>Fotos</span>
                        <input
                            type="file"
                            {...register("images")}
                            multiple
                            className="p-2 border rounded-md bg-gray-200"
                            accept="image/png, image/jpeg, image/avif"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {product?.ProductImage?.map((image) => (
                            <div key={image.id} className="relative">
                                <ProductImage
                                    src={image.url}
                                    width={300}
                                    height={300}
                                    alt={product.title}
                                    className="rounded-t shadow-md"
                                />

                                <button
                                    type="button"
                                    onClick={() => onDeleteImage(image.id, image.url)}
                                    className="btn-danger w-full rounded-b-xl"
                                >
                                    Eliminar
                                </button>
                                {/* Trash icon on hover */}
                                {/* <div className="absolute top-0 right-0 p-1 bg-slate-100  rounded-full">
                                    <IoTrashBinOutline size={30} className="text-red-500" />
                                </div> */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </form>
    );
};
