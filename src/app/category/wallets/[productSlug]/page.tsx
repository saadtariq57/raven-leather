// /pages/category/jackets/[productSlug].tsx

import ViewProduct from "@/components/product/ViewProduct";

export default async function ProductPage({ params }: { params: { productSlug: string } }) {
    // Fetch product data based on the productSlug            
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/product/get/get-by-slug?slug=${params.productSlug}`);
    const { product } = await res.json();
    

    // If product not found, return a 404 page
    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <>
            <ViewProduct product={product} />
        </>
    );
}
