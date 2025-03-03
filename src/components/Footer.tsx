import { Newsreader } from "next/font/google";
import { Caveat } from "next/font/google";

const newsreader = Newsreader({
    weight: ['400', '500', '600'], // Specify the weights you need
    subsets: ['latin'],     // Specify subsets like 'latin'
    style: ['normal', 'italic'], // Optionally include styles (e.g., italic)
  });

const caveat = Caveat({
    weight: ['400', '500', '600'], // Specify the weights you need
    subsets: ['latin'],     // Specify subsets like 'latin'
    style: ['normal'], // Optionally include styles (e.g., italic)
  });

export default function Footer() {
    return (
      <>
      <hr className="bg-gray-400 h-[1.5px]" />
      <footer className="bg-white shadow-md md:flex justify-around items-center py-5">
        <div className="px-6 py-8 text-center">
          {/* Logo and Tagline */}
          <h1 className={`font-medium ${newsreader.className} text-3xl`}>Raven</h1>
          <p className={`text-gray-600 italic ${caveat.className} text-2xl`}>Elegent & Reliable</p>
        </div>
  
        <div className="flex md:flex-row flex-col md:gap-10 gap-10 py-6 md:px-0 px-5 text-gray-700 text-sm">
          {/* Information Section */}
          <div>
            <h2 className="mb-2 font-semibold">Information</h2>
            <ul className="space-y-1 text-gray-500">
              <li className="hover:underline cursor-pointer">About Us</li>
              <li className="hover:underline cursor-pointer">Contact Us</li>
              <li className="hover:underline cursor-pointer">Return and Exchange</li>
              <li className="hover:underline cursor-pointer">Size Guide</li>
            </ul>
          </div>
  
          {/* Customer Service Section */}
          <div>
            <h2 className="mb-2 font-semibold">Customer Service</h2>
            <ul className="space-y-1 text-gray-500">
              <li className="hover:underline cursor-pointer">Shipping Policy</li>
              <li className="hover:underline cursor-pointer">Track your order</li>
              <li className="hover:underline cursor-pointer">FAQs</li>
              <li className="hover:underline cursor-pointer">Payment Options</li>
            </ul>
          </div>
        </div>
      </footer>
      </>

    );
  }
  