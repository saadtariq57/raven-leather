import axios from "axios";
import { cookies } from "next/headers";

export async function getCartItems() {
    try {
        const cookieStore = cookies();
        const userSession =
            (await cookieStore).get("__Secure-authjs.session-token") ||
            (await cookieStore).get("authjs.session-token");
        const guestSession = (await cookieStore).get("session_id");

        if (userSession) {
            const cookieHeader = `authjs.session-token=${userSession.value}`; // Format the cookie header. If you have multiple cookies, you can concatenate them.
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/cart/get-items`,
                {
                    headers: {
                        Cookie: cookieHeader,
                    },
                }
            );

            // console.log("response: ", response);

            const data = await response.data;
            return data.cartItems;
        }

        if (guestSession) {

            const cookieHeader = `session_id=${guestSession.value}`; // Format the cookie header. If you have multiple cookies, you can concatenate them.
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/cart/get-items`,
                {
                    headers: {
                        Cookie: cookieHeader,
                    },
                }
            );

            // console.log("response: ", response);

            const data = await response.data;
            return data.cartItems;
        }


    } catch (error) {
        console.log("error: ", error);
    }
}


// import axios from "axios";
// import { cookies } from "next/headers";

// async function getSessionCookie() {
//     const cookieStore = await cookies();
//     const userSession = cookieStore.get("authjs.session-token");
//     const guestSession = cookieStore.get("session_id");
//     return userSession || guestSession;
// }

// export async function getCartItems() {
//     try {
//         const session = await getSessionCookie();
//         if (!session) {
//             console.log("No session found.");
//             return [];
//         }

//         const cookieHeader = `${session.name}=${session.value}`;
//         const response = await axios.get(
//             `${process.env.NEXT_PUBLIC_API_URL}/api/cart/get-items`,
//             {
//                 headers: { Cookie: cookieHeader },
//             }
//         );

//         console.log("response: ", response);
//         return response.data.cartItems || [];
//     } catch (error) {
//         console.error("Error fetching cart items: ", error);
//         return []; // Return an empty array as a fallback
//     }
// }
