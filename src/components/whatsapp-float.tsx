"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

export const WhatsAppFloat = () => {
  return (
    <a
      href="https://wa.me/9779856064940"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.3)] hover:scale-110 hover:shadow-[0_12px_40px_rgba(37,211,102,0.4)] transition-all duration-300"
      
      
      
      
      
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={26} strokeWidth={2} />

      {/* Subtle warm pulse ring */}
      <span className="absolute inset-0 rounded-full border-2 border-[#25D366]/60 animate-ping opacity-50 pointer-events-none" />

      {/* Warm glow ring */}
      <span className="absolute -inset-1 rounded-full bg-[#25D366]/10 animate-pulse pointer-events-none" />
    </a>
  );
};
