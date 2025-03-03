"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { useState } from "react"
import Image from "next/image"
import { redirect } from "next/navigation"
import adminSigninHandler from "./adminSigninHandler"
import ButtonLoadingSpinner from "@/components/ButtonLoadingSpinner"

export const formSchema = z.object({
    username: z.string(),
    password: z.string(),
})

export default function AdminSignin() {
    const [showPassword, setShowPassword] = useState(false);
    const [isSigningIn, setIsSigningIn] = useState(false);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSigningIn(true);
        console.log(values)
        const response = await adminSigninHandler(values);
        if(response){
            redirect("/admin/dashboard");
        }
    }

    return (
        <div className="flex items-start justify-center min-h-screen bg-gray-100 px-5 md:px-0">
            <div className="w-full max-w-sm mt-12 p-6 bg-white rounded-md shadow-md">
                <h2 className="mb-4 text-2xl font-medium text-center text-gray-800">
                    Admin Sign In
                </h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        
                        {/* username */}
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input type="username" placeholder="Username" {...field} />
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

                        {/* Sign In Button */}
                        <Button type="submit" className="w-full" disabled={isSigningIn}>
                            {isSigningIn ? <ButtonLoadingSpinner /> : "Sign in"}
                        </Button>
                    </form>
                </Form>

                
            </div>
        </div>
    )
}
