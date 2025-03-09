import { NextRequest, NextResponse } from "next/server";
import { NextURL } from "next/dist/server/web/next-url";
import { auth } from "@/auth";

export async function userMiddleware( request: NextRequest, url: NextURL ){  
    console.log("In userMiddleware");
    const session = await auth();
    
    if(!session?.user){
        url.pathname = '/signin'
        return NextResponse.redirect(url);
    }

    if(session.user){
        return NextResponse.next();
    }

}
