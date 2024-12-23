"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { ProductDomain } from "@/interfaces";

interface Props {
    product: ProductDomain;
}

export const ProductGridItem = ({ product }: Props) => {
    const [displayImage, setSetDisplayImage] = useState(product.images[0]);

    return (
        <div key={product.slug} className="rounded-md overflow-hidden fade-in">
            <Link href={`/product/${product.slug}`}>
                <Image
                    width={500}
                    height={500}
                    src={`/products/${displayImage}`}
                    alt={product.title}
                    className="w-full object-cover object-center fade-in rounded"
                    onMouseEnter={() => setSetDisplayImage(product.images[1])}
                    onMouseLeave={() => setSetDisplayImage(product.images[0])}
                />
            </Link>
            <div className="p-4 flex flex-col">
                <Link className="hover:text-blue-500" href={`/products/${product.slug}`}>
                    {product.title}
                </Link>
                <span className="font-bold text-gray-500">${product.price}</span>
                {/* <p className="text-gray-700 mt-2">${product.price}</p> */}
            </div>
        </div>
    );
};
