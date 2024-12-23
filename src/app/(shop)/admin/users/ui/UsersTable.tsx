"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { UserDomain } from "@/interfaces";
import { changeUserRole } from "@/actions/users/change-user-role";
import { useSession } from "next-auth/react";

interface Props {
    users: UserDomain[];
}
// https://tailwindcomponents.com/component/hoverable-table
export const UsersTable = ({ users }: Props) => {
    const [isLoading, setIsLoading] = useState(true);

    const { data: session } = useSession();

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const onChangeUserRole = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(`USER ID: ${e.target.id} and ROLE: ${e.target.value}`);
        const respChange = await changeUserRole(e.target.id, e.target.value as "ADMIN" | "USER");
        if (respChange.success) {
            console.log("Role changed successfully");
        } else {
            console.log("Error changing role");
        }
    };

    if (isLoading) {
        return <div className="w-1/2 bg-slate-200 mx-auto">Loading...</div>;
    }

    return (
        <table className="min-w-full">
            <thead className="bg-gray-200 border-b">
                <tr>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Email
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Nombre completo
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Rol
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Opciones
                    </th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr
                        key={user.id}
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.email}</td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{user?.name}</td>
                        <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {/* <span
                                className={clsx("mx-2", {
                                    "text-green-800": user.role === "USER",
                                    "text-red-800": user.role === "ADMIN",
                                })}
                            >
                                {user.role}
                            </span> */}

                            {session?.user.id !== user.id ? (
                                <select
                                    name="role"
                                    id={user.id}
                                    value={user.role}
                                    onChange={onChangeUserRole}
                                    className={clsx("p-2 w-full text-sm text-center", {
                                        "text-green-800": user.role === "USER",
                                        "text-red-800": user.role === "ADMIN",
                                    })}
                                >
                                    <option className="text-green-800" value="USER">
                                        USER
                                    </option>
                                    <option className="text-red-800" value="ADMIN">
                                        ADMIN
                                    </option>
                                </select>
                            ) : (
                                <span
                                    className={clsx("p-2 mr-3 w-full text-center", {
                                        "text-green-800": user.role === "USER",
                                        "text-red-800": user.role === "ADMIN",
                                    })}
                                >
                                    {`${user.role}`}
                                </span>
                            )}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 ">
                            <Link href={`/admin/users/${user.id}`} className="hover:underline">
                                Ver usuario
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
