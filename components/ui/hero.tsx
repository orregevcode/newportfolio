"use client";

import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Hero() {
  const words = ["Next.js", "Node.js", "React", "TypeScript"];

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ">
      {/* Photo Section */}
      <motion.div
        initial={{
          opacity: 0,
          x: -20,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex justify-center md:justify-start"
      >
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-zinc-200 dark:border-zinc-700 shadow-xl">
          <Image
            src="/791B4B2E-B7A5-4D90-912E-E638EDE1B9A6.png"
            alt="Profile Photo"
            fill
            className="object-cover"
            priority
          />
        </div>
      </motion.div>

      {/* Text Section */}
      <motion.div
        initial={{
          opacity: 0,
          x: 20,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center md:text-left"
      >
        <motion.h1
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className={cn(
            "relative mb-6 max-w-2xl text-3xl md:text-4xl lg:text-5xl leading-tight font-bold tracking-tight text-zinc-700 dark:text-zinc-100" ,
          )}
        >
          <div className="inline-block">
            I&apos;m an experienced developer with a passion for building web applications with
            <div className="mt-2 md:mt-4">
              <ContainerTextFlip words={words} />
            </div>
          </div>
        </motion.h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mt-4"
        >
          Creating beautiful, modern, and performant web experiences.
        </motion.p>
      </motion.div>
    </div>
  );
}

