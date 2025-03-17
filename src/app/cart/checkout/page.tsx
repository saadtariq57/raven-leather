import { auth } from "@/auth";
import CheckoutCart from "@/components/checkout/CheckoutCart";
import CheckoutProduct from "@/components/checkout/CheckoutProduct";
import { getCartItemsByIds } from "@/controllers/cartController";
import { getProductDirect } from "@/controllers/productController";
import { getUserAddress } from "@/lib/address";
import { ProductWithImagesAndSizes } from "@/types/client/product.types";


interface SearchParams {
    [key: string]: string | string[] | undefined;
  }
  
  interface PageProps {
    searchParams: SearchParams;
  }

export default async function CheckoutPage({ searchParams }: PageProps) {
    const data = await auth();
    
    const address = await getUserAddress(Number(data?.user.id));
    
    const items = searchParams.items?.toString();
    const productId = Number(searchParams.productId);
    const productQuantity = Number(searchParams.productQuantity);
    const productSize = searchParams.productSize ? String(searchParams.productSize) : "";

    if(items){
        //Handle order from Cart
        const itemIds = items ? items.split(" ") : [];
        const idsArray = itemIds.map((id) => parseInt(id));
        const cartItems = await getCartItemsByIds(idsArray);

        return (
            <>
                <CheckoutCart cartItems={cartItems} address={address} />
            </>
        );
    } else if(productId){
        // Handle order from Buy Now
        const product: ProductWithImagesAndSizes = await getProductDirect(productId);

        return (
            <>
                <CheckoutProduct product={product} productQuantity={productQuantity} productSize={productSize} address={address} />
            </>
        );
    }

    
    
    
}
