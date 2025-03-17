"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { signIn } from "next-auth/react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import signinHandler from "./signinHandler"
import ButtonLoadingSpinner from "@/components/ButtonLoadingSpinner"

export const formSchema = z.object({
    email: z.string().email("Email is not valid"),
    password: z.string(),
})

export default function Signup() {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsSubmitting(true);
            const response = await signinHandler(values);
            if (response) {
                window.location.href = "/";
            }
        } catch (error: any) {
            setIsSubmitting(false);
            setError(error.message);
        }

    }

    const [showPassword, setShowPassword] = useState(false);


    return (
        <div className="flex items-start justify-center min-h-screen bg-gray-100 px-5 md:px-0">
            <div className="w-full max-w-sm mt-12 p-6 bg-white rounded-md shadow-md">
                <h2 className="mb-4 text-2xl font-medium text-center text-gray-800">
                    Sign In
                </h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        {/* Email */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Password */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Password"
                                                {...field}
                                            />
                                            <span
                                                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                <Image
                                                    src={
                                                        showPassword
                                                            ? "/assets/eye-open.svg" // Change to the path for the "eye-open" icon
                                                            : "/assets/eye-close.svg" // Path for the "eye-close" icon
                                                    }
                                                    alt={showPassword ? "Hide password" : "Show password"}
                                                    width="20"
                                                    height="20"
                                                />
                                            </span>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="w-full flex justify-end">
                            <Link href="/forgot-password" className="text-sm text-blue-500 hover:underline">
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Error Message */}
                        {error && <p className="text-sm text-center text-red-500">{error}</p>}

                        {/* Sign In Button */}
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? <ButtonLoadingSpinner /> : "Sign In"}
                        </Button>
                    </form>
                </Form>

                {/* Don't have an account */}
                <div className="mt-4 text-sm text-center text-gray-500">
                    Don&apos;t have an account?{" "}
                    <Link href='/signup' className="text-blue-500 hover:underline">Sign up</Link>
                </div>

                {/* Divider */}
                <div className="relative mt-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm text-gray-500 bg-white">
                        <span className="px-2 bg-white">OR</span>
                    </div>
                </div>

                {/* Continue with Google */}
                <Button
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                    variant="outline"
                    className="w-full mt-4"
                    disabled={isSubmitting}
                >

                    <Image
                        src="/assets/google.png"
                        alt="Google"
                        width="20"
                        height="20"
                        className="inline w-5 h-5 mr-2"
                    />

                    Continue with Google
                </Button>
            </div>
        </div>
    )
}
