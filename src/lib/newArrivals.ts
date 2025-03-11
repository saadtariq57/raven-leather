import axios from "axios";

export async function getNewArrivals() {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/product/get/newArrivals`);
    const data = await response.data();
    return data.products; // Assuming the data structure has products
  }
  