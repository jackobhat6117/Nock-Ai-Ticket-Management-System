// MainLayout.tsx
import { ReactNode } from "react";
import { Sidebar } from "../sidebar";
import { Header } from "./header";
import { ChatbotProvider, useChatbot } from "./ChatbotContext";

import { ChatbotToggleButton } from "./ChatbotToggleButton";
import AIAssistancePage from "@/app/chatBot/page";
import { usePathname } from "next/navigation";



interface MainLayoutProps {
  children: ReactNode;
  pageTitle?: string;
}

export default function MainLayout({ children, pageTitle }: MainLayoutProps) {

  const path = usePathname()
  console.log('pathssss', path)
  return (
    <ChatbotProvider>
      <div>
        <div className="relative flex min-h-screen">
          <Sidebar />
          <div className="flex-1">
            <Header />
            {children}
            <Chatbot path = {path}/>
            <ChatbotToggleButton />
          </div>
        </div>
      </div>
    </ChatbotProvider>
  );
}

const Chatbot = (path:any) => {
  const { isChatbotVisible } = useChatbot();

  if (!isChatbotVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AIAssistancePage path = {path}/>
    </div>
  );
};