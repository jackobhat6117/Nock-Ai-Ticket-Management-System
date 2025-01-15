import { Card, CardBody, Avatar } from "@nextui-org/react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Customer Support Manager",
    company: "TechCorp",
    content: "AITicket has revolutionized our support process. We've seen a 40% reduction in response times and significantly improved customer satisfaction.",
    avatar: "/placeholder.svg?height=64&width=64",
  },
  {
    name: "Michael Chen",
    role: "IT Director",
    company: "GlobalSoft",
    content: "The AI-powered routing and analytics have helped us optimize our team's efficiency. It's like having an extra team member who never sleeps!",
    avatar: "/placeholder.svg?height=64&width=64",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardBody className="flex flex-col gap-4">
                <p className="italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <Avatar src={testimonial.avatar} size="lg" />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

