import { Card, CardBody, CardHeader } from "@nextui-org/react"
import { Brain, Clock, BarChart, Users } from 'lucide-react'

const features = [
  {
    title: "AI-Powered Responses",
    description: "Automatically generate accurate responses to common queries, reducing response time.",
    icon: <Brain className="w-8 h-8" />,
  },
  {
    title: "Smart Ticket Routing",
    description: "AI analyzes ticket content and routes it to the most appropriate team or agent.",
    icon: <Clock className="w-8 h-8" />,
  },
  {
    title: "Predictive Analytics",
    description: "Forecast ticket volumes and identify trends to optimize resource allocation.",
    icon: <BarChart className="w-8 h-8" />,
  },
  {
    title: "Sentiment Analysis",
    description: "Automatically detect customer sentiment to prioritize urgent or sensitive issues.",
    icon: <Users className="w-8 h-8" />,
  },
]

export function Features() {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Powerful AI Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader className="flex gap-3">
                <div className="p-2 bg-primary-100 rounded-full">{feature.icon}</div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </CardHeader>
              <CardBody>
                <p>{feature.description}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

