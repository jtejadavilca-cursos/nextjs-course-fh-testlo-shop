import prisma from "@/lib/prisma";

export const getCategories = async () => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: {
                name: "asc",
            },
            select: {
                id: true,
                name: true,
            },
        });
        return categories;
    } catch (error) {
        console.error(error);
        throw new Error("Error while fetching categories");
    }
};
