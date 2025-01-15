import Link from "next/link";
import React from "react";
import { Button } from "@nextui-org/react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { text } from "stream/consumers";

export const NockAiLogo = () => {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2001/svg">
  <circle cx="18" cy="18" r="16" stroke="currentColor" strokeWidth="2"/>
  <path d="M11 18C11 14.6863 13.6863 12 17 12H19C22.3137 12 25 14.6863 25 18C25 21.3137 22.3137 24 19 24H17C13.6863 24 11 21.3137 11 18Z" fill="currentColor"/>
  <path d="M18 5V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M18 27V31" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M5 18H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M27 18H31" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

  
  );
};

const MainHeader = ({textValue}:{textValue: string}) => {
  let textValueOption = textValue === "Home" ? "/" : "/auth/login"
  return (

    <header className="w-full py-4 px-6 flex justify-between items-center bg-background">
    <Link href="/" className="text-2xl font-bold flex gap-2">  <NockAiLogo /> Nock Ai</Link>
    <Button as={Link} href="/" color="success" variant="flat">
      Home
    </Button>
  </header>

   
  );
};

export default MainHeader;
