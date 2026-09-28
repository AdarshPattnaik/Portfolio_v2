"use client";

import { motion } from "framer-motion";
import { projectsData } from "@/data/projectsData";
import { useScrollReveal } from "@/utils/useScrollReveal";
import BeamText from "@/components/BeamText";

function ProjectCard({ project, index }) {
  const { ref, controls } = useScrollReveal(0.2);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {
          opacity: 0,
          y: 60,
          rotateX: 15,
          rotateY: index % 2 === 0 ? -5 : 5,
          scale: 0.9,
          filter: "blur(10px)",
        },
        visible: {
          opacity: 1,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: {
            duration: 0.8,
            delay: index * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
      style={{ perspective: "1000px" }}
      className={project.featured ? "md:col-span-2" : ""}
    >
      <motion.div
        whileHover={{
          y: -8,
          rotateX: 2,
          rotateY: -2,
          boxShadow: "0 20px 60px rgba(0,0,0,0.3), 0 0 40px rgba(59,130,246,0.08)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group h-full p-6 sm:p-8 rounded-2xl border border-border/50 transition-colors duration-500 box-glow relative overflow-hidden"
        style={{ background: "rgba(17,17,17,0.5)" }}
      >
        {/* Shine effect on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background:
              "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.03) 55%, transparent 60%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 2s linear infinite",
          }}
        />

        {/* Featured badge */}
        {project.featured && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-accent border border-accent/30 mb-4"
            style={{ background: "rgba(59,130,246,0.1)" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-accent"
              style={{ boxShadow: "0 0 6px rgba(59,130,246,0.6)" }}
            />
            Featured Project
          </motion.div>
        )}

        {/* Project number */}
        <div
          className="absolute top-6 right-6 text-6xl sm:text-7xl font-bold pointer-events-none select-none opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500"
        >
          {String(project.id).padStart(2, "0")}
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-text-hover mb-3 group-hover:text-glow-always transition-all duration-300 relative z-10">
          {project.title}
        </h3>

        <p className="text-text-primary text-sm sm:text-base leading-relaxed mb-6 relative z-10 text-justify">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-6 relative z-10">
          {project.techStack.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="text-xs px-3 py-1.5 rounded-full border border-border/30 text-text-secondary transition-all duration-300 hover:border-accent/50 hover:text-accent"
              style={{ background: "rgba(59,130,246,0.05)" }}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 relative z-10">
          <a
            href={project.liveUrl}
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-hover transition-all duration-300 text-glow group/link"
          >
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover/link:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Live Demo
          </a>
          <a
            href={project.githubUrl}
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-hover transition-all duration-300 text-glow group/link"
          >
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover/link:scale-110"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Source Code
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <BeamText
            as="h2"
            className="text-4xl sm:text-5xl md:text-6xl font-bold"
          >
            {projectsData.title}
          </BeamText>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-text-secondary mt-4 text-lg"
          >
            {projectsData.subtitle}
          </motion.p>
          <div className="gradient-line mt-8 max-w-xs mx-auto" />
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projectsData.projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
