"use client";

import { motion } from "framer-motion";
import { skillsData } from "@/data/skillsData";
import { useScrollReveal } from "@/utils/useScrollReveal";
import BeamText from "@/components/BeamText";

// Exact brand icons from react-icons
import {
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiC, SiCplusplus,
  SiPython, SiReact, SiNextdotjs, SiJquery, SiBootstrap, SiTailwindcss,
  SiMui, SiAntdesign, SiSass, SiAxios, SiRedux,
  SiNodedotjs, SiExpress, SiSocketdotio, SiJsonwebtokens,
  SiMongodb, SiThreedotjs, SiBlender,
  SiFramer, SiGreensock, SiGit, SiGithub, SiGitlab,
  SiReplit, SiFigma, SiCodesandbox, SiDocker,
  SiDassaultsystemes,
} from "react-icons/si";
import { FaJava, FaDatabase, FaStar, FaKey } from "react-icons/fa";
import { TbApi } from "react-icons/tb";
import { VscCode, VscVscode } from "react-icons/vsc";

// Map each skill name to its exact brand icon + brand color
const skillIconMap = {
  // Languages
  "HTML":        { icon: SiHtml5,          color: "#E34F26" },
  "CSS":         { icon: SiCss,           color: "#1572B6" },
  "Javascript":  { icon: SiJavascript,     color: "#F7DF1E" },
  "Typescript":  { icon: SiTypescript,     color: "#3178C6" },
  "C":           { icon: SiC,              color: "#A8B9CC" },
  "C++":         { icon: SiCplusplus,      color: "#00599C" },
  "Java":        { icon: FaJava,           color: "#ED8B00" },
  "Python":      { icon: SiPython,         color: "#3776AB" },

  // Libraries/Frameworks
  "React.js":      { icon: SiReact,          color: "#61DAFB" },
  "Next.js":       { icon: SiNextdotjs,      color: "#ffffff" },
  "jQuery":        { icon: SiJquery,         color: "#0769AD" },
  "Bootstrap":     { icon: SiBootstrap,      color: "#7952B3" },
  "Tailwind CSS":  { icon: SiTailwindcss,    color: "#06B6D4" },
  "Material-UI":   { icon: SiMui,            color: "#007FFF" },
  "Ant Design":    { icon: SiAntdesign,      color: "#0170FE" },
  "SASS/SCSS":     { icon: SiSass,           color: "#CC6699" },

  // APIs
  "Fetch API":       { icon: TbApi,          color: "#4CAF50" },
  "Context API":     { icon: SiReact,        color: "#61DAFB" },
  "Axios":           { icon: SiAxios,        color: "#5A29E4" },
  "REST-full API":   { icon: TbApi,          color: "#009688" },

  // State Management
  "Redux.js":  { icon: SiRedux,  color: "#764ABC" },

  // Backend
  "Node.js":           { icon: SiNodedotjs,      color: "#339933" },
  "Express.js":        { icon: SiExpress,         color: "#ffffff" },
  "Websocket":         { icon: SiSocketdotio,     color: "#010101" },
  "JWT":               { icon: SiJsonwebtokens,   color: "#000000" },
  "Token Management":  { icon: FaKey,             color: "#FFA500" },

  // Database
  "NoSQL":    { icon: FaDatabase,  color: "#47A248" },
  "MongoDB":  { icon: SiMongodb,   color: "#47A248" },

  // 3D Modeling
  "Three.js":                  { icon: SiThreedotjs,          color: "#ffffff" },
  "Solidworks (Intermediate)": { icon: SiDassaultsystemes,    color: "#005386" },
  "Blender (Basics)":          { icon: SiBlender,             color: "#F5792A" },

  // Web Animation
  "Framer Motion":  { icon: SiFramer,     color: "#0055FF" },
  "GSAP":           { icon: SiGreensock,  color: "#88CE02" },

  // Version Control
  "Git":     { icon: SiGit,     color: "#F05032" },
  "Github":  { icon: SiGithub,  color: "#ffffff" },
  "GitLab":  { icon: SiGitlab,  color: "#FC6D26" },

  // Tools
  "Antigravity":          { icon: FaStar,                color: "#FFD700" },
  "Visual Studio Code":   { icon: VscVscode,             color: "#007ACC" },
  "Replit":               { icon: SiReplit,              color: "#F26207" },
  "Figma":                { icon: SiFigma,               color: "#F24E1E" },
  "Code Sandbox":         { icon: SiCodesandbox,         color: "#151515" },

  // Containerization
  "Docker":  { icon: SiDocker,  color: "#2496ED" },
};

const fallback = { icon: VscCode, color: "#888888" };

export default function SkillsSection() {
  const { ref, controls } = useScrollReveal(0.1);

  return (
    <section id="skills" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden max-w-full w-full">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-10 sm:mb-12 md:mb-16">
          <BeamText
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-bold"
          >
            {skillsData.title}
          </BeamText>
        </div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillsData.categories.map((category, catIndex) => (
            <motion.div 
              key={category.name}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                hover: {
                  borderColor: "rgba(255, 255, 255, 0.12)",
                  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 255, 255, 0.03)",
                  transition: { duration: 0.3 }
                }
              }}
              className="relative overflow-hidden p-6 rounded-3xl transition-colors duration-500 hover:bg-[#1a1a24]/60 flex flex-col gap-6"
              style={{
                background: "rgba(24, 24, 31, 0.3)",
                border: "1px solid rgba(255, 255, 255, 0.04)",
              }}
            >
              {/* Glass Glare Animation Element */}
              <motion.div
                variants={{
                  hidden: { left: "-100%" },
                  visible: { left: "-100%" },
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

              <div className="relative z-10">
                <h3 className="text-white font-bold text-lg tracking-wide border-b border-[#ffffff0a] pb-4 mb-6">
                  {category.name}
                </h3>
                
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill, index) => {
                    const { icon: Icon, color } = skillIconMap[skill] || fallback;
                    return (
                      <motion.div
                        key={`${skill}-${index}`}
                        whileHover={{ 
                          boxShadow: `0 0 15px ${color}22`,
                          borderColor: "rgba(255,255,255,0.15)",
                          backgroundColor: "rgba(255,255,255,0.04)"
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-[#111111]/80 border border-[#ffffff0a] text-[#a0a0a0] flex items-center gap-2 cursor-default transition-colors duration-300 hover:text-white"
                      >
                        <Icon 
                          className="w-3.5 h-3.5 shrink-0"
                          style={{ 
                            color: color,
                            filter: `drop-shadow(0 0 4px ${color}66)`
                          }}
                        />
                        <span className="text-sm font-medium tracking-wide">
                          {skill}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
