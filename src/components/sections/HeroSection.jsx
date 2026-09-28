"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { homeData } from "@/data/homeData";
import MagneticWrapper from "@/components/MagneticWrapper";
import ScrollingText from "@/components/ScrollingText";

function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let particles = [];
    let mouse = { x: -1000, y: -1000 };
    let isVisible = true;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createParticles() {
      particles = [];
      // Cap maximum particles to 80 to prevent O(n^2) lag on high-res screens
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 80);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.2 + 0.05,
        });
      }
    }

    function draw() {
      if (!isVisible) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Mouse repulsion (optimized)
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < 14400) { // 120 * 120
          const dist = Math.sqrt(distSq);
          const force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 2;
          p.y += (dy / dist) * force * 2;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connections (optimized O(n^2) loop)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 10000) { // 100 * 100
            const dist = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.015 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    }

    function handleMouse(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (!wasVisible && isVisible) {
          draw();
        }
      },
      { threshold: 0.01 }
    );
    observer.observe(canvas);

    resize();
    createParticles();
    draw();

    window.addEventListener("resize", () => {
      resize();
      createParticles();
    }, { passive: true });
    window.addEventListener("mousemove", handleMouse, { passive: true });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

function PremiumRevealText({ text, delay = 0 }) {
  const words = text.split(" ");
  let globalIndex = 0;

  return (
    <span className="inline-flex flex-wrap justify-center gap-x-[0.35em] max-w-full">
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-flex overflow-hidden">
          {word.split("").map((char, i) => {
            const currentDelay = delay + globalIndex * 0.04;
            globalIndex++;
            return (
              <motion.span
                key={i}
                initial={{
                  y: "120%",
                  opacity: 0,
                  filter: "blur(10px)",
                  rotateX: -45,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                  filter: "blur(0px)",
                  rotateX: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: currentDelay,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="inline-block transition-colors duration-200 hover:text-[#f0f0f0] cursor-default"
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

function TypewriterRoles({ roles }) {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRole];
    let timeout;

    if (!isDeleting && displayed.length < role.length) {
      timeout = setTimeout(
        () => setDisplayed(role.slice(0, displayed.length + 1)),
        80
      );
    } else if (!isDeleting && displayed.length === role.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(
        () => setDisplayed(role.slice(0, displayed.length - 1)),
        40
      );
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, currentRole, roles]);

  return (
    <span className="text-accent">
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-[3px] h-[1em] bg-accent ml-1 align-middle"
      />
    </span>
  );
}

function CircuitLines() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let paths = [];
    let beams = [];
    let isVisible = true;

    const colors = [
      { r: 240, g: 240, b: 240 },   // near white
      { r: 210, g: 210, b: 210 },   // light silver
      { r: 220, g: 225, b: 235 },   // cool silver
    ];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      paths = generatePaths(canvas.width, canvas.height);
      initBeams();
    }

    function generatePaths(width, height) {
      const newPaths = [];
      const gridSize = width > 768 ? 60 : 40;
      const cols = Math.floor(width / gridSize);
      const rows = Math.floor(height / gridSize);
      
      const numPaths = Math.min(Math.floor((width * height) / 25000), 40);
      
      for (let i = 0; i < numPaths; i++) {
        let startEdge = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
        let x, y, currentDir, sign;
        
        // Start points snapped to grid
        if (startEdge === 0) {
          x = Math.floor(Math.random() * cols) * gridSize;
          y = -gridSize;
          currentDir = 'v';
          sign = 1;
        } else if (startEdge === 1) {
          x = width + gridSize;
          y = Math.floor(Math.random() * rows) * gridSize;
          currentDir = 'h';
          sign = -1;
        } else if (startEdge === 2) {
          x = Math.floor(Math.random() * cols) * gridSize;
          y = height + gridSize;
          currentDir = 'v';
          sign = -1;
        } else {
          x = -gridSize;
          y = Math.floor(Math.random() * rows) * gridSize;
          currentDir = 'h';
          sign = 1;
        }
        
        const path = [{x, y}];
        let segments = Math.floor(Math.random() * 4) + 3; // 3 to 6
        
        for (let j = 0; j < segments; j++) {
          let length = (Math.floor(Math.random() * 5) + 2) * gridSize;
          
          if (currentDir === 'h') {
            x += length * sign;
            currentDir = 'v';
            sign = (y < height / 2) ? 1 : -1;
            if (Math.random() > 0.8) sign *= -1;
          } else {
            y += length * sign;
            currentDir = 'h';
            sign = (x < width / 2) ? 1 : -1;
            if (Math.random() > 0.8) sign *= -1;
          }
          path.push({x, y});
        }
        
        let totalLength = 0;
        const segmentsData = [];
        for (let k = 0; k < path.length - 1; k++) {
          const p1 = path[k];
          const p2 = path[k+1];
          const len = Math.abs(p2.x - p1.x) + Math.abs(p2.y - p1.y);
          segmentsData.push({ p1, p2, length: len, accumulatedLength: totalLength });
          totalLength += len;
        }
        
        newPaths.push({ points: path, segments: segmentsData, totalLength });
      }
      return newPaths;
    }

    function createBeam(pathIndex) {
      const path = paths[pathIndex];
      const color = colors[Math.floor(Math.random() * colors.length)];
      return {
        pathIndex,
        progress: -Math.random() * 200, // delay start
        speed: Math.random() * 1.5 + 1.5,
        length: Math.random() * 100 + 50,
        color,
        opacity: Math.random() * 0.2 + 0.1, // Reduced opacity (0.1 to 0.3)
      };
    }

    function initBeams() {
      beams = [];
      const numBeams = Math.min(paths.length, 15);
      for (let i = 0; i < numBeams; i++) {
        const pathIndex = Math.floor(Math.random() * paths.length);
        beams.push(createBeam(pathIndex));
      }
    }

    function getPointAtDistance(path, distance) {
      if (distance <= 0) return path.segments[0].p1;
      if (distance >= path.totalLength) return path.segments[path.segments.length - 1].p2;
      
      for (let seg of path.segments) {
        if (distance >= seg.accumulatedLength && distance <= seg.accumulatedLength + seg.length) {
          const t = (distance - seg.accumulatedLength) / seg.length;
          return {
            x: seg.p1.x + (seg.p2.x - seg.p1.x) * t,
            y: seg.p1.y + (seg.p2.y - seg.p1.y) * t
          };
        }
      }
      return path.segments[path.segments.length - 1].p2;
    }

    function draw() {
      if (!isVisible) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw static circuit paths
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;
      paths.forEach(path => {
        ctx.beginPath();
        ctx.moveTo(path.points[0].x, path.points[0].y);
        for (let i = 1; i < path.points.length; i++) {
          ctx.lineTo(path.points[i].x, path.points[i].y);
        }
        ctx.stroke();
        
        // Pad at the end
        const lastPoint = path.points[path.points.length - 1];
        ctx.beginPath();
        ctx.arc(lastPoint.x, lastPoint.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
        ctx.fill();
      });

      // Draw beams
      beams.forEach((beam, index) => {
        beam.progress += beam.speed;
        const path = paths[beam.pathIndex];
        
        if (beam.progress - beam.length > path.totalLength) {
          // Re-spawn beam on a new path
          const newPathIndex = Math.floor(Math.random() * paths.length);
          beams[index] = createBeam(newPathIndex);
          return;
        }

        const headDist = beam.progress;
        const tailDist = beam.progress - beam.length;

        // Draw segmented beam for gradient around corners
        const numSteps = 20;
        const stepDist = beam.length / numSteps;
        
        for (let i = 0; i < numSteps; i++) {
          const dStart = tailDist + i * stepDist;
          const dEnd = tailDist + (i + 1) * stepDist;
          
          if (dEnd < 0 || dStart > path.totalLength) continue;
          
          const pStart = getPointAtDistance(path, dStart);
          const pEnd = getPointAtDistance(path, dEnd);
          
          const alpha = (i / numSteps) * beam.opacity;
          
          ctx.beginPath();
          ctx.moveTo(pStart.x, pStart.y);
          ctx.lineTo(pEnd.x, pEnd.y);
          ctx.strokeStyle = `rgba(${beam.color.r}, ${beam.color.g}, ${beam.color.b}, ${alpha})`;
          ctx.lineWidth = 2;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.stroke();
        }

        // Glow effect at the head
        if (headDist > 0 && headDist < path.totalLength) {
          const headPoint = getPointAtDistance(path, headDist);
          // Solid dot in front
          ctx.beginPath();
          ctx.arc(headPoint.x, headPoint.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(draw);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (!wasVisible && isVisible) {
          draw();
        }
      },
      { threshold: 0.01 }
    );
    observer.observe(canvas);

    resize();
    draw();

    const handleResize = () => {
      resize();
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

function LiveClock({ align = "right" }) {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return <div className="w-24 h-10" />; // Prevent layout shift

  const dateStr = time.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).toUpperCase();

  const timeStr = time.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`flex flex-col gap-1 ${align === "left" ? "items-start text-left" : "items-end text-right"}`}>
      <span className="text-[#777777] text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
        {dateStr}
      </span>
      <span className="text-[#a0a0a0] text-xs sm:text-sm font-semibold tracking-[0.15em]">
        {timeStr}
      </span>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden max-w-full w-full px-4 sm:px-6"
    >
      <ParticleField />

      {/* Top Left: Role & Mobile Clock */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute top-6 left-4 sm:top-8 sm:left-6 md:top-10 md:left-10 z-20 pointer-events-none flex flex-col gap-3 sm:gap-4 items-start"
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ 
              filter: [
                "drop-shadow(0 0 4px rgba(59,130,246,0.3))",
                "drop-shadow(0 0 10px rgba(59,130,246,0.6))",
                "drop-shadow(0 0 4px rgba(59,130,246,0.3))"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </motion.div>
          <span className="text-[#777777] text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
            Full Stack Engineer
          </span>
        </div>

        {/* Mobile Clock: only visible on small screens to avoid hamburger overlap */}
        <div className="block md:hidden pl-1">
          <LiveClock align="left" />
        </div>
      </motion.div>

      {/* Top Right: Desktop Clock */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="hidden md:block absolute top-6 right-4 sm:top-8 sm:right-6 md:top-10 md:right-10 z-20 pointer-events-none"
      >
        <LiveClock align="right" />
      </motion.div>

      {/* Circuit Board Pattern with Glowing Beams */}
      <CircuitLines />

      {/* Aurora Ambient Glows (Clipped) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[20%] w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] rounded-full mix-blend-screen pointer-events-none blur-[80px] sm:blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)", willChange: "transform, opacity" }}
        />
        
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
            x: [0, -60, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] right-[10%] w-[250px] h-[250px] sm:w-[600px] sm:h-[600px] rounded-full mix-blend-screen pointer-events-none blur-[100px] sm:blur-[150px]"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)", willChange: "transform, opacity" }}
        />
      </div>

      <div className="relative z-10 text-center px-2 sm:px-6 max-w-4xl mx-auto">
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-text-secondary text-sm sm:text-lg mb-3 sm:mb-4 tracking-[0.15em] sm:tracking-[0.2em] uppercase"
        >
          {homeData.greeting}
        </motion.p>

        {/* Name with premium reveal animation */}
        <h1 className="text-[clamp(1.8rem,5vw,6rem)] font-bold mb-4 sm:mb-6 text-text-primary uppercase tracking-wide flex justify-center flex-wrap overflow-visible leading-tight">
          <PremiumRevealText text={homeData.name} delay={0.5} />
        </h1>

        {/* Typewriter roles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="text-lg sm:text-2xl md:text-3xl mb-6 sm:mb-8 h-8 sm:h-10"
        >
          <TypewriterRoles roles={homeData.roles} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="text-text-secondary text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed"
        >
          {homeData.tagline}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.6 }}
        >
          <motion.a
            href={homeData.cta.href}
            initial="initial"
            whileHover="hover"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 hover:border-white/40 text-text-primary transition-all duration-500 bg-white/10 backdrop-blur-md overflow-hidden shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]"
          >
              {/* Glass Glare Animation Element */}
              <motion.div
                variants={{
                  initial: { left: "-100%" },
                  hover: { 
                    left: "200%", 
                    transition: { duration: 0.8, ease: "easeInOut" } 
                  }
                }}
                className="absolute top-0 w-[150%] h-full z-0 pointer-events-none transform -skew-x-[25deg]"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)"
                }}
              />
              <span className="relative z-10 font-medium group-hover:text-white transition-colors duration-300">
                {homeData.cta.text}
              </span>
              <svg
                className="relative z-10 w-5 h-5 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-text-secondary text-xs tracking-[0.3em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-border-light flex items-start justify-center p-1"
        >
          <motion.div className="w-1 h-2 rounded-full bg-text-secondary" />
        </motion.div>
      </motion.div>
      {/* Scrolling background text */}
      <ScrollingText />

    </section>
  );
}
