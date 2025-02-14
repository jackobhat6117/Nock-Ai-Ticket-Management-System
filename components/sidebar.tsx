"use client";

import { Link } from "@nextui-org/react";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  UserCircle,
  FileText,
  Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export function Sidebar() {
  const pathname = usePathname(); 

  const isActive = (hrefs: string[]) => hrefs.includes(pathname);

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-64 flex-col border-r bg-background">
      {/* <div className="p-6 text-xl font-bold">Nock-Ai Admin</div> */}
      <div className="flex  items-center mb-7 mt-3  p-2">
        <div className=" text-lg text-gray-500 font-bold mt-1">Noc-Ai</div>
         <p className="border border-l-2 border-gray-400 h-8 ml-4"></p>
        <img src = "/assets/logo.svg"  className="mx-auto w-32"/>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        <Link
          href="/dashboard/noc-it" 
          className={`flex items-center space-x-3 rounded-lg px-3 py-2 ${
            isActive(["/dashboard/noc-it", "/dashboard/noc-site"])
              ? "bg-green-500 text-white" 
              : "text-default-500 hover:bg-default-100" 
          }`}
        >
          <LayoutDashboard className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>
        <Link
          href="/alarm"
          className={`flex items-center space-x-3 rounded-lg px-3 py-2 ${
            isActive(["/alarm"])
              ? "bg-green-500 text-white"
              : "text-default-500 hover:bg-default-100"
          }`}
        >
          <Package className="h-5 w-5" />
          <span>Alarm</span>
        </Link>
        <Link
          href="/incident"
          className={`flex items-center space-x-3 rounded-lg px-3 py-2 ${
            isActive(["/incident"])
              ? "bg-green-500 text-white"
              : "text-default-500 hover:bg-default-100"
          }`}
        >
          <Users className="h-5 w-5" />
          <span>Incident Ticket</span>
        </Link>
        <Link
          href="/comming-soon"
          className={`flex items-center space-x-3 rounded-lg px-3 py-2 ${
            isActive(["/comming-soon"])
              ? "bg-green-500 text-white"
              : "text-default-500 hover:bg-default-100"
          }`}
        >
          <ShoppingCart className="h-5 w-5" />
          <span>Work Order</span>
        </Link>
        <Link
          href="/staff"
          className={`flex items-center space-x-3 rounded-lg px-3 py-2 ${
            isActive(["/staff"])
              ? "bg-green-500 text-white"
              : "text-default-500 hover:bg-default-100"
          }`}
        >
          <UserCircle className="h-5 w-5" />
          <span>Problem Ticket</span>
        </Link>
        <Link
          href="/settings"
          className={`flex items-center space-x-3 rounded-lg px-3 py-2 ${
            isActive(["/settings"])
              ? "bg-green-500 text-white"
              : "text-default-500 hover:bg-default-100"
          }`}
        >
          <FileText className="h-5 w-5" />
          <span>Change Request</span>
        </Link>
        <Link
          href="/international"
          className={`flex items-center space-x-3 rounded-lg px-3 py-2 ${
            isActive(["/international"])
              ? "bg-green-500 text-white"
              : "text-default-500 hover:bg-default-100"
          }`}
        >
          <Settings className="h-5 w-5" />
          <span>Planned Maintenance</span>
        </Link>
      </nav>
    </aside>
  );
}