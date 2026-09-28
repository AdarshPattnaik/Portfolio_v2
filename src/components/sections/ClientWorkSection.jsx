"use client";

import { motion } from "framer-motion";
import { clientWorkData } from "@/data/clientWorkData";
import { useScrollReveal } from "@/utils/useScrollReveal";
import BeamText from "@/components/BeamText";

function WorkCard({ item, index }) {
  const { ref, controls } = useScrollReveal(0.15);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {
          opacity: 0,
          y: 35,
          scale: 0.97,
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.5,
            delay: index * 0.08,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
      className="group relative flex flex-col h-full p-4 sm:p-5 rounded-2xl border border-white/10 bg-[#121217]/90 hover:bg-[#16161f] hover:border-accent/40 transition-all duration-400 overflow-hidden cursor-pointer"
      style={{
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        willChange: "transform, opacity",
      }}
    >
      <a
        href={item.link || "#"}
        target={item.link && item.link !== "#" ? "_blank" : "_self"}
        rel="noopener noreferrer"
        className="flex flex-col h-full"
      >
        {/* Top Image Preview */}
        <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden mb-4 bg-[#0a0a0d] border border-white/5">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
          {/* Subtle Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-400" />
        </div>

        {/* Bottom Info & Arrow */}
        <div className="flex items-center justify-between gap-4 mt-auto px-1">
          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-accent transition-colors duration-300 truncate">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary mt-1 font-medium line-clamp-2">
              {item.category}
            </p>
          </div>

          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/15 flex items-center justify-center text-text-secondary group-hover:text-white group-hover:border-accent group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300 shrink-0">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 17L17 7M17 7H7M17 7V17"
              />
            </svg>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

export default function ClientWorkSection() {
  return (
    <section id="client-work" className="relative py-32 px-6 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          {/* Top Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.25em] text-accent uppercase mb-3"
          >
            <span>→</span>
            <span>{clientWorkData.tagline}</span>
          </motion.div>

          <BeamText
            as="h2"
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold max-w-4xl mx-auto leading-tight"
          >
            {clientWorkData.title}
          </BeamText>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary mt-4 text-base sm:text-lg max-w-xl mx-auto"
          >
            {clientWorkData.subtitle}
          </motion.p>
        </div>

        {/* Outer Grid Container Box */}
        <div className="p-4 sm:p-8 rounded-3xl border border-white/10 bg-[#0d0d11]/90 backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clientWorkData.clientWorks.map((item, i) => (
              <WorkCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
