import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function seedDatabase() {
    console.log("Seeding database...");
    // Step 1: Delete all data (one by one because of FK constraints)

    await prisma.orderAddress.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();

    await prisma.country.deleteMany();
    await prisma.user.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    const { categories, products, users, countries } = initialData;

    // Step 2: Insert countries
    await prisma.country.createMany({ data: countries });

    // Step 3: Insert users
    await prisma.user.createMany({ data: users });

    // Step 4: Insert categories
    const categoriesData = categories.map((c) => ({ name: c }));
    await prisma.category.createMany({ data: categoriesData });

    const categoriesDB = await prisma.category.findMany();
    const categoriesMap = categoriesDB.reduce((map, c) => {
        map[c.name.toLowerCase()] = c.id;
        return map;
    }, {} as Record<string, string>);

    // Step 5: Insert products
    products.forEach(async (p) => {
        const { images, type, ...prod } = p;
        const dbProduct = await prisma.product.create({
            data: {
                ...prod,
                categoryId: categoriesMap[type],
            },
        });

        // Step 6: Insert images by product
        const dbImages = images.map((img) => ({
            url: img,
            productId: dbProduct.id,
        }));

        await prisma.productImage.createMany({ data: dbImages });
    });

    console.log("Database seeded successfully.");
}

(() => {
    if (process.env.NODE_ENV !== "production") {
        seedDatabase();
    }
})();
