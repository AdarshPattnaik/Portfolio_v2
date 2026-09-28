"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { footerData } from "@/data/footerData";
import BeamText from "@/components/BeamText";
import MagneticWrapper from "@/components/MagneticWrapper";
import ScrollingText from "@/components/ScrollingText";
import { FiCheck, FiCopy, FiMail } from "react-icons/fi";

const socialIcons = {
  github: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  linkedin: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  twitter: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  instagram: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
};

export default function FooterSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(footerData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  return (
    <footer id="contact" className="relative pt-40 pb-12 px-6 overflow-hidden mt-20">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Scrolling Text Layer */}
      <ScrollingText text="LET'S CONNECT • LET'S COLLABORATE • HIRE ME • GET IN TOUCH • LET'S BUILD • " />

      {/* Top separator */}
      <div className="gradient-line mb-24 absolute top-0 left-0 w-full" />

      <div className="max-w-5xl mx-auto relative z-10 pointer-events-none">
        
        {/* Everything inside max-w-5xl needs pointer-events-auto so buttons work over the scrolling text */}
        <div className="pointer-events-auto">
          {/* Big CTA heading */}
          <div className="text-center mb-16">
            <BeamText
              as="h2"
              className="text-4xl sm:text-5xl md:text-7xl font-bold"
            >
              {footerData.title}
            </BeamText>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-text-secondary mt-6 text-lg max-w-xl mx-auto"
            >
              {footerData.subtitle}
            </motion.p>
          </div>

          {/* Email */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={lineVariants}
            className="text-center mb-20 flex justify-center relative"
          >
            <div className="relative inline-block">
              {/* Floating Animated Copied Toast / Tooltip */}
              <AnimatePresence>
                {copied && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="absolute -top-14 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-4 py-2 rounded-full bg-[#161b22] border border-emerald-500/40 text-emerald-400 text-sm font-semibold tracking-wide shadow-[0_10px_25px_rgba(16,185,129,0.25)] backdrop-blur-xl whitespace-nowrap pointer-events-none"
                  >
                    <FiCheck className="w-4 h-4 text-emerald-400 stroke-[3]" />
                    <span>Copied to clipboard!</span>
                    {/* Tooltip arrow down */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-6 border-x-transparent border-t-6 border-t-emerald-500/40" />
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                onClick={copyEmail}
                initial="initial"
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                className={`group relative inline-flex items-center gap-3.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border transition-all duration-300 cursor-pointer overflow-hidden ${
                  copied
                    ? "bg-emerald-950/30 border-emerald-500/50 text-white shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                    : "bg-[#111111]/80 border-[#ffffff0a] text-[#a0a0a0] hover:text-white hover:border-accent/40 hover:bg-[#1a1a24]/80 hover:shadow-[0_0_30px_rgba(120,119,198,0.15)]"
                }`}
              >
                {/* Hover Glass Shine */}
                <motion.div
                  variants={{
                    initial: { left: "-100%" },
                    hover: { left: "200%", transition: { duration: 0.8, ease: "easeInOut" } }
                  }}
                  className="absolute top-0 w-full h-full z-0 pointer-events-none transform -skew-x-[25deg]"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)"
                  }}
                />

                <div className="relative z-10 flex items-center gap-3 sm:gap-4 text-lg sm:text-2xl font-medium">
                  <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 border border-white/10 group-hover:border-accent/30 transition-colors">
                    {copied ? (
                      <FiCheck className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
                    ) : (
                      <FiMail className="w-4 h-4 text-accent group-hover:scale-110 transition-transform duration-300" />
                    )}
                  </div>

                  <span className="tracking-tight sm:tracking-normal">{footerData.email}</span>

                  <div className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-300 ${
                    copied
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                      : "bg-white/5 text-text-secondary border border-white/10 group-hover:text-white group-hover:border-white/20 group-hover:bg-white/10"
                  }`}>
                    {copied ? (
                      <>
                        <FiCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <FiCopy className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                        <span className="hidden sm:inline">Copy</span>
                      </>
                    )}
                  </div>
                </div>
              </motion.button>
            </div>
          </motion.div>

          {/* Social icons */}
          <motion.div
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={lineVariants}
            className="flex justify-center gap-6 mb-24"
          >
            {footerData.socials.map((social, i) => (
              <MagneticWrapper key={social.name} strength={0.4}>
                <motion.a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative flex items-center justify-center w-14 h-14 rounded-full border border-white/10 text-text-secondary transition-all duration-300 hover:text-white hover:border-white/30 bg-white/5 backdrop-blur-xl"
                  aria-label={social.name}
                >
                  <div className="relative z-10 transition-colors duration-300">
                    {socialIcons[social.icon]}
                  </div>
                </motion.a>
              </MagneticWrapper>
            ))}
          </motion.div>

          {/* Navigation links */}
          <motion.div
            custom={4}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={lineVariants}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            {footerData.navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#a0a0a0] hover:text-white transition-all duration-300 hover:-translate-y-1"
              >
                {link.label}
              </a>
            ))}
          </motion.div>

          {/* Bottom */}
          <div className="gradient-line mb-8" />
          <motion.div
            custom={5}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={lineVariants}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium tracking-wide text-[#777777]"
          >
            <p>{footerData.copyright}</p>
            <p>{footerData.tagline}</p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
