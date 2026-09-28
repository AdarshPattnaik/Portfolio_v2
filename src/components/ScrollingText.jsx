"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";

export default function ScrollingText({
  text = "WELCOME TO MY WORLD OF CODE & CREATIVITY • BUILDING THE FUTURE ONE PROJECT AT A TIME • ",
}) {
  const baseText = text.endsWith(" ") ? text : text + " ";
  const repeatedText = baseText.repeat(4);

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 0.0025], {
    clamp: false,
  });

  const directionFactor = useRef(-1);

  useAnimationFrame((t, delta) => {
    // Base extremely slow speed (0.02)
    let moveBy = directionFactor.current * 0.0025 * (delta / 16);

    // Change direction based on scroll velocity
    if (velocityFactor.get() < 0) {
      directionFactor.current = 1; // Scroll up -> move right
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = -1; // Scroll down -> move left
    }

    // Add gentle velocity boost when scrolling
    moveBy += directionFactor.current * Math.abs(velocityFactor.get()) * (delta / 16);

    baseX.set(baseX.get() + moveBy);
  });

  // Seamless wrap between -50% and 0%
  const x = useTransform(baseX, (v) => {
    const wrapped = (((v % 50) + 50) % 50) - 50;
    return `${wrapped}%`;
  });

  const textStyle = {
    fontSize: "clamp(4rem, 10vw, 9rem)",
    fontWeight: 900,
    letterSpacing: "0.05em",
    lineHeight: 1.1,
    whiteSpace: "nowrap",
    paddingRight: "0.2em",
  };

  return (
    <motion.div
      className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none select-none"
      style={{ zIndex: 2 }}
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.5, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div 
        className="flex w-max text-[rgba(255,255,255,0.05)] hover:text-[rgba(255,255,255,0.15)] transition-colors duration-500 pointer-events-auto cursor-default" 
        style={{ x, willChange: 'transform' }}
      >
        <p style={textStyle}>{repeatedText}</p>
        <p style={textStyle}>{repeatedText}</p>
      </motion.div>
    </motion.div>
  );
}
