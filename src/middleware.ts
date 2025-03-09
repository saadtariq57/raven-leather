import { NextRequest, NextResponse } from "next/server";
import { guestMiddleware } from "./middlewares/guestUserMiddleware";
import admin_middleware from "./middlewares/adminRequestAuth";
import { userMiddleware } from "./middlewares/userMiddleware";
import { addressMiddleware } from "./middlewares/addressMiddleware";
import { auth } from "@/auth";

// export default auth( async (req) => {
export default async function middleware(req: NextRequest) {
    const session = await auth();

    const authjs_session = req.cookies.get("authjs.session-token")?.value;
    const session_id = req.cookies.get("session_id")?.value;

    // console.log("Authjs session in middleware: ", authjs_session);

    const url = req.nextUrl.clone();

    // Prevent redirect loop if the current path is '/admin/signin'
    if (url.pathname === '/admin/signin' || url.pathname === '/api/admin/signin') {
        return NextResponse.next();  // Allow access to the signin page
    }


    if (!session_id && !authjs_session) {
        console.log("### No session_id and No authjs_session");
        // If it's an API or admin route and the user is not logged in, redirect to admin signin
        if (url.pathname.startsWith('/admin') || url.pathname.startsWith('/api/admin')) {
            url.pathname = '/admin/signin';
            return NextResponse.redirect(url);  // Redirect to the admin signin page
        }

        // If it's a cart API route, apply guestMiddleware
        if (url.pathname.startsWith('/cart') || url.pathname.startsWith('/api/cart')) {
            return guestMiddleware(req);
        }


        // If the user is not authenticated and trying to access an address route, proceed with address middleware
        if (url.pathname.startsWith('/api/user/address') && !url.pathname.startsWith('/api/user/address/create')) {
            return addressMiddleware(req, session!);
        }
    }

    // If the user is not signed in, handle the guest session middleware
    if (session_id && !authjs_session) {
        console.log("### In session");

        // If it's a cart API route, apply guestMiddleware
        if (url.pathname.startsWith('/cart') || url.pathname.startsWith('/api/cart')) {
            return guestMiddleware(req);
        }

        // If it's an order API route, apply guestMiddleware
        if (url.pathname.startsWith('/order') || url.pathname.startsWith('/api/order')) {
            console.log("$Inside /order");
            return guestMiddleware(req);
        }

        // If it's an API or admin route and the user is not logged in, redirect to admin signin
        if (url.pathname.startsWith('/admin') || url.pathname.startsWith('/api/admin')) {
            url.pathname = '/admin/signin';
            return NextResponse.redirect(url);  // Redirect to the admin signin page
        }

        // If the user is not authenticated and trying to access an address route, proceed with address middleware
        if (url.pathname.startsWith('/api/user/address') && !url.pathname.startsWith('/api/user/address/create')) {
            return addressMiddleware(req, session!);
        }

    }

    if (authjs_session) {
        console.log("### In authjs_session");
        

        // If the user is authenticated and trying to access an admin route, proceed with admin middleware
        if (url.pathname.startsWith('/admin') || url.pathname.startsWith('/api/admin')) {
            return admin_middleware(url);
        }
        if (url.pathname.startsWith('/cart') || url.pathname.startsWith('/api/cart')) {
            return userMiddleware(req, url);
        }
        if (url.pathname.startsWith('/order') || url.pathname.startsWith('/api/order')) {
            return userMiddleware(req, url);
        }
        
        // If the user is not authenticated and trying to access an address route, proceed with address middleware
        if (url.pathname.startsWith('/api/user/address') && !url.pathname.startsWith('/api/user/address/create')) {
            return addressMiddleware(req, session!);
        }

    }

    // Continue with the request if no conditions are met
    return NextResponse.next();
}
// })


