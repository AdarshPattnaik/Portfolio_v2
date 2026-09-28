"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/utils/useScrollReveal";

export default function GlitchText({ children, className = "", as = "h2" }) {
  const { ref, controls } = useScrollReveal(0.3);
  const Tag = as;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        },
      }}
    >
      <Tag
        className={`relative inline-block ${className}`}
        style={{ animation: "glitch 3s infinite" }}
      >
        {children}
        {/* Glitch layers */}
        <span
          className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-0"
          style={{
            animation: "glitch 3s infinite",
            animationDelay: "0.05s",
            color: "#3b82f6",
            clipPath: "inset(0 0 70% 0)",
          }}
          aria-hidden="true"
        >
          {children}
        </span>
        <span
          className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-0"
          style={{
            animation: "glitch 3s infinite",
            animationDelay: "0.1s",
            color: "#ef4444",
            clipPath: "inset(70% 0 0 0)",
          }}
          aria-hidden="true"
        >
          {children}
        </span>
      </Tag>
    </motion.div>
  );
}
