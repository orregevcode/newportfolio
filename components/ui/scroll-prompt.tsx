"use client";

import { motion } from "motion/react";

export function ScrollPrompt() {
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="absolute bottom-0 left-0 right-0 flex justify-center items-center py-8 cursor-pointer"
      onClick={handleScroll}
    >
      <div className="flex flex-col items-center gap-2">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sm text-zinc-600 dark:text-zinc-400 text-center"
        >
          Scroll down to see more
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex h-16 w-10 items-center justify-center rounded-full border-2 border-zinc-400 dark:border-zinc-500"
        >
          <motion.div
            className="h-4 w-4 rounded-full bg-zinc-400 dark:bg-zinc-500"
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

