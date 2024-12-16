"use client";
import Link from "next/link";
//import { useFormState } from "react-dom";
import { useActionState } from "react";

import { authenticate } from "@/actions";
import { IoInformationOutline } from "react-icons/io5";
import clsx from "clsx";

export const LoginForm = () => {
    const [errorMessage, dispatch, isPending] = useActionState(authenticate, undefined);

    return (
        <form action={dispatch} className="flex flex-col">
            <label htmlFor="email">Correo electrónico</label>
            <input className="px-5 py-2 border bg-gray-200 rounded mb-5" type="email" name="email" />

            <label htmlFor="email">Contraseña</label>
            <input className="px-5 py-2 border bg-gray-200 rounded mb-5" type="password" name="password" />

            {errorMessage && (
                <div className="flex h-8 items-end space-x-1 mb-2" aria-live="polite" aria-atomic="true">
                    <IoInformationOutline className="h-5 w-5 text-red-500" />
                    <p className="text-sm text-red-500">Credenciales no son correctas</p>
                </div>
            )}

            <button
                type="submit"
                disabled={isPending}
                className={clsx({ "btn-primary": !isPending, "btn-disabled": isPending })}
            >
                Ingresar
            </button>

            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link href="/auth/new-account" className="btn-secondary text-center">
                Crear una nueva cuenta
            </Link>
        </form>
    );
};
