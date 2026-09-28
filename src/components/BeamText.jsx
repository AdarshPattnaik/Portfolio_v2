"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/utils/useScrollReveal";

export default function BeamText({ children, className = "", as = "h2" }) {
  const Tag = as;
  const { ref, controls } = useScrollReveal(0.2);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
      className="relative inline-block isolate"
    >
      <Tag
        className={`relative text-[#888888] ${className}`}
      >
        {children}
        <span
          className="absolute inset-0 z-[-1] pointer-events-none"
          aria-hidden="true"
          style={{
            WebkitTextStroke: "2px transparent",
            color: "transparent",
            background:
              "conic-gradient(from var(--angle), transparent 0%, transparent 80%, rgba(255,255,255,0.8) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            animation: "spin-angle 3s linear infinite",
          }}
        >
          {children}
        </span>
      </Tag>
    </motion.div>
  );
}
