"use server"
import { signIn } from "@/auth"

export default async function signinOTP(email: string, otp: string) {
    try {
        await signIn("credentials", { type: "user", email, otp, redirect: false });
    } catch (error: any) {
        throw new Error(error.message);
    }
}