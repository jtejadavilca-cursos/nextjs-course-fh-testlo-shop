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
    }, []);

    const getStock = async (slug: string) => {
        const stock = await getStockBySlug(slug);
        setStock(stock);
        setIsLoading(false);
    };

    return (
        <div className="flex gap-2">
            <small className={`${titleFont.className} antialiased font-bold text-slate-700 `}>{"("}Stock: </small>
            {!isLoading ? (
                <small className={`${titleFont.className} antialiased font-bold  text-center text-slate-700 `}>
                    {stock}
                </small>
            ) : (
                <small
                    className={`${titleFont.className} block antialiased font-bold w-5 text-slate-700 bg-gray-200 animate-pulse`}
                >
                    &nbsp;
                </small>
            )}
            <small className={`${titleFont.className} antialiased font-bold text-slate-700 `}>{")"}</small>
        </div>
    );
};
