"use client";

import { useEffect, useState } from "react";
import { titleFont } from "@/config/fonts";
import { useCartStore, useUIState } from "@/store";
import Link from "next/link";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";

export const TopMenu = () => {
    const openSidebarMenu = useUIState((state) => state.openSidebarMenu);
    const totalItemsInCart = useCartStore((state) => state.getTotalItems());

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const handleOpenSidebarMenu = () => {
        openSidebarMenu();
    };
    return (
        <nav className="flex px-5 justify-between items-center w-full">
            {/* Logo */}
            <div>
                <Link href="/">
                    <span className={`${titleFont.className} antialiased font-bold`}>Teslo</span>
                    <span> | Shop</span>
                </Link>
            </div>

            {/* Center Menu */}
            <div className="hidden sm:block">
                <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/">
                    Inicio
                </Link>
                <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/men">
                    Hombres
                </Link>
                <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/women">
                    Mujeres
                </Link>
                <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/kid">
                    Niños
                </Link>
                <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/unisex">
                    Unisex
                </Link>
            </div>

            {/* Right Menu */}
            <div className="flex items-center">
                <Link href="/search" className="mx-2">
                    <IoSearchOutline className="text-2xl" />
                </Link>
                <Link href={totalItemsInCart === 0 && isLoaded ? "/empty" : "/cart"} className="mx-2">
                    <div className="relative">
                        {isLoaded && totalItemsInCart > 0 ? (
                            <span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">
                                {totalItemsInCart}
                            </span>
                        ) : null}
                        <IoCartOutline className="text-2xl" />
                    </div>
                </Link>
                <button className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" onClick={handleOpenSidebarMenu}>
                    Menú
                </button>
            </div>
        </nav>
    );
};
