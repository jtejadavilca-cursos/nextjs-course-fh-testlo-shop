"use client";

import { useState } from "react";
import { useCartStore } from "@/store";
import type { CartProduct, ProductDomain, Size } from "@/interfaces";
import { QuantitySelector, SizeSelector } from "@/components";

interface Props {
    product: ProductDomain;
}

export const AddToCard = ({ product }: Props) => {
    const addProductToCart = useCartStore((state) => state.addProductToCart);

    const [size, setSize] = useState<Size | undefined>();
    const [quantity, setQuantity] = useState(1);
    const [posted, setPosted] = useState(false);

    const addToCart = () => {
        setPosted(true);

        if (!size) {
            return;
        }

        console.log("quantity", quantity, "size", size);

        const cartProduct: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            quantity,
            size,
            image: product.images[0],
        };

        addProductToCart(cartProduct);
        setPosted(false);
        setQuantity(quantity);
        setSize(undefined);
    };

    return (
        <>
            {posted && !size && <span className="mt-2 text-red-600">Debe seleccionar una talla</span>}

            {/* Selector de tallas */}
            <SizeSelector availableSizes={product.sizes} selectedSize={size} onSizeChange={setSize} />
            {/* Selector de cantidad */}
            <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />

            {/* Button Add */}
            <button className="btn-primary my-5" onClick={() => addToCart()}>
                Agregar al carrito
            </button>
        </>
    );
};
