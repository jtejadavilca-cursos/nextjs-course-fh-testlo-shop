import prisma from "@/lib/prisma";

export const getUserAddress = async (userId: string) => {
    try {
        const userAddress = await prisma.userAddress.findFirst({
            where: {
                userId: userId,
            },
        });
        return {
            success: true,
            message: "User address found",
            address: {
                ...userAddress,
                country: userAddress?.countryId,
                address2: userAddress?.address2 ?? "",
            },
        };
    } catch (error) {
        console.error("Error finding user address", error);
        return {
            success: false,
            message: "Error finding user address",
        };
    }
};
