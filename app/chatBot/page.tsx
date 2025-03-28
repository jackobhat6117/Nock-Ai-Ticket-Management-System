"use client";

import { JSX, useState } from "react";
import { SendIcon, RefreshCcw } from "lucide-react";
import { Avatar, Button, Card, Divider, Input, Spinner } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import path from "path";


interface Message {
  id: number;
  content: string | any
  sender: "user" | "ai";
}

interface ApiResponse {
  sql_query: string;
  results: Array<{ summary: string }>;
  summary: string;
}

export default function AIAssistancePage(path:any) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, content: "Hello! How can I assist you today?", sender: "ai" },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  console.log('pathname', path.path.path)

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        content: inputMessage,
        sender: "user",
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");
      setIsLoading(true);
      setError(null);

      try {
   
        const apiEndpint = path.path.path === "/dashboard/noc-it" ? "/api/nocChat" : "/api/chat"

        console.log('apiEndpint', apiEndpint)

        const inputMessages = path.path === "/dashboard/noc-it" ? JSON.stringify({status_summary: inputMessage}) :  JSON.stringify({question: inputMessage}) 
        const response = await fetch(apiEndpint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: inputMessages,
        });

        console.log('response', response)

        // if (!response.ok) {
        //   throw new Error("Failed to fetch response from the API");
        // }

        const data: ApiResponse = await response.json();

        const aiResponse: Message = {
          id: messages.length + 2,
          content: (
            <div>
              {/* <div className="font-bold">SQL Query:</div> */}
              {/* <pre className="bg-default-100 p-2 rounded-lg">{data.sql_query}</pre>
              <div className="font-bold mt-4">Results:</div>
              <ul className="list-disc pl-5">
                {data.results.map((result, index) => (
                  <li key={index}>{result.summary}</li>
                ))}
              </ul> */}
              {/* <div className="font-bold mt-4">Summary:</div> */}
              <p>{data.summary.replace("Professional Summary: ", "")}</p>

            </div>
          ),
          sender: "ai",
        };
        setMessages((prevMessages) => [...prevMessages, aiResponse]);
      } catch (error) {
        setError("An error occurred while fetching the response.");
        const aiResponse: Message = {
          id: messages.length + 2,
          content: "Sorry, I couldn't fetch the response. Please try again.",
          sender: "ai",
        };
        setMessages((prevMessages) => [...prevMessages, aiResponse]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
 
      <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Noc-AI Assistance</h1>
        <Card className="flex-grow flex flex-col p-4 overflow-hidden">
          <div className="flex-grow overflow-y-auto mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                } mb-4`}
              >
                <div
                  className={`flex items-start ${
                    message.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <Avatar
                    src={
                      message.sender === "user"
                        ? "/placeholder.svg?height=32&width=32"
                        : "/placeholder.svg?height=32&width=32&text=AI"
                    }
                    className={`${message.sender === "user" ? "ml-3" : "mr-3"}`}
                  />
                  <div
                    className={`px-4 py-2 rounded-lg ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-default-100"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="flex items-start flex-row">
                  <Avatar
                    src="/placeholder.svg?height=32&width=32&text=AI"
                    className="mr-3"
                  />
                  <div className="px-4 py-2 rounded-lg bg-default-100">
                    <Spinner size="sm" />
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div className="flex justify-start mb-4">
                <div className="flex items-start flex-row">
                  <Avatar
                    src="/placeholder.svg?height=32&width=32&text=AI"
                    className="mr-3"
                  />
                  <div className="px-4 py-2 rounded-lg bg-danger-100 text-danger-700">
                    {error}
                  </div>
                </div>
              </div>
            )}
          </div>
          <Divider className="my-4" />
          <div className="flex items-center">
            <Input
              fullWidth
              placeholder="Type your message here..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              endContent={
                <Button
                  isIconOnly
                  color="primary"
                  aria-label="Send"
                  onClick={handleSendMessage}
                  disabled={isLoading}
                >
                  <SendIcon className="h-4 w-4" />
                </Button>
              }
            />
            <Button
              isIconOnly
              variant="light"
              aria-label="New Chat"
              className="ml-2"
              onClick={() => setMessages([])}
              disabled={isLoading}
            >
              <RefreshCcw className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
   
  );
}