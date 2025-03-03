export async function getNewArrivals() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/product/get/newArrivals`);
    const data = await response.json();
    return data.products; // Assuming the data structure has products
  }
  