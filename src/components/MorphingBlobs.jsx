"use client";

import { useEffect, useRef } from "react";

export default function MorphingBlobs() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationId;
    let width, height;

    const blobs = [
      { x: 0.2, y: 0.3, radius: 200, color: "rgba(59, 130, 246, 0.04)", speed: 0.0003, phase: 0 },
      { x: 0.7, y: 0.6, radius: 250, color: "rgba(139, 92, 246, 0.03)", speed: 0.0004, phase: 2 },
      { x: 0.5, y: 0.2, radius: 180, color: "rgba(59, 130, 246, 0.03)", speed: 0.0005, phase: 4 },
    ];

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight * 5;
      canvas.width = width;
      canvas.height = height;
    }

    function draw(time) {
      ctx.clearRect(0, 0, width, height);

      blobs.forEach((blob) => {
        const offsetX = Math.sin(time * blob.speed + blob.phase) * 100;
        const offsetY = Math.cos(time * blob.speed * 0.7 + blob.phase) * 80;
        const bx = blob.x * width + offsetX;
        const by = blob.y * height + offsetY;
        const r = blob.radius + Math.sin(time * blob.speed * 1.5) * 40;

        const gradient = ctx.createRadialGradient(bx, by, 0, bx, by, r);
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.arc(bx, by, r, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
