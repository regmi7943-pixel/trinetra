"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { motion } from "motion/react";

export const WhatsAppFloat = () => {
  return (
    <motion.a
      href="https://wa.me/9771234567890"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.35),0_2px_8px_rgba(44,24,16,0.1)] hover:shadow-[0_6px_30px_rgba(37,211,102,0.5),0_4px_12px_rgba(44,24,16,0.12)] transition-shadow duration-300"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 1.5,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={26} strokeWidth={2} />

      {/* Subtle warm pulse ring */}
      <span className="absolute inset-0 rounded-full border-2 border-[#25D366]/60 animate-ping opacity-50 pointer-events-none" />

      {/* Warm glow ring */}
      <span className="absolute -inset-1 rounded-full bg-[#25D366]/10 animate-pulse pointer-events-none" />
    </motion.a>
  );
};
