"use client";

import { motion } from "framer-motion";
import { useMagneticEffect } from "@/utils/useMagneticEffect";

export default function MagneticWrapper({ children, strength = 0.3, className = "" }) {
  const { ref, position, handleMouseMove, handleMouseLeave } =
    useMagneticEffect(strength);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
