export async function getUserAddress(id: number) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/address/get?userId=${id}`);
    const data = await response.json();
    // console.log("Address data: ", data);
    
    return data.address; // Assuming the data structure has user orders
}