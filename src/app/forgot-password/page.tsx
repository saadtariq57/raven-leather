"use client"

import React, { useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import ButtonLoadingSpinner from "@/components/ButtonLoadingSpinner";
import forgetPasswordHandler from "./forgetPasswordHandler";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");


  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const response = await forgetPasswordHandler(email);
      if(response){
        router.push(response?.redirectUrl);
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
          <h2 className="text-2xl font-bold text-center mb-4">Reset password</h2>

          <div className="text-gray-600 text-sm font-semibold mt-6 mb-2 ml-1">
            <span>Enter your Email:</span>
          </div>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="mb-4 w-full"
          />

          {error && <p className="text-red-500 text-sm my-4 text-center">{error}</p>}

          <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full">
            {isSubmitting ? <ButtonLoadingSpinner /> : "Send OTP"}
          </Button>

        </div>
      </div>

    </div>
  );
};

export default ForgotPasswordPage;