"use client";

import { useUIState } from "@/store";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import {
    IoCloseOutline,
    IoLogInOutline,
    IoLogOutOutline,
    IoPeopleOutline,
    IoPersonOutline,
    IoSearchOutline,
    IoShirtOutline,
    IoTicketOutline,
} from "react-icons/io5";
import { HSeparator } from "../hseparator/HSeparator";
import { logout } from "@/actions";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export const Sidebar = () => {
    // get query param:
    const searchParams = useSearchParams();
    if (searchParams.has("auth")) {
        window.location.replace("/");
    }

    const isSidebarMenuOpen = useUIState((state) => state.isSidebarMenuOpen);
    const closeSidebarMenu = useUIState((state) => state.closeSidebarMenu);

    const { data: session } = useSession();
    const user = session?.user;
    const isAuthenticated = !!user;
    const isAdmin = isAuthenticated && user?.role === "ADMIN";
    const isUser = isAuthenticated && user?.role === "USER";

    const handleCloseSidebarMenu = () => {
        closeSidebarMenu();
    };

    return (
        <div>
            {/* Background black */}
            {isSidebarMenuOpen && <div className="fade-in fixed top-0 left-0 w-screen h-screen z-10 bg-black/30"></div>}
            {/* Blur */}
            {isSidebarMenuOpen && (
                <div
                    onClick={handleCloseSidebarMenu}
                    className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
                ></div>
            )}
            {/* Sidemenu */}
            <nav
                className={clsx(
                    "fade-in fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
                    {
                        "translate-x-full": !isSidebarMenuOpen,
                    }
                )}
            >
                <IoCloseOutline
                    className="absolute top-5 right-5 text-2xl cursor-pointer"
                    onClick={handleCloseSidebarMenu}
                />

                {/* Input */}
                <div className="relative mt-14">
                    <IoSearchOutline className="absolute top-2 left-2 text-xl text-gray-500" />
                    <input
                        type="text"
                        placeholder="Buscar"
                        className="w-full bg-gray-50 rounded border-b-2 pl-10 pr-3 py-2 border-gray-300 focus:outline-none focus:border-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Menú */}
                {isUser && (
                    <Link
                        href="/profile"
                        className="flex items-center mt-10 p-2 rounded transition-all hover:bg-gray-100"
                        onClick={handleCloseSidebarMenu}
                    >
                        <IoPersonOutline className="text-4xl text-gray-500 cursor-pointer" />
                        <span className="ml-5 text-lg">Perfil</span>
                    </Link>
                )}
                {isUser && (
                    <Link
                        href="/"
                        className="flex items-center mt-10 p-2 rounded transition-all hover:bg-gray-100"
                        onClick={handleCloseSidebarMenu}
                    >
                        <IoTicketOutline className="text-4xl text-gray-500 cursor-pointer" />
                        <span className="ml-5 text-lg">Órdenes</span>
                    </Link>
                )}

                {!isAuthenticated && (
                    <Link
                        href="/auth/login"
                        className="flex items-center mt-10 p-2 rounded transition-all hover:bg-gray-100"
                        onClick={handleCloseSidebarMenu}
                    >
                        <IoLogInOutline className="text-4xl text-gray-500 cursor-pointer" />
                        <span className="ml-5 text-lg">Ingresar</span>
                    </Link>
                )}

                {isAuthenticated && (
                    <button
                        className="flex w-full items-center mt-10 p-2 rounded transition-all hover:bg-gray-100"
                        onClick={() => {
                            handleCloseSidebarMenu();
                            logout();
                        }}
                    >
                        <IoLogOutOutline className="text-4xl text-gray-500 cursor-pointer" />
                        <span className="ml-5 text-lg">Salir</span>
                    </button>
                )}

                {/* Separator */}
                <HSeparator className="my-10" />

                {isAdmin && (
                    <Link
                        href="/"
                        className="flex items-center mt-10 p-2 rounded transition-all hover:bg-gray-100"
                        onClick={handleCloseSidebarMenu}
                    >
                        <IoShirtOutline className="text-4xl text-gray-500 cursor-pointer" />
                        <span className="ml-5 text-lg">Products</span>
                    </Link>
                )}

                {isAdmin && (
                    <Link
                        href="/"
                        className="flex items-center mt-10 p-2 rounded transition-all hover:bg-gray-100"
                        onClick={handleCloseSidebarMenu}
                    >
                        <IoTicketOutline className="text-4xl text-gray-500 cursor-pointer" />
                        <span className="ml-5 text-lg">Órdenes</span>
                    </Link>
                )}

                {isAdmin && (
                    <Link
                        href="/"
                        className="flex items-center mt-10 p-2 rounded transition-all hover:bg-gray-100"
                        onClick={handleCloseSidebarMenu}
                    >
                        <IoPeopleOutline className="text-4xl text-gray-500 cursor-pointer" />
                        <span className="ml-5 text-lg">Usuarios</span>
                    </Link>
                )}
            </nav>
        </div>
    );
};
