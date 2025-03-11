/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";
import { User } from "./user.type";
/* eslint-enable @typescript-eslint/no-unused-vars */

declare module "next-auth" {
    interface Session {
        user: User;
    }

    interface User extends User {
        isVerified? : boolean,
        role? : string,
    }
}