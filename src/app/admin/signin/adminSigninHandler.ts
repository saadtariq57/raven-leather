"use server"
import { z } from "zod";
import { signIn } from "@/auth";
import { formSchema } from "./adminFormSchema";

export default async function adminSigninHandler(values: z.infer<typeof formSchema>) {
    const username = values.username;
    const password = values.password;

    if (!username || !password) {
        throw new Error("Please provide all fields");
    }

    const response = await signIn("credentials", { type: "admin" , username, password, redirect: false })
    
    if (response) {
        return true
    }
    else {
        return false;
    }
}