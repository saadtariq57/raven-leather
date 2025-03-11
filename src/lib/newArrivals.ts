import axios from "axios";

export async function getNewArrivals() {
  // More robust URL handling
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || // Custom env var you set
                 (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
    
  const response = await axios.get(`${baseUrl}/api/user/product/get/newArrivals`);
  const data = response.data; // Not a function
  return data.products;
}