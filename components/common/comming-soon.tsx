"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Timer } from "lucide-react"

export function ComingSoon() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Working Illustration */}
        <motion.div
          className="relative w-full max-w-md mx-auto mb-8"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/assets/"
            width={400}
            height={300}
            alt="Work in Progress"
            className="mx-auto"
          />

          {/* Animated dots overlay */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <Timer className="w-16 h-16 text-purple-500" />
          </motion.div>
        </motion.div>

        {/* Text Content */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Coming Soon
        </motion.h1>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className="text-xl text-gray-600 mb-6">We&apos;re working hard to bring you something amazing.</p>

          {/* Animated dots */}
          <div className="flex items-center justify-center gap-2">
            <p className="text-lg text-gray-600">Stay tuned</p>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-purple-500 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Background Elements */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 rounded-full bg-purple-200"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + i,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: i * 0.5,
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

