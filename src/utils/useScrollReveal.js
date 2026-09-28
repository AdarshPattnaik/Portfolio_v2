"use client";

import { useEffect, useRef, useState } from "react";
import { useAnimation, useInView } from "framer-motion";

export function useScrollReveal(threshold = 0.2) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return { ref, controls, isInView };
}

export function useScrollRevealRepeat(threshold = 0.2) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: threshold });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  return { ref, controls, isInView };
}
