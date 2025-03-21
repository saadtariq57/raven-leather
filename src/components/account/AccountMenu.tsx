"use client";

import { useSession, signOut,  } from "next-auth/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { LogOut, LogIn } from 'lucide-react';


export default function AccountMenu() {
    const { data: session } = useSession(); // Use status to track loading state

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Image
                    src="/assets/profile.svg"
                    alt="Profile"
                    width={30}
                    height={30}
                    className="cursor-pointer rounded-full"
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit">
                {session ? (
                    <div className="flex flex-col gap-2">
                        <Link href="/account">
                            <DropdownMenuItem className="flex items-center space-x-2 cursor-pointer p-2">
                                <Image
                                    src="/assets/profile.svg"
                                    alt="Profile"
                                    width={20}
                                    height={20}
                                />
                                <span>{session.user?.name}</span>
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                            onClick={() => signOut({ redirectTo: "/" })}
                            className="flex items-center space-x-2 cursor-pointer p-2"
                        >
                            <LogOut />
                            <span>Sign Out</span>
                        </DropdownMenuItem>
                    </div>
                ) : (
                    <Link href="/signin">

                        <DropdownMenuItem
                            className="flex items-center space-x-2 cursor-pointer p-2"
                        >
                            <LogIn />
                            <span>Sign In</span>
                        </DropdownMenuItem>
                    </Link>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
