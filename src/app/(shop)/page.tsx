export const revalidate = 60; // 60 segundos

import { redirect } from "next/navigation";

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, TitleComponent } from "@/components";
interface Props {
    searchParams: Promise<{
        page: string;
    }>;
}
export default async function ShopPage({ searchParams }: Props) {
    const page = parseInt((await searchParams).page);
    const noPage = isNaN(page) || page < 1;

    const { products, totalPages } = await getPaginatedProductsWithImages({
        page: noPage ? 1 : page,
        limit: 12,
    });

    if (!noPage && products.length === 0) {
        redirect("/");
    }

    //Home
    return (
        <>
            {/* {!noPage && (
                <h1>
                    Página {page} de {totalPages}
                </h1>
            )} */}
            <TitleComponent title="Tienda" subtitle="Todos los productos" />

            {totalPages > 1 && <Pagination totalPages={totalPages} />}
            <ProductGrid products={products} />
        </>
    );
}
