"use client";

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";
import { useEffect, useState } from "react";

interface Props {
    slug: string;
}

export const StockLabel = ({ slug }: Props) => {
    const [stock, setStock] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getStock(slug);
    }, [slug]);

    const getStock = async (slug: string) => {
        const stock = await getStockBySlug(slug);
        setStock(stock);
        setIsLoading(false);
    };

    return (
        <div className="flex justify-between w-28">
            {!isLoading ? (
                <small className={`${titleFont.className} antialiased font-bold  text-center text-slate-700 `}>
                    {`(Stock: ${stock})`}
                </small>
            ) : (
                <small
                    className={`${titleFont.className} block antialiased font-bold w-full text-slate-700 bg-gray-200 animate-pulse`}
                >
                    &nbsp;
                </small>
            )}
        </div>
    );
};
