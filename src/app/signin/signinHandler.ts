"use server"

import { z } from "zod";
import { formSchema } from "./page";
import { signIn } from "@/auth";
import { prisma } from "../../../DB/db.config";
import { redirect } from "next/navigation";

export default async function signinHandler(values: z.infer<typeof formSchema>){
    const email = values.email;
    const password = values.password;

    if(!email || !password){
        throw new Error("Please provide all fields");
    }

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if(user?.isVerified === true){
        const response = await signIn("credentials", { type: "user", email, password, redirect: false });
        console.log("response in signinHandler: ", response);
        return response;
        
    }
    else {
        //Redirect the user to verify the email
        redirect(`/verify-email?email=${encodeURIComponent(email)}`)
    }
}