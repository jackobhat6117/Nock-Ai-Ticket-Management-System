"use client"

import { useState } from "react"
import { Card, CardBody, CardHeader, Input, Button } from "@nextui-org/react"
import { Send } from 'lucide-react'

export function AIDemo() {
  const [query, setQuery] = useState("")
  const [response, setResponse] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate AI response (replace with actual API call in production)
    setResponse(`AI-generated response for: "${query}"`)
    setQuery("")
  }

  return (
    <section id="demo" className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Experience AI Ticketing</h2>
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">Try our AI Assistant</h3>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                label="Enter your support query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., How do I reset my password?"
              />
              <Button
                type="submit"
                color="primary"
                endContent={<Send className="ml-2" />}
              >
                Send Query
              </Button>
            </form>
            {response && (
              <div className="mt-6">
                <h4 className="font-semibold mb-2">AI Response:</h4>
                <p className="p-4 bg-gray-100 rounded-lg">{response}</p>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </section>
  )
}

