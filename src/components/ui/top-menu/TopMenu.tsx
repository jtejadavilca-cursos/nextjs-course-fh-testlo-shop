"use client";

import { titleFont } from "@/config/fonts";
import { useUIState } from "@/store";
import Link from "next/link";
import React from "react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";

export const TopMenu = () => {
    const openSidebarMenu = useUIState((state) => state.openSidebarMenu);

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
                <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/category/men">
                    Hombres
                </Link>
                <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/category/women">
                    Mujeres
                </Link>
                <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/category/kids">
                    Niños
                </Link>
            </div>

            {/* Right Menu */}
            <div className="flex items-center">
                <Link href="/search" className="mx-2">
                    <IoSearchOutline className="text-2xl" />
                </Link>
                <Link href="/cart" className="mx-2">
                    <div className="relative">
                        <span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">
                            3
                        </span>
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
