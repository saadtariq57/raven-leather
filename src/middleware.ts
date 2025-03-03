import { NextRequest, NextResponse } from "next/server";
import { guestMiddleware } from "./middlewares/guestUserMiddleware";
import admin_middleware from "./middlewares/adminRequestAuth";
import { userMiddleware } from "./middlewares/userMiddleware";

export function middleware(request: NextRequest) {
    const authjs_session = request.cookies.get("authjs.session-token")?.value;
    const url = request.nextUrl.clone();

    // Prevent redirect loop if the current path is '/admin/signin'
    if (url.pathname === '/admin/signin' || url.pathname === '/api/admin/signin') {
        return NextResponse.next();  // Allow access to the signin page
    }

    // If the user is not signed in, handle the guest session middleware
    if (!authjs_session) {
        console.log("### In session");

        // If it's a cart API route, apply guestMiddleware
        if (url.pathname.startsWith('/cart') || url.pathname.startsWith('/api/cart')) {
            return guestMiddleware(request);
        }

        // If it's an order API route, apply guestMiddleware
        if (url.pathname.startsWith('/order') || url.pathname.startsWith('/api/order')) {
            console.log("$Inside /order");
            return guestMiddleware(request);
        }

        // If it's an API or admin route and the user is not logged in, redirect to admin signin
        if (url.pathname.startsWith('/admin') || url.pathname.startsWith('/api/admin')) {
            url.pathname = '/admin/signin';
            return NextResponse.redirect(url);  // Redirect to the admin signin page
        }
    }

    if(authjs_session){
        console.log("### In authjs_session");
        
        // If the user is authenticated and trying to access an admin route, proceed with admin middleware
        if (url.pathname.startsWith('/admin') || url.pathname.startsWith('/api/admin')) {
            return admin_middleware(url);
        } 
        if(url.pathname.startsWith('/cart') || url.pathname.startsWith('/api/cart')){
            console.log("$Inside /cart");
            return userMiddleware(request, url);
        }
        if(url.pathname.startsWith('/order') || url.pathname.startsWith('/api/order')){
            console.log("$Inside /order");
            return userMiddleware(request, url);
        }

    }

    // Continue with the request if no conditions are met
    return NextResponse.next();
}
