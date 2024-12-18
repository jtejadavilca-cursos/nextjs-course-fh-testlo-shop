import prisma from "@/lib/prisma";

export const deleteUserAddress = async (userId: string) => {
    try {
        await prisma.userAddress.deleteMany({
            where: {
                userId: userId,
            },
        });

        return {
            success: true,
            message: "User address removed",
        };
    } catch (error) {
        console.error("Error removing user address", error);
        return {
            success: false,
            message: "Error removing user address",
        };
    }
};
