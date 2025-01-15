import { Button } from "@nextui-org/react"
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

export function Hero() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            AI-Powered Ticketing Management
          </h1>
          <p className="text-xl mb-8">
            Streamline your support process with our intelligent ticketing system. Leverage AI to automate responses, prioritize issues, and improve resolution times.
          </p>
          <Button
            as="a"
            href="#demo"
            color="primary"
            size="lg"
            endContent={<ArrowRight className="ml-2" />}
          >
            See AI in Action
          </Button>
        </div>
        <div className="flex-1">
          <Image
            src="/assets/landing_page_login.png"
            alt="AI Ticketing System"
            width={700}
            height={600}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  )
}

