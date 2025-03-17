import axios from "axios";

export async function getNewArrivals() {
  try {
    // Use your NEXT_PUBLIC_API_URL environment variable
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:3000';
        
    const response = await axios.get(`${baseUrl}/api/user/product/get/newArrivals`);
    
    return response.data.products || [];
  } catch (error) {
    console.error("Error fetching new arrivals:", error);
    return [];
  }
}