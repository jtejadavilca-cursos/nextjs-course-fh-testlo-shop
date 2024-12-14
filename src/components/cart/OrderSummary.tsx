"use client";

import Link from "next/link";
import { HSeparator } from "../ui/hseparator/HSeparator";
import { useCartStore } from "@/store";
import { useEffect, useState } from "react";
import { currencyFormat } from "@/utils";

export const OrderSummary = () => {
    const [loaded, setLoaded] = useState(false);

    const { getSummaryInformation } = useCartStore();
    const { itemsInCart, subTotalAmount, taxes, totalAmount } = getSummaryInformation();

    useEffect(() => {
        setLoaded(true);
    }, []);

    if (!loaded) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="bg-white rounded-xl p-7 sm:max-h-80">
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
                <Link href="/checkout/address" className="flex btn-primary justify-center">
                    Checkout
                </Link>
            </div>
        </div>
    );
};
