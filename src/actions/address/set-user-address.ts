"use server";

import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
    try {
        const savedAddress = await createOrReplaceAddress(address, userId);

        return {
            success: true,
            message: "User address saved",
            address: savedAddress,
        };
    } catch (error) {
        console.error("Error saving user address", error);
        return {
            success: false,
            message: "Error saving user address",
        };
    }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
    const existingAddress = await prisma.userAddress.findFirst({
        where: {
            userId: userId,
        },
    });

    if (existingAddress) {
        await prisma.userAddress.update({
            where: {
                id: existingAddress.id,
            },
            data: {
                firstName: address.firstName,
                lastName: address.lastName,
                address: address.address,
                address2: address.address2,
                postalCode: address.postalCode,
                city: address.city,
                country: {
                    connect: {
                        id: address.country,
                    },
                },
                phone: address.phone,
            },
        });
    } else {
        await prisma.userAddress.create({
            data: {
                firstName: address.firstName,
                lastName: address.lastName,
                address: address.address,
                address2: address.address2,
                postalCode: address.postalCode,
                city: address.city,
                country: {
                    connect: {
                        id: address.country,
                    },
                },
                phone: address.phone,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
    }
};
