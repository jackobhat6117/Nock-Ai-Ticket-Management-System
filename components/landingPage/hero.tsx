"use client"

import { Button } from "@nextui-org/react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className=" bg-white relative overflow-hidden">
      {/* Navigation */}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 pt-12">
        {/* Left Content */}
        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-[#1a237e] text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
             Automated AI-Powered Incident Management System
          </motion.h1>
          
          <motion.p
            className="text-xl mb-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Streamline your support process with our intelligent ticketing system. Leverage AI to automate responses,
            prioritize issues, and improve resolution times.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
             <Button
              as="a"
              href="#ai-chat"
              color="success"
              size="lg"
              
              endContent={<ArrowRight className="ml-2 text-white" />}
            >
              <p className="text-white font-bold">Try AI Chat Now</p>
            </Button>
          </motion.div>
        </motion.div>

        {/* Right Content - AI Illustration */}
        <div className="relative h-[500px]">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-800 rounded-l-full" />

          {/* Decorative elements */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, 10, 0],
              }}
              transition={{
                delay: i * 0.2,
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          ))}

          {/* Rotating circles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`circle-${i}`}
              className="absolute border-2 border-cyan-400 rounded-full opacity-20"
              style={{
                width: `${(i + 1) * 150}px`,
                height: `${(i + 1) * 150}px`,
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}

          {/* AI Robot */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <div className="relative w-64 h-64">
              {/* Brain */}
              <motion.div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <div className="absolute inset-4 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-full opacity-80" />
              </motion.div>

              {/* Robot face */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-2xl">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full" />
              </div>
            </div>
          </motion.div>

          {/* Connecting lines */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`line-${i}`}
              className="absolute h-1 w-20 bg-gradient-to-r from-pink-500 to-transparent"
              style={{
                top: `${20 + i * 20}%`,
                left: `${30 + Math.random() * 40}%`,
                rotate: `${-30 + Math.random() * 60}deg`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.8, 1, 0.8],
              }}
              transition={{
                delay: i * 0.3,
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

