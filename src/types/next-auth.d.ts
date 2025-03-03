import NextAuth from "next-auth";
import { User } from "./user.type";

declare module "next-auth" {
    interface Session {
        user: User;
    }

    interface User extends User {
        isVerified? : boolean,
        role? : string,
    }
}