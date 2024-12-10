import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, TitleComponent } from "@/components";
import { Category } from "@/interfaces";
import { notFound, redirect } from "next/navigation";

interface Props {
    params: Promise<{ id: Category }>;
    searchParams: {
        page: string;
    };
}

export default async function CategoryPage({ params, searchParams }: Props) {
    const { id } = await params;

    if (!["men", "women", "kid", "unisex"].includes(id)) {
        notFound();
    }

    const page = parseInt((await searchParams).page);
    const noPage = isNaN(page) || page < 1;

    const { products, totalPages, currentPage } = await getPaginatedProductsWithImages({
        page: noPage ? 1 : page,
        limit: 12,
        category: id,
    });

    if (!noPage && products.length === 0) {
        redirect(`/category/${id}`);
    }

    const labels: Record<Category, string> = {
        women: "Mujeres",
        men: "Hombres",
        kid: "Niños",
        unisex: "Hombres y/o Mujeres",
    };

    return (
        <>
            <TitleComponent title="Tienda" subtitle={`Productos para ${labels[id]}`} />

            {totalPages > 1 && <Pagination page={currentPage} totalPages={totalPages} />}
            <ProductGrid products={products} />
        </>
    );
}
