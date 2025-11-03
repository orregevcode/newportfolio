"use client";

import { motion } from "motion/react";
import {
  BiLogoTypescript,
  BiLogoJavascript,
  BiLogoDocker,
  BiLogoNodejs,
  BiLogoReact,
  BiLogoRedux,
} from "react-icons/bi";
import { SiNextdotjs } from "react-icons/si";

export function Technologies() {
  const technologies = [
    {
      name: "TypeScript",
      icon: <BiLogoTypescript size={100} color="#007acc" />,
    },
    {
      name: "JavaScript",
      icon: <BiLogoJavascript size={90} color="#f7df1e" />,
    },
    {
      name: "Docker",
      icon: <BiLogoDocker size={90} color="#2496ed" />,
    },
    {
      name: "Next.js",
      icon: <SiNextdotjs size={90} color="#000000" />,
    },
    {
      name: "Node.js",
      icon: <BiLogoNodejs size={90} color="#68a063" />,
    },
    {
      name: "React",
      icon: <BiLogoReact size={90} color="#61dafb" />,
    },
    {
      name: "Redux",
      icon: <BiLogoRedux size={90} color="#764abc" />,
    },
  ];

  return (
    <section className="py-20 w-full min-h-screen flex flex-col items-center px-4 relative z-10">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl text-zinc-700 dark:text-zinc-100 font-light mb-16 text-center"
      >
        Technologies
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="grid grid-cols-3 md:grid-cols-6 gap-10 md:gap-16"
      >
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            animate={{
              y: [0, -8, 0],
              opacity: [0.95, 1, 0.95],
              scale: [1, 1.03, 1],
            }}
            transition={{
              y: {
                duration: 4 + index * 0.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              },
              opacity: {
                duration: 4 + index * 0.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              },
              scale: {
                duration: 4 + index * 0.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              },
              delay: index * 0.3,
            }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center hover:scale-110 transition-transform duration-300"
          >
            <div className="flex items-center justify-center">{tech.icon}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

