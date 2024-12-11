import { HSeparator, TitleComponent } from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import Image from "next/image";
import { IoCardOutline } from "react-icons/io5";

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
    initialData.products[3],
];

interface Props {
    params: Promise<{ id: string }>;
}

export default async function OrderIdPage({ params }: Props) {
    const { id } = await params;

    //TODO: Verificar ID

    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1000px]">
                <TitleComponent title={`Orden #${id}`} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Carrito */}

                    <div className="flex flex-col mt-5">
                        <div
                            className={clsx(
                                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                                {
                                    "bg-red-500": false,
                                    "bg-green-700": true,
                                }
                            )}
                        >
                            <IoCardOutline className="text-2xl" />
                            {/* <span className="mx-2">Pendiente</span> */}
                            <span className="mx-2">Pagada</span>
                        </div>

                        {/* Items */}

                        {productsInCart.map((product) => (
                            <div key={product.slug} className="flex mb-5">
                                <Image
                                    src={`/products/${product.images[0]}`}
                                    alt={product.title}
                                    width={100}
                                    height={100}
                                    className="mr-5 rounded max-h-28"
                                />

                                <div>
                                    <p>{product.title}</p>
                                    <p className="text-sm">${product.price} x 3</p>
                                    <p className="text-sm font-bold">Subtotal: ${product.price * 3}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Checkout */}

                    <div className="bg-white rounded-xl p-7 md:max-h-[700px]">
                        <h2 className="text-2xl font-bold mb-2">Dirección de entrega</h2>
                        <div className="mb-10">
                            <p className="text-xl">Fernando Herrera</p>
                            <p>Av. Siempre viva 123</p>
                            <p>Col. Centro</p>
                            <p>Alcaldía Cuauhtémoc</p>
                            <p>Ciudad de México</p>
                            <p>CP 123123</p>
                            <p>123.123.123</p>
                        </div>

                        {/* Divider */}
                        <HSeparator className="my-7 h-1 rounded" />

                        <h2 className="text-2xl mb-2">Resumen de orden</h2>

                        <div className="grid grid-cols-2">
                            <span>No. Productos</span>
                            <span className="text-right">3 artículos</span>

                            <span>Subtotal</span>
                            <span className="text-right">$ 100</span>

                            <span>Impuestos (15%)</span>
                            <span className="text-right">$ 80</span>
                            <HSeparator className="col-span-2 my-7" />
                            <span className="text-2xl">Total:</span>
                            <span className="text-right text-2xl">$ 180</span>
                        </div>

                        <div className="mt-5 w-full">
                            <div
                                className={clsx(
                                    "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                                    {
                                        "bg-red-500": false,
                                        "bg-green-700": true,
                                    }
                                )}
                            >
                                <IoCardOutline className="text-2xl" />
                                {/* <span className="mx-2">Pendiente</span> */}
                                <span className="mx-2">Pagada</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
