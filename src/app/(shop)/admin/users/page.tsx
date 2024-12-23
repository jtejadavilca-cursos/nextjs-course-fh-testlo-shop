export const revalidate = 0;

import { notFound } from "next/navigation";

import { auth } from "@/auth.config";
import { getUsers } from "@/actions";
import { TitleComponent } from "@/components";
import { UsersTable } from "./ui/UsersTable";

export default async function UsersAdminPage() {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
        return notFound();
    }

    const usersResponse = await getUsers();
    if (!usersResponse.success) {
        return notFound();
    }

    const users = usersResponse.data ?? [];

    return (
        <>
            <TitleComponent title="Users" />

            <div className="mb-10">
                <UsersTable users={users} />
            </div>
        </>
    );
}
