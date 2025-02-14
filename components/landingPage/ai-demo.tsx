"use client";

import { Card, CardBody, CardHeader, Input, Button } from "@nextui-org/react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { useChat } from "ai/react";
// Replace with the correct path to your SVG

export function AIChat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <section id="ai-chat" className="py-20 px-6 bg-gray-50 relative">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Experience AI-Powered Chat
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex w-full relative">
           
            <motion.div
              className="absolute -left-52 mt-6"
              animate={{ rotate: 360 }} 
              transition={{
                repeat: Infinity, 
                ease: "linear", 
                duration: 10, 
                
              }}
            >
              <img
                src="/assets/Sefed.svg"
                alt="AI Chat Icon"
                className="h-96 w-full opacity-65"
              />
            </motion.div>

            {/* Card */}
            <Card className="relative overflow-visible w-full">
              <CardHeader className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">AI Assistant</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-4 mb-4 h-[300px] overflow-y-auto">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-2 rounded-lg ${
                        message.role === "user"
                          ? "bg-blue-100 ml-auto"
                          : "bg-gray-100"
                      } max-w-[80%]`}
                    >
                      {message.content}
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="text"
                    label="Enter your message"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="e.g., How can I create a new ticket?"
                  />
                  <Button
                    type="submit"
                    color="primary"
                    endContent={<Send className="ml-2" />}
                  >
                    Send Message
                  </Button>
                </form>
              </CardBody>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}