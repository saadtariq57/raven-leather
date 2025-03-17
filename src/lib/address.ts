import { cookies } from "next/headers";

export async function getUserAddress(id: number) {
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
  return data.address;
}
