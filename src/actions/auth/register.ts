"use server";

import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { sleep } from "@/utils";
import bcryptjs from "bcryptjs";

export const registerUser = async (fullName: string, email: string, password: string) => {
    try {
        await sleep(2);

        console.log("Before create user", fullName, email, password);
        const user = await prisma.user.create({
            data: { name: fullName, email: email.toLowerCase(), password: bcryptjs.hashSync(password, 10) },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
        console.log("After create user", user);

        if (!user) {
            throw new Error("Error al crear el usuario");
        }

        return {
            success: true,
            message: "Usuario creado correctamente",
            user,
        };
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return {
                success: false,
                message: error.code === "P2002" ? "Usuario ya existe" : "Error al crear el usuario",
            };
        }
        throw error;
    }
};
