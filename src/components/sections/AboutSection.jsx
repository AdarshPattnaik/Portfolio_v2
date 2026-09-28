"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

function RevealWord({ word, progress, range }) {
  // Wide range enables soft overlapping wave across words
  const color = useTransform(progress, range, ["#3f3f46", "#ffffff"]);
  const opacity = useTransform(progress, range, [0.35, 1]);
  const y = useTransform(progress, range, [3, 0]);

  return (
    <motion.span
      style={{ color, opacity, y }}
      className="inline-block mr-[0.3em] font-sans transition-shadow"
    >
      {word}
    </motion.span>
  );
}

function RevealParagraph({ text, paragraphStartIndex, totalWords, progress }) {
  const words = text.split(" ");

  return (
    <p className="text-sm sm:text-base leading-relaxed text-left sm:text-justify font-sans">
      {words.map((word, i) => {
        const globalWordIndex = paragraphStartIndex + i;
        // Step size for starting threshold
        const step = 0.8 / totalWords;
        const start = globalWordIndex * step;
        // Wide 0.20 window ensures 8-10 words are smoothly blending at any scroll position
        const end = Math.min(1, start + 0.2);

        return (
          <RevealWord
            key={i}
            word={word}
            progress={progress}
            range={[start, end]}
          />
        );
      })}
    </p>
  );
}

export default function AboutSection() {
  const { ref: scrollRevealRef, controls } = useScrollReveal(0.15);
  const bioRef = useRef(null);

  // Total words across all paragraphs
  const paragraphs = aboutData.description;
  const paragraphWords = paragraphs.map((p) => p.split(" "));
  const totalWords = paragraphWords.reduce((sum, words) => sum + words.length, 0);

  // Precompute starting word index for each paragraph
  let cumulativeCount = 0;
  const paragraphStartIndices = paragraphWords.map((words) => {
    const start = cumulativeCount;
    cumulativeCount += words.length;
    return start;
  });

  // Track scroll progress directly on the bio container
  // Start when top of bio enters 85% of screen, finish when top of bio reaches 20% of screen
  const { scrollYProgress } = useScroll({
    target: bioRef,
    offset: ["start 85%", "start 20%"],
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardFadeVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="about"
      className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden max-w-full w-full"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
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

        {/* Content */}
        <motion.div
          ref={scrollRevealRef}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-start"
        >
          {/* Left: Bio paragraphs with soft liquid wave scroll reveal */}
          <div className="space-y-6" ref={bioRef}>
            {paragraphs.map((para, i) => (
              <motion.div
                key={i}
                variants={cardFadeVariant}
                className="p-6 rounded-xl border border-border/30 transition-all duration-500 box-glow"
                style={{ background: "rgba(17,17,17,0.4)" }}
              >
                <RevealParagraph
                  text={para}
                  paragraphStartIndex={paragraphStartIndices[i]}
                  totalWords={totalWords}
                  progress={scrollYProgress}
                />
              </motion.div>
            ))}
          </div>

          {/* Right: Stats grid */}
          <motion.div
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.1, delayChildren: 0.3 },
              },
            }}
            className="grid grid-cols-2 gap-4"
          >
            {aboutData.stats.map((stat) => (
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
