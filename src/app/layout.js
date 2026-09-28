import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jet-brains-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "Adarsh Pattnaik — Full Stack Developer",
  description:
    "Portfolio of a passionate Full Stack Developer crafting digital experiences at the intersection of design and engineering. Explore my projects, skills, and experience.",
  keywords: [
    "Full Stack Developer",
    "Portfolio",
    "Web Developer",
    "React",
    "Next.js",
    "Node.js",
  ],
  openGraph: {
    title: "Adarsh Pattnaik — Full Stack Developer",
    description:
      "Portfolio of a passionate Full Stack Developer crafting digital experiences.",
    type: "website",
  },
};

import SmoothScroll from "@/components/SmoothScroll";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground noise-bg">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
