"use server"
import { signOut } from "@/auth";
import { redirect } from "next/navigation";

export default async function signOutHandler() {
    try {
        await signOut();
        redirect(`/admin/signin`)
    } catch (error) {
    }

}
