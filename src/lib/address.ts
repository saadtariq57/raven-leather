// export async function getUserAddress(id: number) {    
//     console.log("Fetching user address for ID:", id);
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/address/get?userId=${id}`);    
//     const data = await response.json();
//     console.log("Data from address API:", data);
//     return data.address;
// }

import { auth } from "@/auth";
import { cookies } from "next/headers";

export async function getUserAddress(id: number) {
    const session = await auth();
    console.log("Session data:", session);    


  const cookieStore = cookies();
  // Convert cookies to a header string:
  const cookieHeader = cookieStore.toString();
  
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/address/get?userId=${id}`,
    {
      headers: {
        cookie: cookieHeader,
      },
      // Optionally disable caching:
      cache: "no-store",
    }
  );
  const data = await response.json();
  console.log("Data from address API:", data);
  return data.address;
}
