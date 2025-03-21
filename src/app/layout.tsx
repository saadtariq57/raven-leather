import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Newsreader } from "next/font/google"
import LayoutWrapper from "@/app/LayoutWrapper";

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader"
import { Toaster } from "@/components/ui/sonner"



// Configure the font
const newsReader = Newsreader({
  subsets: ['latin'], // Add other subsets if needed
  weight: ['400', '700'], // Specify desired weights (e.g., normal, bold)
  style: ['normal', 'italic'], // Optional: Add styles like italic
  variable: '--font-newsreader', // Create a CSS variable for the font
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

 export const metadata: Metadata = {
  title: "Raven Leather",
  description: "Premium handcrafted leather jackets, wallets, bags & belts. Shop Raven's luxury leather collection with all over Pakistan shipping. Authentic craftsmanship since 2025.",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${newsReader.variable} antialiased`}
      >
        <NextTopLoader color="#707070" showSpinner={false} />
        <SessionProvider>
          <SidebarProvider defaultOpen={false} >
            <AppSidebar />
            <main className="w-full">
              <LayoutWrapper>
                {children}
              </LayoutWrapper> 
            </main>
          </SidebarProvider>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
