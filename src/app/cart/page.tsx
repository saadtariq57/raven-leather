import { Newsreader } from "next/font/google";
const newsreader = Newsreader({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    style: ['normal', 'italic'],
});

import { Separator } from "@/components/ui/separator";
import Cart from "@/components/cart/Cart";
import { getCartItems } from "@/lib/cartItems";

export default async function CartPage() {
    const cartItems = await getCartItems();
    // console.log("cartItems: ", cartItems);
    
    

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            {/* Cart Header */}
            <h1 className={`text-3xl md:text-4xl mb-2 ${newsreader.className}`}>Cart</h1>

            <Separator className="mb-8" />

            <Cart cartItems={cartItems}/>
        </div>
    );
}
