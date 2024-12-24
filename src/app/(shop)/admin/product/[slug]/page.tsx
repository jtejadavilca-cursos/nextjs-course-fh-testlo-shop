import { getCategories, getProductBySlug } from "@/actions";
import { TitleComponent } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";

interface Props {
    params: Promise<{ slug: string }>;
}

export default async function AdminProductPage({ params }: Props) {
    const { slug } = await params;

    const [productDB, categories] = await Promise.all([getProductBySlug(slug), getCategories()]);

    console.log("productDB", productDB, "slug", slug);
    if (!productDB && slug !== "new") {
        redirect("/admin/products");
    }
    const pageTitle = productDB?.title ?? "Nuevo Producto";

    return (
        <>
            <TitleComponent title={pageTitle} />
            <hr />
            <ProductForm product={productDB} categories={categories} />
        </>
    );
}
