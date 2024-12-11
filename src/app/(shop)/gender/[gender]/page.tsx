export const revalidate = 60; // 60 segundos

import { notFound, redirect } from "next/navigation";
import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, TitleComponent } from "@/components";

interface Props {
    params: Promise<{ gender: string }>;
    searchParams: {
        page: string;
    };
}

export default async function CategoryPage({ params, searchParams }: Props) {
    const { gender } = await params;

    if (!["men", "women", "kid", "unisex"].includes(gender)) {
        notFound();
    }

    const page = parseInt((await searchParams).page);
    const noPage = isNaN(page) || page < 1;

    const { products, totalPages, currentPage } = await getPaginatedProductsWithImages({
        page: noPage ? 1 : page,
        limit: 12,
        gender: gender,
    });

    if (!noPage && products.length === 0) {
        redirect(`/gender/${gender}`);
    }

    const labels: Record<string, string> = {
        women: "Mujeres",
        men: "Hombres",
        kid: "Niños",
        unisex: "Hombres y/o Mujeres",
    };

    return (
        <>
            <TitleComponent title="Tienda" subtitle={`Productos para ${labels[gender]}`} />

            {totalPages > 1 && <Pagination totalPages={totalPages} />}
            <ProductGrid products={products} />
        </>
    );
}
