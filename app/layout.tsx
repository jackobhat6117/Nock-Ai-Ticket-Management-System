import type { Metadata } from "next";
import "./globals.css";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Providers } from "./provider";

import SessionWrapper from "@/components/sessionWrapper";


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
