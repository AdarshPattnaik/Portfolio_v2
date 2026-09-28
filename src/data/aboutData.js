import { skillsData } from "./skillsData";
import { experienceData } from "./experienceData";

const totalTechnologiesCount = skillsData.categories.reduce(
  (total, category) => total + category.skills.length,
  0
);

// Calculate total years of experience dynamically
const currentYear = new Date().getFullYear();
let earliestYear = currentYear;
experienceData.timeline.forEach(item => {
  const match = item.period.match(/\d{4}/);
  if (match) {
    const year = parseInt(match[0], 10);
    if (year < earliestYear) earliestYear = year;
  }
});
const totalExperienceYears = Math.max(1, currentYear - earliestYear);

export const aboutData = {
  title: "About Me",
  subtitle: "Turning complex problems into elegant solutions",
  description: [
    "I'm a passionate Full Stack Developer with a deep love for creating seamless digital experiences. With expertise spanning both frontend and backend technologies, I bring ideas to life through clean code and thoughtful architecture.",
    "When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or diving into design systems that push the boundaries of what's possible on the web.",
    "I believe in writing code that not only works but tells a story — every function, every component, every pixel has a purpose.",
  ],
  stats: [
    { label: "Years Experience", value: totalExperienceYears },
    { label: "Projects Completed", value: 30 },
    { label: "Technologies", value: totalTechnologiesCount },
    { label: "Cups of Coffee", value: 2500 },
  ],
};
