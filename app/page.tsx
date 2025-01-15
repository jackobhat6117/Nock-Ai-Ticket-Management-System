import { AIDemo } from "@/components/landingPage/ai-demo"
import { CTASection } from "@/components/landingPage/cat-section"
import { Features } from "@/components/landingPage/features"
import { Hero } from "@/components/landingPage/hero"
import { Testimonials } from "@/components/landingPage/testimonials"
import { NockAiLogo } from "@/components/ui/mainHeader"
import { Button, Link } from "@nextui-org/react"
import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full py-4 px-6 flex justify-between items-center bg-background">
      <Link href="/" className="text-2xl font-bold flex gap-2">  <NockAiLogo /> Nock Ai</Link>
        <Button as={Link} href="/auth/login" color="success" variant="flat" >
          Login
        </Button>
      </header>

      <main className="flex-grow">
        <Hero />
        <Features />
        <AIDemo />
        <Testimonials />
        <CTASection />
      </main>

      <footer className="w-full py-6 px-6 bg-background text-center">
        <p>&copy; 2025 AITicket. All rights reserved.</p>
      </footer>
    </div>
  )
}

