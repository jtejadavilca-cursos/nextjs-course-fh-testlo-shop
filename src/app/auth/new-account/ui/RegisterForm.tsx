"use client";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { titleFont } from "@/config/fonts";
import clsx from "clsx";
import { login, registerUser } from "@/actions";
import { useState } from "react";

type FormInputs = {
    fullName: string;
    email: string;
    password: string;
};

export const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInputs>();

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setErrorMessage(null);
        const { fullName, email, password } = data;
        try {
            const resp = await registerUser(fullName, email, password);

            console.log("------>resp", resp);

            if (!resp.success) {
                setErrorMessage(resp.message);
                return;
            }

            // Redirect to login page
            await login(email, password);
        } catch (error) {
            console.log("2 typeof error", typeof error);
            console.error("Error creating account", error);
            setErrorMessage("Error al crear la cuenta");
        }

        // Server action
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col min-h-screen pt-32 sm:pt-52">
            {/* {errors?.fullName?.type === "required" && !!errors?.fullName && (
                <span className="text-red-500">El nombre completo es requerido</span>
            )} */}
            <h1 className={`${titleFont.className} text-4xl mb-5`}>Nueva cuenta</h1>

            <div className="flex flex-col">
                <label
                    htmlFor="fullName"
                    className={clsx({
                        "text-red-500": !!errors?.fullName,
                    })}
                >
                    Nombre completo
                </label>
                <input
                    className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
                        "border-red-500 focus:border-red-500": !!errors?.fullName,
                    })}
                    autoFocus
                    type="text"
                    {...register("fullName", { required: true })}
                />

                <label
                    htmlFor="email"
                    className={clsx({
                        "text-red-500": !!errors?.email,
                    })}
                >
                    Correo electrónico
                </label>
                <input
                    className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
                        "border-red-500 focus:border-red-500": !!errors?.email,
                    })}
                    type="email"
                    {...register("email", { required: true })}
                />

                <label
                    htmlFor="password"
                    className={clsx({
                        "text-red-500": !!errors?.password,
                    })}
                >
                    Contraseña
                </label>
                <input
                    className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
                        "border-red-500 focus:border-red-500": !!errors?.password,
                    })}
                    type="password"
                    {...register("password", { required: true })}
                />
                <span className="text-red-500">{errorMessage}</span>
                <button type="submit" className="btn-primary">
                    Crear cuenta
                </button>

                {/* divisor l ine */}
                <div className="flex items-center my-5">
                    <div className="flex-1 border-t border-gray-500"></div>
                    <div className="px-2 text-gray-800">O</div>
                    <div className="flex-1 border-t border-gray-500"></div>
                </div>

                <Link href="/auth/login" className="btn-secondary text-center">
                    Ya tienes cuenta?
                </Link>
            </div>
        </form>
    );
};
