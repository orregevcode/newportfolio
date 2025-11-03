"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { IconDotsVertical } from "@tabler/icons-react";
interface CompareCodeProps {
  firstCode?: string;
  secondCode?: string;
  firstLanguage?: string;
  secondLanguage?: string;
  className?: string;
  initialSliderPercentage?: number;
  slideMode?: "hover" | "drag";
  showHandlebar?: boolean;
  autoplay?: boolean;
  autoplayDuration?: number;
}

export const CompareCode = ({
  firstCode = "",
  secondCode = "",
  firstLanguage = "typescript",
  secondLanguage = "typescript",
  className,
  initialSliderPercentage = 50,
  slideMode = "hover",
  showHandlebar = true,
  autoplay = false,
  autoplayDuration = 5000,
}: CompareCodeProps) => {
  const [sliderXPercent, setSliderXPercent] = useState(initialSliderPercentage);
  const [isDragging, setIsDragging] = useState(false);
  const [firstCodeHtml, setFirstCodeHtml] = useState<string>("");
  const [secondCodeHtml, setSecondCodeHtml] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const sliderRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Highlight code with shiki
  useEffect(() => {
    const highlightCode = async () => {
      setIsLoading(true);
      try {
        // Dynamically import shiki for client-side usage
        const { codeToHtml } = await import("shiki/bundle/web");
        
        if (firstCode) {
          const html = await codeToHtml(firstCode, {
            lang: firstLanguage,
            themes: {
              light: "github-light",
              dark: "github-dark",
            },
          });
          setFirstCodeHtml(html);
        }
        if (secondCode) {
          const html = await codeToHtml(secondCode, {
            lang: secondLanguage,
            themes: {
              light: "github-light",
              dark: "github-dark",
            },
          });
          setSecondCodeHtml(html);
        }
      } catch (error) {
        console.error("Failed to highlight code:", error);
        // Fallback to plain code with basic styling
        const escapeHtml = (text: string) => text.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>");
        setFirstCodeHtml(`<pre class="shiki" style="background: transparent; color: #c9d1d9; font-family: 'Fira Code', 'Monaco', 'Courier New', monospace;"><code><span class="line">${escapeHtml(firstCode)}</span></code></pre>`);
        setSecondCodeHtml(`<pre class="shiki" style="background: transparent; color: #c9d1d9; font-family: 'Fira Code', 'Monaco', 'Courier New', monospace;"><code><span class="line">${escapeHtml(secondCode)}</span></code></pre>`);
      } finally {
        setIsLoading(false);
      }
    };

    highlightCode();
  }, [firstCode, secondCode, firstLanguage, secondLanguage]);

  const startAutoplay = useCallback(() => {
    if (!autoplay) return;

    const startTime = Date.now();
    const animate = () => {
      const elapsedTime = Date.now() - startTime;
      const progress =
        (elapsedTime % (autoplayDuration * 2)) / autoplayDuration;
      const percentage = progress <= 1 ? progress * 100 : (2 - progress) * 100;

      setSliderXPercent(percentage);
      autoplayRef.current = setTimeout(animate, 16);
    };

    animate();
  }, [autoplay, autoplayDuration]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  function mouseEnterHandler() {
    stopAutoplay();
  }

  function mouseLeaveHandler() {
    if (slideMode === "hover") {
      setSliderXPercent(initialSliderPercentage);
    }
    if (slideMode === "drag") {
      setIsDragging(false);
    }
    startAutoplay();
  }

  const handleStart = useCallback(() => {
    if (slideMode === "drag") {
      setIsDragging(true);
    }
  }, [slideMode]);

  const handleEnd = useCallback(() => {
    if (slideMode === "drag") {
      setIsDragging(false);
    }
  }, [slideMode]);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return;
      if (slideMode === "hover" || (slideMode === "drag" && isDragging)) {
        const rect = sliderRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percent = (x / rect.width) * 100;
        requestAnimationFrame(() => {
          setSliderXPercent(Math.max(0, Math.min(100, percent)));
        });
      }
    },
    [slideMode, isDragging]
  );

  const handleMouseDown = useCallback(() => handleStart(), [handleStart]);
  const handleMouseUp = useCallback(() => handleEnd(), [handleEnd]);
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => handleMove(e.clientX),
    [handleMove]
  );

  const handleTouchStart = useCallback(() => {
    if (!autoplay) {
      handleStart();
    }
  }, [handleStart, autoplay]);

  const handleTouchEnd = useCallback(() => {
    if (!autoplay) {
      handleEnd();
    }
  }, [handleEnd, autoplay]);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!autoplay) {
        handleMove(e.touches[0].clientX);
      }
    },
    [handleMove, autoplay]
  );

  if (isLoading) {
    return (
      <div className={cn("w-full h-[400px] flex items-center justify-center rounded-xl bg-[#0d1117] border border-zinc-800/50", className)}>
        <div className="text-zinc-400 text-sm">Loading code...</div>
      </div>
    );
  }

  return (
    <div
      ref={sliderRef}
      className={cn("w-full h-[400px] overflow-hidden rounded-xl", className)}
      style={{
        position: "relative",
        cursor: slideMode === "drag" ? "grab" : "col-resize",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={mouseLeaveHandler}
      onMouseEnter={mouseEnterHandler}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      <AnimatePresence initial={false}>
        <motion.div
          className="h-full w-px absolute top-0 m-auto z-30 bg-gradient-to-b from-transparent from-[5%] to-[95%] via-indigo-500 to-transparent"
          style={{
            left: `${sliderXPercent}%`,
            top: "0",
            zIndex: 40,
          }}
          transition={{ duration: 0 }}
        >
          <div className="w-36 h-full [mask-image:radial-gradient(100px_at_left,white,transparent)] absolute top-1/2 -translate-y-1/2 left-0 bg-gradient-to-r from-indigo-400 via-transparent to-transparent z-20 opacity-50" />
          <div className="w-10 h-1/2 [mask-image:radial-gradient(50px_at_left,white,transparent)] absolute top-1/2 -translate-y-1/2 left-0 bg-gradient-to-r from-cyan-400 via-transparent to-transparent z-10 opacity-100" />
          <div className="w-10 h-3/4 top-1/2 -translate-y-1/2 absolute -right-10 [mask-image:radial-gradient(100px_at_left,white,transparent)]">
            <MemoizedSparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />
          </div>
          {showHandlebar && (
            <div className="h-5 w-5 rounded-md top-1/2 -translate-y-1/2 bg-white z-30 -right-2.5 absolute flex items-center justify-center shadow-[0px_-1px_0px_0px_#FFFFFF40]">
              <IconDotsVertical className="h-4 w-4 text-black" />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Second code (background) */}
      <AnimatePresence initial={false}>
        {secondCode && (
          <motion.div
            className={cn(
              "absolute top-0 left-0 z-[19] rounded-xl w-full h-full select-none overflow-hidden",
              "bg-[#0d1117] border border-zinc-800/50 shadow-2xl",
              "ring-1 ring-zinc-900/50"
            )}
          >
            {/* Code editor header */}
            <div className="h-8 bg-[#161b22] border-b border-zinc-800/50 flex items-center gap-2 px-4 rounded-t-xl">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="flex-1 text-xs text-zinc-400 font-medium text-center">
                {secondLanguage}.{secondLanguage === "typescript" ? "tsx" : "jsx"}
              </div>
            </div>
            {/* Code content */}
            <div className="h-[calc(100%-2rem)] overflow-auto p-4">
              <div
                className="w-full h-full [&_pre]:!bg-transparent [&_pre]:!p-0 [&_pre]:!m-0 [&_code]:!bg-transparent [&_code]:text-sm [&_code]:leading-relaxed [&_.line]:leading-7"
                dangerouslySetInnerHTML={{ __html: secondCodeHtml }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* First code (clipped) */}
      <div className="overflow-hidden w-full h-full relative z-20 pointer-events-none">
        <AnimatePresence initial={false}>
          {firstCode && (
            <motion.div
              className={cn(
                "absolute inset-0 z-20 rounded-xl shrink-0 w-full h-full select-none overflow-hidden",
                "bg-[#0d1117] border border-zinc-800/50 shadow-2xl",
                "ring-1 ring-zinc-900/50"
              )}
              style={{
                clipPath: `inset(0 ${100 - sliderXPercent}% 0 0)`,
              }}
              transition={{ duration: 0 }}
            >
              {/* Code editor header */}
              <div className="h-8 bg-[#161b22] border-b border-zinc-800/50 flex items-center gap-2 px-4 rounded-t-xl">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="flex-1 text-xs text-zinc-400 font-medium text-center">
                  {firstLanguage}.{firstLanguage === "typescript" ? "tsx" : "jsx"}
                </div>
              </div>
              {/* Code content */}
              <div className="h-[calc(100%-2rem)] overflow-auto p-4">
                <div
                  className="w-full h-full [&_pre]:!bg-transparent [&_pre]:!p-0 [&_pre]:!m-0 [&_code]:!bg-transparent [&_code]:text-sm [&_code]:leading-relaxed [&_.line]:leading-7"
                  dangerouslySetInnerHTML={{ __html: firstCodeHtml }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const MemoizedSparklesCore = React.memo(SparklesCore);

