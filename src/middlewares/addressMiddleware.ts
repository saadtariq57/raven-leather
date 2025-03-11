import { NextRequest, NextResponse } from "next/server";
import { Session } from "next-auth";

export async function addressMiddleware(request: NextRequest, session: Session) {
    console.log("In addressMiddleware");    
    
    const userId = request.nextUrl.searchParams.get("userId");
    
    if (session?.user.id === userId) {
        return NextResponse.next();
    } else {
        return NextResponse.json({
            success: false,
            message: "You are not authorized to access this resource.",
        }, { status: 403 });
    }

}
