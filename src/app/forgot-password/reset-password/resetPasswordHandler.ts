"use server";

import { prisma } from "../../../../DB/db.config";
import bcrypt from "bcryptjs"

export default async function resetPasswordHandler(email: string, otp: string, password: string) {
    
    // Checking if the otp is valid
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user?.verifyCodeExpiry) {
        throw new Error("OTP expired");
    }

    if(user?.verifyCode !== otp || user?.verifyCodeExpiry < new Date()) {
        throw new Error("Invalid OTP");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if(!user.verifyCodeExpiry){
        throw new Error("OTP expired");
    }

    // Updating the password if the otp is valid and not expired
    if(user.verifyCode === otp && user.verifyCodeExpiry > new Date()) {
        const updatedPassword = await prisma.user.update({
            where: { email },
            data: {
                password: hashedPassword,
            }
        });

        if (updatedPassword) {
            return true;
        }
    }

}
