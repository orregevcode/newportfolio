"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="sticky top-0 z-50 w-full h-14 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <button 
          onClick={() => scrollToSection("home")}
          className="cursor-pointer hover:opacity-80 hover:scale-105 transition-all duration-200 active:scale-95"
        >
          <h1 className="font-bold text-primary">Or Regev Portfolio</h1>
        </button>
        <div className="flex items-center gap-6">
          <button
            onClick={() => scrollToSection("home")}
            className="relative group hover:text-primary transition-colors cursor-pointer py-2 px-1"
          >
            <span className="relative z-10">Home</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="relative group hover:text-primary transition-colors cursor-pointer py-2 px-1"
          >
            <span className="relative z-10">About</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
          </button>
          <button
            onClick={() => scrollToSection("technologies")}
            className="relative group hover:text-primary transition-colors cursor-pointer py-2 px-1"
          >
            <span className="relative z-10">Technologies</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
          </button>
          <button
            onClick={() => scrollToSection("experience")}
            className="relative group hover:text-primary transition-colors cursor-pointer py-2 px-1"
          >
            <span className="relative z-10">Experience</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
          </button>
          <button
            onClick={toggleTheme}
            className="relative group hover:text-primary transition-colors cursor-pointer py-2 px-2 rounded-md hover:bg-accent/50"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;