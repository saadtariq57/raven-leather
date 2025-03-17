import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

export async function guestMiddleware(request: NextRequest) {
  const session_id = request.cookies.get("session_id")?.value;

  if (!session_id) {    
    const newSessionId = nanoid();

    // Call the API route to create a guest user
    const baseUrl = request.nextUrl.origin;
    await fetch(
      `${baseUrl}/api/misc/create-guestuser?sessionId=${newSessionId}`,
      { method: "POST" }
    );

    // Set the session_id cookie for 1 hour
    const response = NextResponse.next();
    response.cookies.set("session_id", newSessionId, {
      maxAge: 60 * 60,
      httpOnly: true,
      path: "/",
    });

    response.headers.set("x-session-id", newSessionId)
    return response; // Return the response with the new session_id cookie and session_id in headers
  }

  // If session_id exists, proceed to the next middleware or route handler with session_id in headers
  const requestHeader = new Headers(request.headers);
  requestHeader.set("x-session-id", session_id);
  return NextResponse.next({
    request: {
      headers: requestHeader,
    },
  });
}
