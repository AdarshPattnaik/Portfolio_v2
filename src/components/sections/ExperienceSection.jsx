"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { experienceData } from "@/data/experienceData";
import { useScrollReveal } from "@/utils/useScrollReveal";
import BeamText from "@/components/BeamText";

function TimelineCard({ item, index, isLeft }) {
  const { ref, controls } = useScrollReveal(0.3);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {
          opacity: 0,
          x: isLeft ? -80 : 80,
          rotateY: isLeft ? -15 : 15,
          scale: 0.9,
        },
        visible: {
          opacity: 1,
          x: 0,
          rotateY: 0,
          scale: 1,
          transition: {
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.1,
          },
        },
      }}
      className={`relative flex items-center w-full mb-12 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
      style={{ perspective: "1000px" }}
    >
      {/* Card */}
      <div className={`w-full md:w-[calc(50%-30px)] ${isLeft ? "md:pr-0" : "md:pl-0"}`}>
        <motion.div
          whileHover={{
            scale: 1.02,
            boxShadow: "0 0 40px rgba(59,130,246,0.08)",
          }}
          className="p-6 rounded-2xl border border-border/50 transition-all duration-500 box-glow group"
          style={{ background: "rgba(17,17,17,0.5)" }}
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-bold text-text-hover group-hover:text-glow-always transition-all duration-300">
                {item.role}
              </h3>
              <p className="text-accent text-sm font-medium">{item.company}</p>
            </div>
            <span className="text-text-secondary text-xs bg-surface px-3 py-1 rounded-full border border-border/50 whitespace-nowrap ml-3">
              {item.period}
            </span>
          </div>
          <p className="text-text-primary text-sm leading-relaxed mb-4 text-justify">
            {item.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {item.techStack.map((tech) => (
              <span
                key={tech}
                className="text-xs px-3 py-1 rounded-full border border-border/30 text-text-secondary transition-all duration-300 hover:border-accent/50 hover:text-accent"
                style={{ background: "rgba(59,130,246,0.05)" }}
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Timeline node - visible only on md+ */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
          className="w-4 h-4 rounded-full border-2 border-accent relative"
          style={{ background: "#121218" }}
        >
          <motion.div
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-accent/30"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative py-32 px-6" ref={containerRef}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <BeamText
            as="h2"
            className="text-4xl sm:text-5xl md:text-6xl font-bold"
          >
            {experienceData.title}
          </BeamText>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-text-secondary mt-4 text-lg"
          >
            {experienceData.subtitle}
          </motion.p>
          <div className="gradient-line mt-8 max-w-xs mx-auto" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated vertical line - visible only on md+ */}
          <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-[2px] h-full">
            <div className="w-full h-full bg-border/30" />
            <motion.div
              className="absolute top-0 left-0 w-full origin-top"
              style={{
                height: lineHeight,
                background:
                  "linear-gradient(180deg, #3b82f6, rgba(59,130,246,0.2))",
                boxShadow: "0 0 15px rgba(59,130,246,0.3)",
              }}
            />
          </div>

          {/* Cards */}
          {experienceData.timeline.map((item, index) => (
            <TimelineCard
              key={item.id}
              item={item}
              index={index}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
