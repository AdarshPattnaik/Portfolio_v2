"use client";

import { ReactLenis } from "lenis/react";

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis root options={{ lerp: 0.14, wheelMultiplier: 1.1, touchMultiplier: 1.5, smoothTouch: false }}>
      {children}
    </ReactLenis>
  );
}
