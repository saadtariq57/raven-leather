import axios from "axios";

export async function getNewArrivals() {
    const response = await axios.get(`/api/user/product/get/newArrivals`);
    const data = await response.data();
    return data.products; // Assuming the data structure has products
  }
  