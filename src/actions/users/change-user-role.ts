"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

//export const revalidate = 0;

export const changeUserRole = async (id: string, role: "ADMIN" | "USER") => {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
        return {
            success: false,
            message: "You are not allowed to perform this action",
        };
    }
    try {
        await prisma.user.update({
            where: {
                id,
            },
            data: {
                role,
            },
        });

        revalidatePath("/admin/users");

        return {
            success: true,
        };
    } catch (error) {
        const errorMessage = `Not possible to set role ${role} to user ${id}`;
        console.error(errorMessage, error);
        return {
            success: false,
            message: errorMessage,
        };
    }
};
