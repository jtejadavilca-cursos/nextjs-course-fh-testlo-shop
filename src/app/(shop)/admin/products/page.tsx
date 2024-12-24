export const revalidate = 0;

import Link from "next/link";

// https://tailwindcomponents.com/component/hoverable-table
import { Pagination, ProductImage, TitleComponent } from "@/components";
import { getPaginatedProductsWithImages } from "@/actions";
import Image from "next/image";
import { currencyFormat } from "@/utils";

interface Props {
    searchParams: Promise<{
        page: string;
    }>;
}

export default async function ProductsAdminPage({ searchParams }: Props) {
    const page = parseInt((await searchParams).page);
    const noPage = isNaN(page) || page < 1;

    const { products, totalPages } = await getPaginatedProductsWithImages({
        page: noPage ? 1 : page,
        limit: 10,
    });

    return (
        <>
            <TitleComponent title="Mantenimiento de Productos" />
            <div className="flex justify-end mb-5">
                <Link href="/admin/product/new" className="btn btn-primary">
                    Nuevo Producto
                </Link>
            </div>

            <div className="mb-10">
                <table className="min-w-full">
                    <thead className="bg-gray-200 border-b">
                        <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Imagen
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Título
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Precio
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Género
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Stock
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Sizes
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr
                                key={product.id}
                                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    <ProductImage
                                        src={product.images[0]}
                                        alt={product.title}
                                        width={80}
                                        height={80}
                                        className="rounded-md"
                                    />
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    <Link className="hover:underline" href={`/admin/product/${product.slug}`}>
                                        {product.title}
                                    </Link>
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6">
                                    {currencyFormat(product.price)}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 ">{product.gender}</td>
                                <td className="text-sm text-gray-900 font-light px-6 ">{product.inStock}</td>
                                <td className="text-sm text-gray-900 font-light px-6 ">{product.sizes.join(", ")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {totalPages > 1 && <Pagination totalPages={totalPages} />}
            </div>
        </>
    );
}
