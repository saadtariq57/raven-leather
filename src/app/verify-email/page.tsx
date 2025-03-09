"use client"
import React, { useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import verifyOTP from "./verifyOTP";
import signinOTP from "./signinOTP";
import ButtonLoadingSpinner from "@/components/ButtonLoadingSpinner";

const EmailVerificationPage = () => {
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [error, setError] = useState("");

  const searchParams = useSearchParams();

  const email = searchParams.get('email') as string;

  //? If the user is coming from forgot password page, we will redirect them to reset password page
  const isForgotPassword = searchParams.get('forgotPassword') === "true";
  console.log("isForgotPassword: ", isForgotPassword);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const otpVerified = await verifyOTP(email, otp);
      if (otpVerified === false) {
        setIsSubmitting(false);
        setError("Invalid OTP");
      }
      otpVerified === true && setIsOtpVerified(true);

      if (otpVerified && isForgotPassword) {
        router.push(`/forgot-password/reset-password?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`);
        return;
      }

      if (otpVerified && !isForgotPassword) {
        setError("");
        await signinOTP(email, otp);
        window.location.href = "/";
      }

    } catch (error: any) {
      setIsSubmitting(false);
      setError(error.message);
    }

  };

  return (
    <div className="min-h-screen flex justify-center pt-20 bg-gray-50">
      <div className="mx-4">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold text-center mb-4">Email Verification</h2>
          {!isOtpVerified ? (
            <>
              <div className="text-gray-600 text-center mb-6">
                <span>Enter the 6-digit OTP sent to your email:</span>
                <p className="font-semibold">{email}</p>
              </div>
              <Input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="mb-4 w-full"
              />
              {error && <p className="text-red-500 text-sm my-4 text-center">{error}</p>}
              <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full">
                {isSubmitting ? <ButtonLoadingSpinner /> : "Verify OTP"}
              </Button>
            </>
          ) : (
            <p className="text-green-600 text-center font-medium">
              Your email has been successfully verified!
            </p>
          )}
        </div>
      </div>

    </div>
  );
};

export default EmailVerificationPage;
