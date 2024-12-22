import { notFound } from "next/navigation";
import Image from "next/image";
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

import { getOrderById } from "@/actions/order/get-order-by-id";
import { HSeparator, TitleComponent } from "@/components";
import { currencyFormat } from "@/utils";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function OrderIdPage({ params }: Props) {
    const { id } = await params;

    const order = await getOrderById(id);

    if (!order) {
        notFound();
    }

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
                                    "bg-red-500": !order.isPaid,
                                    "bg-green-700": order.isPaid,
                                }
                            )}
                        >
                            <IoCardOutline className="text-2xl" />
                            {order.isPaid ? (
                                <span className="mx-2">Pagada</span>
                            ) : (
                                <span className="mx-2">Pendiente</span>
                            )}
                        </div>

                        {/* Items */}

                        {order.items.map((item) => (
                            <div key={item.product.slug + "-" + item.size} className="flex mb-5">
                                <Image
                                    src={`/products/${item.product.ProductImage[0].url}`}
                                    alt={item.product.title}
                                    width={100}
                                    height={100}
                                    className="mr-5 rounded max-h-28"
                                />

                                <div>
                                    <p>
                                        {item.product.title} - ({item.size})
                                    </p>
                                    <p className="text-sm">
                                        {currencyFormat(item.price)} x {item.quantity}
                                    </p>
                                    <p className="text-sm font-bold">
                                        Subtotal: {currencyFormat(item.price * item.quantity)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Checkout */}

                    <div className="bg-white rounded-xl p-7 md:max-h-[700px]">
                        <h2 className="text-2xl font-bold mb-2">Dirección de entrega</h2>
                        <div className="mb-10">
                            <p className="text-xl">{`${order.OrderAddress?.firstName} ${order.OrderAddress?.lastName}`}</p>
                            <p className="flex justify-between">
                                <strong>Address:</strong> {order.OrderAddress?.address}
                            </p>
                            {order.OrderAddress?.address2 && (
                                <p className="flex justify-between">
                                    <strong>Additional address:</strong> <span>{order.OrderAddress?.address2}</span>
                                </p>
                            )}
                            <p className="flex justify-between">
                                <strong>Country:</strong> <span>{order.OrderAddress?.country.name}</span>
                            </p>
                            <p className="flex justify-between">
                                <strong>City:</strong> <span>{order.OrderAddress?.city}</span>
                            </p>
                            <p className="flex justify-between">
                                <strong>Postal code:</strong> <span>{order.OrderAddress?.postalCode}</span>
                            </p>
                            <p className="flex justify-between">
                                <strong>Phone:</strong> <span>{order.OrderAddress?.phone}</span>
                            </p>
                        </div>

                        {/* Divider */}
                        <HSeparator className="my-7 h-1 rounded" />

                        <h2 className="text-2xl font-bold mb-2">Resumen de orden</h2>

                        <div className="grid grid-cols-2">
                            <span>No. Productos</span>
                            <span className="text-right">
                                {order.itemsInOrder} artículo{order.itemsInOrder > 1 ? "s" : ""}
                            </span>

                            <span>Subtotal</span>
                            <span className="text-right">{currencyFormat(order.subTotal)}</span>

                            <span>Impuestos (15%)</span>
                            <span className="text-right">{currencyFormat(order.tax)}</span>
                            <HSeparator className="col-span-2 my-7" />
                            <span className="text-2xl font-bold">Total:</span>
                            <span className="text-right text-2xl">{currencyFormat(order.total)}</span>
                        </div>

                        <div className="mt-5 w-full">
                            <div
                                className={clsx(
                                    "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                                    {
                                        "bg-red-500": !order.isPaid,
                                        "bg-green-700": order.isPaid,
                                    }
                                )}
                            >
                                <IoCardOutline className="text-2xl" />

                                {order.isPaid ? (
                                    <span className="mx-2">Pagada</span>
                                ) : (
                                    <span className="mx-2">Pendiente</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
