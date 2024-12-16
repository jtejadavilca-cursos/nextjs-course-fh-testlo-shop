"use server";

import { signIn } from "@/auth.config";
import { sleep } from "@/utils";
import { AuthError } from "next-auth";

export async function authenticate(prevState: string | undefined, formData: FormData) {
    try {
        await sleep(2);

        await signIn("credentials", {
            ...Object.fromEntries(formData),
            redirect: true,
            redirectTo: prevState || "/?auth=true",
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid credentials.";
                default:
                    return "Something went wrong.";
            }
        }
        throw error;
    }
}

export const login = async (email: string, password: string) => {
    try {
        await signIn("credentials", { email, password, redirect: true, redirectTo: "/?auth=true" });
        return { success: true };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid credentials.";
                default:
                    return "Something went wrong.";
            }
        }
        throw error;
    }
};
