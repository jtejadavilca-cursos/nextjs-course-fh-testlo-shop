import { titleFont } from "@/config/fonts";
import Link from "next/link";
import React from "react";

export const Footer = () => {
    return (
        <div className="flex justify-center text-xs mb-10">
            <Link href="/about">
                <span className={`${titleFont.className} antialiased font-bold`}>Teslo </span>
                <span> | shop </span>
                <span>© {new Date().getFullYear()}</span>
            </Link>

            <Link href="/about">
                <span className="mx-3">Privacidad & Legal</span>
            </Link>

            <Link href="/about">
                <span className="mx-3">Ubicaciones</span>
            </Link>
        </div>
    );
};
