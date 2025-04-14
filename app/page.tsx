"use client"
import { AIChat } from "@/components/landingPage/ai-demo"

import { Features } from "@/components/landingPage/features"
import { Hero } from "@/components/landingPage/hero"

import { NockAiLogo } from "@/components/ui/mainHeader"
import { Button, Link } from "@nextui-org/react"


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full py-4 px-6 flex justify-between items-center bg-background">
      <Link href="/" className="text-2xl font-bold flex gap-2">  <NockAiLogo /> Noc Ai</Link>
        <Button as={Link} href="/auth/login" color="success" variant="flat" >
          Login
        </Button>
      </header>

      <main className="flex-grow">
        <Hero />
        <Features />
        <AIChat />
        {/* <Testimonials />
        <CTASection /> */}
      </main>

      <footer className="w-full py-6 px-6 bg-background text-center">
        <p>&copy; 2025 AITicket. All rights reserved.</p>
      </footer>
    </div>
  )
}

