'use client'
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useChatbot } from "./ChatbotContext";
import { useEffect } from "react";

export const ChatbotToggleButton = () => {
  const { toggleChatbot } = useChatbot();
  const controls = useAnimation();

  // Rotate the image continuously
  useEffect(() => {
    controls.start({
      rotate: 360,
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "linear",
      },
    });
  }, [controls]);

  // Stop rotation on hover
  const handleHoverStart = () => {
    controls.stop();
    
  };

  // Resume rotation when not hovering
  const handleHoverEnd = () => {
    controls.start({
      rotate: 360,
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "linear",
      },
    });
  };

  return (
    <motion.div
      className="fixed bottom-20 right-4 z-50 cursor-pointer"
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onClick={toggleChatbot}
      whileHover={{ scale: 1.1 }} // Scale up on hover
    >
      <motion.div
        animate={controls}
        style={{ width: 100, height: 100 }} // Set image size
      >
        <Image
          src="/assets/robot1.jpg"
          alt="Chatbot"
          width={100}
          height={100}
          className="rounded-full border-2 border-primary shadow-lg"
        />
      </motion.div>
    </motion.div>
  );
};