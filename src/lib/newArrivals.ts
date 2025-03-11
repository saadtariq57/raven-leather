import axios from "axios";

export async function getNewArrivals() {
  // For server-side requests, you need absolute URLs
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    
  try {
    const response = await axios.get(`${baseUrl}/api/user/product/get/newArrivals`);
    // response.data is a property, not a function
    console.log("New Arrivals Response:", response.data);
    return response.data.products || []; // Return empty array as fallback
  } catch (error) {
    console.error("Error fetching new arrivals:", error);
    return []; // Return empty array on error to prevent mapping errors
  }
}