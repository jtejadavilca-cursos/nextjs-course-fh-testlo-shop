export interface UserDomain {
    id: string;
    name: string;
    email: string;
    emailVerified?: Date | null;
    role: Role;
    image?: string | null;
}

type Role = "ADMIN" | "USER";
