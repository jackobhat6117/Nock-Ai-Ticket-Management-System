import { ReactNode } from "react";
import { Sidebar } from "../sidebar";
import { Header } from "./header";

interface MainLayoutProps {
    children: ReactNode;
    pageTitle?: string
    
}

export default function MainLayout({children}: MainLayoutProps) {
    return (
        <div>

            <div className="relative flex min-h-screen">
                <Sidebar />
                <div className="flex-1">
                  <Header />
                  {children}
                </div>
              </div>
            </div>
    )
}