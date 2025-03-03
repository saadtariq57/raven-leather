import { Calendar, Home, icons, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Jackets",
    url: "/category/jackets",
    icon: "/assets/jacket.png"
  },
  {
    title: "Wallets",
    url: "/category/wallets",
    icon: "/assets/wallet.png"
  },
  {
    title: "Belts",
    url: "/category/belts",
    icon: "/assets/belt.png"
  },
  {
    title: "Bags",
    url: "/category/bags",
    icon: "/assets/school-bag.png"
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Raven</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className=" mt-3">
                  <SidebarMenuButton asChild className="">
                    <a href={item.url} className="py-10 space-x-10 flex justify-center items-center">
                    <img src={item.icon} alt={item.title} className="w-6 h-6" />
                      <span className="text-lg font-semibold">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
