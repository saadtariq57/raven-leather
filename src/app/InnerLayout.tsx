"use client"
import AdminSidebar from "@/components/AdminSidebar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

// Move this part to a client component
export function InnerLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
  
    if (pathname?.startsWith("/admin") && pathname !== "/admin/signin") {
      return (
        <div className="w-full flex overflow-y-hidden">
          <AdminSidebar />
          <div className="w-full">{children}</div>
        </div>
      );
    }
  
    if (pathname === "/admin/signin") {
      return <div className="w-full overflow-y-hidden">{children}</div>;
    }
  
    return (
      <>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </>
    );
  }
  