"use server";
import { prisma } from "../../../DB/db.config";
import SendVerificationEmail from "@/utils/email/verificationEmail";

export default async function forgetPasswordHandler(email: string) {
    // Email regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate email format
    if (!email || !emailRegex.test(email)) {
        throw new Error("Please provide a valid email address");
    }

    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        throw new Error("User does not exist");
    }

    // Preparing and Sending verification email
    const OTP = Math.floor(Math.random() * 900000 + 100000).toString();
    const OTPExpiry = new Date(Date.now() + 3600000);

    // Updating the user with the OTP and expiry
    await prisma.user.update({
        where: { email },
        data: {
            verifyCode: OTP,
            verifyCodeExpiry: OTPExpiry,
        }
    });

    const emailSent = await SendVerificationEmail(email, OTP);
    if (emailSent) {
        return { redirectUrl: `verify-email?email=${encodeURIComponent(email)}&forgotPassword=true` };
    }
}
