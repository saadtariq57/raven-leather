"use server"
import { auth } from "@/auth";
import { NextURL } from "next/dist/server/web/next-url";
import { NextResponse } from "next/server";

export default async function admin_middleware(url: NextURL) {
    try {
        const session = await auth();

        if (session?.user.role === "admin") {
            return NextResponse.next();
        } else {
            url.pathname = '/admin/signin'
            return NextResponse.redirect(url);
        }
    }
    catch (error: any) {
        console.log("ERROR: " + error.message);
    }

}