"use client"

import React, { useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { useSearchParams } from 'next/navigation';
import ButtonLoadingSpinner from "@/components/ButtonLoadingSpinner";
import resetPasswordHandler from "./resetPasswordHandler";
import signinOTP from "@/app/verify-email/signinOTP";

const ResetPasswordPage = () => {

    const searchPaerams = useSearchParams();
    const email = searchPaerams.get('email') as string;
    const otp = searchPaerams.get('otp') as string;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [passwordChanged, setPasswordChanged] = useState(false);


    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            setIsSubmitting(true);
            const response = await resetPasswordHandler(email, otp, password);
            if (response) {
                setPasswordChanged(true);
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
                    {!passwordChanged ? (
                        <>
                            <h2 className="text-2xl font-bold text-center mb-4">Enter new Password</h2>

                            <div className="text-gray-600 text-sm font-semibold mt-6 mb-2 ml-1">
                                <span>Password:</span>
                            </div>
                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="mb-4 w-full"
                                type="password"
                            />
                            <div className="text-gray-600 text-sm font-semibold mt-6 mb-2 ml-1">
                                <span>Confirm Password:</span>
                            </div>
                            <Input
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm Password"
                                className="mb-4 w-full"
                                type="password"
                            />

                            {error && <p className="text-red-500 text-sm my-4 text-center">{error}</p>}

                            <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full">
                                {isSubmitting ? <ButtonLoadingSpinner /> : "Submit"}
                            </Button>
                        </>
                    ) : (
                        <p className="text-green-600 text-center font-medium">
                            Your password has been successfully changed!
                        </p>
                    )}

                </div>
            </div>

        </div>
    );
};

export default ResetPasswordPage;