"use client";

import { motion } from "framer-motion";
import { aboutData } from "@/data/aboutData";
import { useScrollReveal } from "@/utils/useScrollReveal";
import { useCountUp } from "@/utils/useCountUp";
import BeamText from "@/components/BeamText";

function StatCard({ label, value }) {
  const { count, ref } = useCountUp(value, 2000);

  return (
    <div ref={ref} className="text-center group">
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="p-6 rounded-2xl border border-border/50 transition-all duration-500 box-glow"
        style={{ background: "rgba(17,17,17,0.5)" }}
      >
        <div
          className="text-4xl sm:text-5xl font-bold mb-2 transition-all duration-300"
          style={{
            color: "#ffffff",
            textShadow: "0 0 30px rgba(59,130,246,0.3)",
          }}
        >
          {count}
          <span className="text-accent">+</span>
        </div>
        <div className="text-text-secondary text-sm uppercase tracking-wider">
          {label}
        </div>
      </motion.div>
    </div>
  );
}

export default function AboutSection() {
  const { ref, controls } = useScrollReveal(0.1);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const unfoldVariant = {
    hidden: {
      opacity: 0,
      rotateX: 90,
      transformOrigin: "top center",
      y: -30,
    },
    visible: {
      opacity: 1,
      rotateX: 0,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <BeamText
            as="h2"
            className="text-4xl sm:text-5xl md:text-6xl font-bold"
          >
            {aboutData.title}
          </BeamText>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-text-secondary mt-4 text-lg"
          >
            {aboutData.subtitle}
          </motion.p>
          <div className="gradient-line mt-8 max-w-xs mx-auto" />
        </div>

        {/* Content with unfold animation */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-16 items-start"
        >
          {/* Left: Bio paragraphs */}
          <div className="space-y-6" style={{ perspective: "1000px" }}>
            {aboutData.description.map((para, i) => (
              <motion.div
                key={i}
                variants={unfoldVariant}
                className="p-6 rounded-xl border border-border/30 transition-all duration-500 box-glow"
                style={{ background: "rgba(17,17,17,0.3)" }}
              >
                <p className="text-text-primary leading-relaxed text-justify">{para}</p>
              </motion.div>
            ))}
          </div>

          {/* Right: Stats grid */}
          <motion.div
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
            }}
            className="grid grid-cols-2 gap-4"
          >
            {aboutData.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={{
                  hidden: { opacity: 0, scale: 0.8, y: 30 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 12,
                    },
                  },
                }}
              >
                <StatCard label={stat.label} value={stat.value} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
