"use server"

import { prisma } from "../../../DB/db.config";

export default async function verifyOTP(email: string, OTP: string) {
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (user) {
    if (user.verifyCode === OTP && user.verifyCodeExpiry as Date > new Date(Date.now())) {
      await prisma.user.update({
        where: { id: user.id },
        data: { isVerified: true }
      })
      return true;
    } else {
      return false;
    }
  }
}
