import { HSeparator, QuantitySelector, TitleComponent } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [initialData.products[0], initialData.products[1], initialData.products[2]];

export default function CartPage() {
    //redirect("/empty");

    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1000px]">
                <TitleComponent title="Carrito" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Carrito */}

                    <div className="flex flex-col mt-5">
                        <span className="text-xl">Agregar más items</span>
                        <Link href="/" className="underline mb-5">
                            Continúa comprando
                        </Link>

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
                                    <p className="font-bold">{product.title}</p>
                                    <p className="text-sm">${product.price}</p>
                                    <QuantitySelector quantity={3} />
                                    <button className="underline mt-3">Remover</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Checkout */}

                    <div className="bg-white rounded-xl p-7 sm:max-h-80">
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
                            <Link href="/checkout/address" className="flex btn-primary justify-center">
                                Checkout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
