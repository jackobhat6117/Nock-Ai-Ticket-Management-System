import { Button } from "@nextui-org/react"
import { ArrowRight } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-20 px-6 bg-primary text-white text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Support?</h2>
        <p className="text-xl mb-8">
          Join the AI revolution in ticketing management. Streamline your process, reduce response times, and delight your customers.
        </p>
        <Button
          as="a"
          href="/signup"
          color="secondary"
          size="lg"
          endContent={<ArrowRight className="ml-2" />}
        >
          Get Started Now
        </Button>
      </div>
    </section>
  )
}

