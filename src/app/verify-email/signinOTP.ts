"use server"

import { signIn } from "@/auth"

export default async function signinOTP(email: string, otp: string) {
    const response = await signIn("credentials", {type: "user", email, otp, redirect: false })
    return response
}