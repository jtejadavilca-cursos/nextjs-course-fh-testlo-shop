"use client";

import clsx from "clsx";
import { useForm } from "react-hook-form";
import { Country } from "@/interfaces";
import { useAddressStore } from "@/store";
import { useEffect } from "react";

type FormInput = {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
    rememberAddress: boolean;
};

interface Props {
    countries: Country[];
}

export const AddressForm = ({ countries }: Props) => {
    const {
        handleSubmit,
        register,
        formState: { isValid },
        reset,
    } = useForm<FormInput>({
        defaultValues: {
            //TODO: Read values from DB
            firstName: "",
            lastName: "",
            address: "",
            address2: "",
            postalCode: "",
            city: "",
            country: "",
            phone: "",
            rememberAddress: false,
        },
    });

    const setAddress = useAddressStore((state) => state.setAddress);
    const address = useAddressStore((state) => state.address);

    useEffect(() => {
        reset(address);
    }, [address]);

    const onSubmit = (data: FormInput) => {
        console.log("data", data);

        setAddress({
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            address2: data.address2 ?? "",
            postalCode: data.postalCode,
            city: data.city,
            country: data.country,
            phone: data.phone,
            userId: "1",
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">
            <div className="flex flex-col mb-2">
                <span>Nombres</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-200 focus:ring-2 focus:border-blue-500 focus:outline-none"
                    {...register("firstName", { required: true })}
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>Apellidos</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-200 focus:ring-2 focus:border-blue-500 focus:outline-none"
                    {...register("lastName", { required: true })}
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>Dirección</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-200 focus:ring-2 focus:border-blue-500 focus:outline-none"
                    {...register("address", { required: true })}
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>Dirección 2 (opcional)</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-200 focus:ring-2 focus:border-blue-500 focus:outline-none"
                    {...register("address2")}
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>Código postal</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-200 focus:ring-2 focus:border-blue-500 focus:outline-none"
                    {...register("postalCode", { required: true })}
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>Ciudad</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-200 focus:ring-2 focus:border-blue-500 focus:outline-none"
                    {...register("city", { required: true })}
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>País</span>
                <select className="p-2 border rounded-md bg-gray-200" {...register("country", { required: true })}>
                    <option value="">[ Seleccione ]</option>
                    {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col mb-2">
                <span>Teléfono</span>
                <input
                    type="text"
                    className="p-2 border rounded-md bg-gray-200 focus:ring-2 focus:border-blue-500 focus:outline-none"
                    {...register("phone", { required: true })}
                />
            </div>

            <div className="flex flex-col mb-2 sm:mt-1 w-full">
                {/* Checkbox to save address in DB */}
                <div className="inline-flex items-center mb-10">
                    <label
                        className="relative flex cursor-pointer items-center rounded-full p-3"
                        htmlFor="checkbox"
                        data-ripple-dark="true"
                    >
                        <input
                            {...register("rememberAddress")}
                            type="checkbox"
                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                            id="checkbox"
                            checked
                            onChange={(e) => {
                                console.log("e.target.checked", e.target.checked);
                                e.target.checked = !e.target.checked;
                            }}
                        />
                        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3.5 w-3.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="1"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </div>
                    </label>
                    <span>Recordar dirección?</span>
                </div>
                {/* End Checkbox to save address in DB */}
                <button
                    type="submit"
                    disabled={!isValid}
                    className={clsx("flex w-full justify-center", {
                        "btn-primary": isValid,
                        "btn-disabled": !isValid,
                    })}
                >
                    Siguiente
                </button>
            </div>
        </form>
    );
};
