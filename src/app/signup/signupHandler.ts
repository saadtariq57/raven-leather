"use server"
import { z } from "zod";
import { formSchema } from "./page";
import { prisma } from "../../../DB/db.config";
import bcryptjs from "bcryptjs"
import SendVerificationEmail from "@/utils/email/verificationEmail";

export default async function signupHandler(values: z.infer<typeof formSchema>){
    try {
        const fullName = values.fullName;
        const email = values.email;
        const password = values.password;
    
        if(!fullName || !email || !password){
            throw new Error("Please provide all fields");
        }

        //Check if the user with this email already exists
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if(user) 
            throw new Error("User already exists")

        const hashedPassword = await bcryptjs.hash(password, 10);
    
        //Preparing and Sending verification email
        const OTP = Math.floor(Math.random() * 900000 + 100000).toString();
        const OTPExpiry = new Date(Date.now() + 3600000);

        const emailSent = await SendVerificationEmail(email, OTP);

        if(emailSent){
            //Creating new User 
            await prisma.user.create({ 
                data: {
                    fullName,
                    email,
                    password: hashedPassword,
                    verifyCode: OTP,
                    verifyCodeExpiry: OTPExpiry,
                    isVerified: false,
                }
            });

            return { redirectUrl: `verify-email?email=${encodeURIComponent(email)}`}
            
        }
        
    } catch (error: any) {
        throw new Error("Error while signing up. " + error.message);
    }
}