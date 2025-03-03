"use client"

import Image from "next/image";
import { SidebarTrigger } from "@/components/ui/sidebar"
import Link from "next/link";
import { Newsreader } from "next/font/google";
import { useCart } from "./context/CartContext";
import AccountMenu from "./account/AccountMenu";
import Search from "./search/Search";
const newsreader = Newsreader({
    weight: ['400', '500', '600'], // Specify the weights you need
    subsets: ['latin'],     // Specify subsets like 'latin'
    style: ['normal', 'italic'], // Optionally include styles (e.g., italic)
});

export default function Navbar() {
    const { cartItemsCount } = useCart();

    return (
        <nav className="">
            <div className="flex items-center justify-between gap-3 px-6 py-4 bg-white">

                {/* Logo and Menu */}
                <div className="flex items-center space-x-4">
                    {/* Hamburger Icon */}
                    <span className="flex sm:block">
                        <SidebarTrigger />
                    </span>

                    {/* Brand Name for Desktop Devices */}
                    <Link href="/"><h1 className={`text-2xl font-medium cursor-pointer hidden md:block ${newsreader.className}`}>Raven</h1></Link>
                </div>

                {/* Brand Name for Mobile Devices */}
                <Link href="/"><h1 className={`text-2xl font-medium mt-1 cursor-pointer md:hidden ${newsreader.className}`}>Raven</h1></Link>

                {/* Search Bar */}
                <div className="hidden md:flex w-[50vw] justify-center mr-20">
                    <Search />
                </div>

                {/* Icons */}
                <div className="flex items-center space-x-6">
                    {/* Cart Icon */}
                    <Link href="/cart">
                        <button className="text-xl">
                            <span role="img" aria-label="cart">
                                <Image
                                    src="/assets/cart.svg"
                                    alt="cart"
                                    width="25"
                                    height="25"
                                />
                                {cartItemsCount > 0 && (
                                    <span className="absolute top-4 right-[60px] bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                        {cartItemsCount}
                                    </span>
                                )}
                            </span>
                        </button>
                    </Link>

                    <AccountMenu />
                </div>
            </div>

            {/* Search Bar for Mobile devices*/}
            <div className="md:hidden px-4 mb-3 w-full flex">
                <Search />
            </div>
        </nav>
    );
}
