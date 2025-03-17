import axios from "axios";
import { cookies } from "next/headers";

export async function getCartItems() {
    try {
        const cookieStore = cookies();
        const token =
            (await cookieStore).get("__Secure-authjs.session-token") ||
            (await cookieStore).get("authjs.session-token");
        
        const session_id = (await cookieStore).get("session_id");

        if (token) {
            const cookieHeader = `${token.name}=${token.value}`; // Format the cookie header. If you have multiple cookies, you can concatenate them.
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/cart/get-items`,
                {
                    headers: {
                        Cookie: cookieHeader,
                    },
                }
            );

            const data = await response.data;
            return data.cartItems;
        }

        if (session_id) {

            const cookieHeader = `session_id=${session_id.value}`; // Format the cookie header. If you have multiple cookies, you can concatenate them.
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/cart/get-items`,
                {
                    headers: {
                        Cookie: cookieHeader,
                    },
                }
            );

            const data = await response.data;
            return data.cartItems;
        }


    } catch (error) {
        console.log("error: ", error);
    }
}

