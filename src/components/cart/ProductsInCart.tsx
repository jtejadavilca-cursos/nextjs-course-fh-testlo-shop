"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { QuantitySelector } from "../product/quantity-selector/QuantitySelector";
import { useCartStore } from "@/store";
import Link from "next/link";

export const ProductsInCart = () => {
    const [loaded, setLoaded] = useState(false);
    const productsInCart = useCartStore((state) => state.cart);
    const updateProductQuantity = useCartStore((state) => state.updateProductQuantity);
    const removeProductFromCart = useCartStore((state) => state.removeProductFromCart);

    useEffect(() => {
        setLoaded(true);
    }, []);

    if (!loaded) {
        return <p>Cargando...</p>;
    }

    return (
        <>
            {productsInCart.map((product) => (
                <div key={product.slug + "-" + product.size} className="flex mb-5">
                    <Image
                        src={`/products/${product.image}`}
                        alt={product.title}
                        width={100}
                        height={100}
                        className="mr-5 rounded max-h-28"
                    />

                    <div>
                        <Link className="hover:underline font-bold" href={`/product/${product.slug}`}>
                            {product.size} - {product.title}
                        </Link>
                        <p className="text-sm">${product.price}</p>
                        <QuantitySelector
                            quantity={product.quantity}
                            onQuantityChange={(quantity) => {
                                updateProductQuantity(product, quantity);
                            }}
                        />
                        <button className="underline mt-3" onClick={() => removeProductFromCart(product)}>
                            Remover
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
};
