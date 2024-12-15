import { auth } from "@/auth.config";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();

    if (session?.user) {
        revalidatePath("/auth");
        redirect("/");
    }

    return (
        <main className="flex justify-center">
            <div className="w-full sm:w-[350px] px-10">{children}</div>
        </main>
    );
}
