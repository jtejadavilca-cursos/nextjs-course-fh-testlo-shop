import { auth } from "@/auth.config";
import { TitleComponent } from "@/components";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/auth/login?returnTo=/profile");
    }

    return (
        <div>
            <TitleComponent title="Profile" />
            <pre>{JSON.stringify(session.user, null, 2)}</pre>
        </div>
    );
}
