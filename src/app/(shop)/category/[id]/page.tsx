import { ProductGrid, TitleComponent } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ id: Category }>;
    // searchParams: {
    //     limit: string;
    // };
}

const products = initialData.products;

export default async function CategoryPage({ params }: Props) {
    const { id } = await params;

    if (!["men", "women", "kid", "unisex"].includes(id)) {
        notFound();
    }

    const producstByCategory = products.filter((product) => product.gender === id);

    const labels: Record<Category, string> = {
        women: "Mujeres",
        men: "Hombres",
        kid: "Niños",
        unisex: "Hombres y/o Mujeres",
    };

    return (
        <>
            <TitleComponent title="Tienda" subtitle={`Productos para ${labels[id]}`} />
            <ProductGrid products={producstByCategory} />
        </>
    );
}
