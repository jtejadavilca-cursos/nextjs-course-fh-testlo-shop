"use server";

import prisma from "@/lib/prisma";
import type { UserDomain } from "@/interfaces";
import { auth } from "@/auth.config";

interface Response {
    success: boolean;
    message?: string;
    data?: UserDomain[];
}

export const getUsers = async (): Promise<Response> => {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
        return {
            success: false,
            message: "You are not allowed to perform this action",
        };
    }

    const users = await prisma.user.findMany({
        orderBy: {
            email: "asc",
        },
        select: {
            id: true,
            email: true,
            emailVerified: true,
            name: true,
            role: true,
            createdAt: true,
        },
    });

    const usersDomain: UserDomain[] = users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        role: user.role,
        image: "",
    }));

    return {
        success: true,
        data: usersDomain,
    };
};
