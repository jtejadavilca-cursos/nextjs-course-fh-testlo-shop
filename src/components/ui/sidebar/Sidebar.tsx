"use client";

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

export const Sidebar = () => {
    return (
        <div>
            {/* Background black */}
            <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black/30">x</div>
            {/* Blur */}
            <div className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm">Y</div>

            {/* Sidemenu */}
            <nav className="fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300">
                <IoCloseOutline
                    className="absolute top-5 right-5 text-2xl cursor-pointer"
                    onClick={() => console.log("click")}
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
                <Link href="/" className="flex items-center mt-10 p-2 rounded transition-all hover:bg-gray-100">
                    <IoPersonOutline className="text-4xl text-gray-500 cursor-pointer" />
                    <span className="ml-5 text-lg">Perfil</span>
                </Link>
                <Link href="/" className="flex items-center mt-10 p-2 rounded transition-all hover:bg-gray-100">
                    <IoTicketOutline className="text-4xl text-gray-500 cursor-pointer" />
                    <span className="ml-5 text-lg">Órdenes</span>
                </Link>
                <Link href="/" className="flex items-center mt-10 p-2 rounded transition-all hover:bg-gray-100">
                    <IoLogInOutline className="text-4xl text-gray-500 cursor-pointer" />
                    <span className="ml-5 text-lg">Ingresar</span>
                </Link>
                <Link href="/" className="flex items-center mt-10 p-2 rounded transition-all hover:bg-gray-100">
                    <IoLogOutOutline className="text-4xl text-gray-500 cursor-pointer" />
                    <span className="ml-5 text-lg">Salir</span>
                </Link>

                {/* Separator */}
                <div className="w-full h-px bg-gray-200 my-10"></div>

                <Link href="/" className="flex items-center mt-10 p-2 rounded transition-all hover:bg-gray-100">
                    <IoShirtOutline className="text-4xl text-gray-500 cursor-pointer" />
                    <span className="ml-5 text-lg">Products</span>
                </Link>

                <Link href="/" className="flex items-center mt-10 p-2 rounded transition-all hover:bg-gray-100">
                    <IoTicketOutline className="text-4xl text-gray-500 cursor-pointer" />
                    <span className="ml-5 text-lg">Órdenes</span>
                </Link>

                <Link href="/" className="flex items-center mt-10 p-2 rounded transition-all hover:bg-gray-100">
                    <IoPeopleOutline className="text-4xl text-gray-500 cursor-pointer" />
                    <span className="ml-5 text-lg">Usuarios</span>
                </Link>
            </nav>
        </div>
    );
};
