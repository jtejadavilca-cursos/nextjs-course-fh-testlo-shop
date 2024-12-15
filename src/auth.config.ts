import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "./lib/prisma";
import bcryptjs from "bcryptjs";

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: "/auth/login",
        newUser: "/auth/new-account",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.data = user;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token.data as any;
            return session;
        },
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(6),
                    })
                    .safeParse(credentials);

                if (!parsedCredentials.success) {
                    return null;
                }
                const { email, password } = parsedCredentials.data;
                const user = await prisma.user.findUnique({
                    where: {
                        email: email.toLowerCase(),
                    },
                });

                if (!user) {
                    return null;
                }

                const isValid = bcryptjs.compareSync(password, user.password);

                if (!isValid) {
                    return null;
                }

                const { password: _, ...userWithoutPassword } = user;

                return userWithoutPassword;
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
