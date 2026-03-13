export interface IUser {
    name: string;
    email: string;
    password: string;
    phone: string;
    role?: EUserRole;
}

export enum EUserRole {
    guest = "guest",
    owner = "owner",
    admin = "admin",
}
