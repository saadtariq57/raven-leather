"use client"
import React, { useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { redirect, useSearchParams } from 'next/navigation';
import verifyOTP from "./verifyOTP";
import signinOTP from "./signinOTP";

const EmailVerificationPage = () => {
  const [otp, setOtp] = useState("");
  const [otpSubmitted, setOtpSubmitted] = useState(false);
  const [error, setError] = useState("");

  const searchParams = useSearchParams();

  const email = searchParams.get('email') as string;

  const handleSubmit = async () => {
    const response = await verifyOTP(email, otp);
    if (response) {
      setOtpSubmitted(true);
      setError("");
      const response = await signinOTP(email, otp);
      if (response) {
        redirect("/");
      }
    }

  };

  return (
    <div className="min-h-screen flex justify-center pt-20 bg-gray-50">
      <div className="mx-4">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold text-center mb-4">Email Verification</h2>
          {!otpSubmitted ? (
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
              <Button onClick={handleSubmit} className="w-full">Submit</Button>
              {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
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
