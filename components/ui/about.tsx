"use client";

import { motion } from "motion/react";
import { CompareCode } from "@/components/ui/compare-code";

export function About() {
  const firstCode = `// Before: Basic React Component
function Component() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`;

  const secondCode = `// After: Optimized with useCallback
function Component() {
  const [count, setCount] = useState(0);
  
  const handleIncrement = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>
        Increment
      </button>
    </div>
  );
}`;

  return (
    <section className="py-20 w-full min-h-screen flex flex-col items-center px-4 relative z-10">
      <div className="w-full max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl text-zinc-700 dark:text-zinc-100 font-light mb-16 text-center"
        >
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Side - Compare Code Component */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full flex justify-center md:justify-start"
          >
            <CompareCode
              firstCode={firstCode}
              secondCode={secondCode}
              firstLanguage="typescript"
              secondLanguage="typescript"
              slideMode="drag"
              showHandlebar={true}
              className="w-full max-w-md h-[450px] md:h-[550px] rounded-xl overflow-hidden shadow-2xl"
            />
          </motion.div>

          {/* Right Side - About Text */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full space-y-6"
          >
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-zinc-800 dark:text-zinc-100"
            >
              Passionate Developer & Problem Solver
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed"
            >
              I&apos;m a full-stack developer with a passion for creating beautiful,
              performant web applications. With expertise in modern JavaScript
              frameworks and a keen eye for design, I bring ideas to life through
              clean, maintainable code.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed"
            >
              My journey in web development has been driven by curiosity and a commitment to continuous learning. I love tackling complex challenges and transforming them into elegant solutions that users love.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

