import { NextRequest, NextResponse } from "next/server";
import { NextURL } from "next/dist/server/web/next-url";
import { auth } from "@/auth";

export async function userMiddleware( request: NextRequest, url: NextURL ){  
    console.log("In userMiddleware");
      
    const response = await auth();
    console.log("user: ", response?.user);
    
    if(!response?.user){
        url.pathname = '/signin'
        return NextResponse.redirect(url);
    }

    if(response.user){
        // // Clone the request and attach the user ID to headers
        // const requestHeader = new Headers(request.headers);
        // requestHeader.set("x-user-id", response.user.id!)        

        // return NextResponse.next({
        //     request: {
        //         headers: requestHeader,
        //     },
        // });

        return NextResponse.next();
    }

}
