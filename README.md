# Teslo Shop

## Description

This is a simple e-commerce website that allows users to view products, add them to a cart, and purchase them. The website is built using NextJS, Tailwind, PostgreSQL.

## How to run the project in DEV environment

1. Clone the repository
2. Create a `.env` file in the root directory copying the existing `.env.template` field and add set the required environment variables
3. Run `npm install` to install the dependencies
4. Run `docker compose up -d` to start the PostgreSQL database
5. Run migrations using `npx prisma migrate dev`
6. If change something in the schema, run `npx prisma generate` to generate the new client
7. Run `npm run seed` to populate the database with mock data
8. Clean localStorage in the browser because after the seed, IDs are different
9. Run `npm run dev` to start the development server
