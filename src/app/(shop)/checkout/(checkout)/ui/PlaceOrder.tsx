"use client";

import { HSeparator } from "@/components";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat, sleep } from "@/utils";
import clsx from "clsx";
import { useEffect, useState } from "react";

export const PlaceOrder = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [error, setError] = useState(false);

    const address = useAddressStore((state) => state.address);

    const cart = useCartStore((state) => state.cart);
    const { getSummaryInformation } = useCartStore();
    const { itemsInCart, subTotalAmount, taxes, totalAmount } = getSummaryInformation();

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const onPlaceOrder = async () => {
        setIsPlacingOrder(true);
        // Place order logic here

        console.log({ address });

        const productsToOrder = cart.map((product) => ({
            productId: product.id,
            quantity: product.quantity,
            size: product.size,
        }));

        console.log({ productsToOrder });

        await sleep(3);

        setIsPlacingOrder(false);
        setError(true);
        await sleep(3);
        setError(false);
    };

    if (!isLoaded) {
        return <p>Cargando...</p>;
    }

    return (
        <>
            <div className="bg-white rounded-xl p-7 md:max-h-[700px]">
                <h2 className="text-2xl font-bold mb-2">Dirección de entrega</h2>
                <div className="mb-10">
                    <p className="text-xl">
                        {address.firstName} {address.lastName}
                    </p>
                    <p>{address.address}</p>
                    <p>{address.address2}</p>
                    <p>{address.postalCode}</p>
                    <p>
                        {address.city}, {address.country}
                    </p>
                    <p>{address.phone}</p>
                </div>

                {/* Divider */}
                <HSeparator className="my-7 h-1 rounded" />

                <h2 className="text-2xl mb-2">Resumen de orden</h2>

                <div className="grid grid-cols-2">
                    <span>No. Productos</span>
                    <span className="text-right">
                        {itemsInCart} artículo{itemsInCart > 1 ? "s" : ""}
                    </span>

                    <span>Subtotal</span>
                    <span className="text-right">{currencyFormat(subTotalAmount)}</span>

                    <span>Impuestos (15%)</span>
                    <span className="text-right">{currencyFormat(taxes)}</span>
                    <HSeparator className="col-span-2 my-7" />
                    <span className="text-2xl">Total:</span>
                    <span className="text-right text-2xl">{currencyFormat(totalAmount)}</span>
                </div>

                <div className="mt-5 w-full">
                    {/* Disclaimer */}

                    <p className="mb-5">
                        <span className="text-xs">
                            Al hacer clic en &quot;Colocar orden&quot;, aceptas nuestros{" "}
                            <a href="#" className="underline">
                                términos y condiciones
                            </a>{" "}
                            y{" "}
                            <a href="" className="underline">
                                políticas de privacidad
                            </a>
                            .
                        </span>
                    </p>
                    <button
                        //href="/orders/123"
                        disabled={isPlacingOrder}
                        onClick={onPlaceOrder}
                        className={clsx("flex  w-full justify-center", {
                            "btn-disabled cursor-not-allowed": isPlacingOrder,
                            "btn-primary": !isPlacingOrder,
                        })}
                    >
                        Colocar orden
                    </button>
                </div>

                {error && <p className="text-red-500 mt-5 ">Error registrando la orden...</p>}
            </div>
        </>
    );
};
