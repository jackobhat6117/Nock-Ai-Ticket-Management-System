import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {NextUIProvider} from "@nextui-org/react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Providers } from "./provider";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/common/header";
import SessionWrapper from "@/components/sessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nock-Ai",
  description: "Nock-Ai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <SessionWrapper>

    <html lang="en">
      
      
       <body>
        <ToastContainer />
        <Providers>
          
            <div className="flex-1">

              {children}
            </div>
        
        </Providers>

      </body>
      
       
    </html>
    </SessionWrapper>
  );
}
