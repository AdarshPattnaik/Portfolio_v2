"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Client Work", href: "#client-work" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);

          const sections = navLinks.map((link) => link.href.slice(1));
          for (let i = sections.length - 1; i >= 0; i--) {
            const el = document.getElementById(sections[i]);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= 150) {
                setActiveSection(sections[i]);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: scrolled ? 0 : -100, opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:block"
      >
        <div
          className="flex items-center gap-1 px-2 py-2 rounded-full border border-border-light/50"
          style={{
            background: "rgba(17, 17, 17, 0.8)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative px-4 py-2 text-sm transition-colors duration-300 rounded-full"
              style={{
                color:
                  activeSection === link.href.slice(1) ? "#ffffff" : "#666666",
              }}
              onClick={() => setActiveSection(link.href.slice(1))}
            >
              {activeSection === link.href.slice(1) && (
                <motion.span
                  layoutId="navbar-active"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative z-10 text-glow">{link.label}</span>
            </a>
          ))}
        </div>
      </motion.nav>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 right-4 z-50 md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-full border border-border-light/50"
        style={{
          background: "rgba(17, 17, 17, 0.9)",
          backdropFilter: "blur(20px)",
        }}
        aria-label="Toggle menu"
      >
        <motion.span
          animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          className="block w-5 h-0.5 bg-text-primary"
        />
        <motion.span
          animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
          className="block w-5 h-0.5 bg-text-primary"
        />
        <motion.span
          animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          className="block w-5 h-0.5 bg-text-primary"
        />
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 md:hidden flex items-center justify-center"
            style={{
              background: "rgba(10, 10, 10, 0.4)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
            }}
          >
            <div className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-2xl text-glow"
                  style={{
                    color:
                      activeSection === link.href.slice(1)
                        ? "#ffffff"
                        : "#666666",
                  }}
                  onClick={() => {
                    setActiveSection(link.href.slice(1));
                    setMobileOpen(false);
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
