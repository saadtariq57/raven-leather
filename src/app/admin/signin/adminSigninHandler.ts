"use server"
import { z } from "zod";
import { signIn } from "@/auth";
import { formSchema } from "./adminFormSchema";
import { cookies } from "next/headers";

export default async function adminSigninHandler(values: z.infer<typeof formSchema>) {
    const username = values.username;
    const password = values.password;

    if (!username || !password) {
        throw new Error("Please provide all fields");
    }

    const cookieStore = cookies();

    const response = await signIn("credentials", { type: "admin" , username, password, redirect: false })
    
    if (response) {
        (await cookieStore).delete("session_id");
        return true
    }
    else {
        return false;
    }
}