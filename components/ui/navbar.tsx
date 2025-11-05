"use client";

import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

const Navbar = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMenuOpen(false); // Close menu after clicking
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 w-full h-14 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <button 
          onClick={() => scrollToSection("home")}
          className="cursor-pointer hover:opacity-80 hover:scale-105 transition-all duration-200 active:scale-95"
        >
          <h1 className="font-bold text-primary text-sm sm:text-base">Or Regev Portfolio</h1>
        </button>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => scrollToSection("home")}
            className="relative group hover:text-primary transition-colors cursor-pointer py-2 px-1"
          >
            <span className="relative text-primary font-bold z-10">Home</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="relative group hover:text-primary transition-colors cursor-pointer py-2 px-1"
          >
            <span className="relative text-primary font-bold z-10">About</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
          </button>
          <button
            onClick={() => scrollToSection("technologies")}
            className="relative group hover:text-primary transition-colors cursor-pointer py-2 px-1"
          >
            <span className="relative text-primary font-bold z-10">Technologies</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
          </button>
          <button
            onClick={() => scrollToSection("experience")}
            className="relative group hover:text-primary transition-colors cursor-pointer py-2 px-1"
          >
            <span className="relative text-primary font-bold z-10">Experience</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
          </button>
          <button
            onClick={toggleTheme}
            className="relative group text-primary font-bold hover:text-primary transition-colors cursor-pointer py-2 px-2 rounded-md hover:bg-accent/50"
            aria-label="Toggle theme"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="text-primary font-bold hover:text-primary transition-colors cursor-pointer py-2 px-2 rounded-md hover:bg-accent/50"
            aria-label="Toggle theme"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          <button
            onClick={toggleMenu}
            className="text-primary hover:text-primary transition-colors cursor-pointer py-2 px-2 rounded-md hover:bg-accent/50"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <button
              onClick={() => scrollToSection("home")}
              className="text-left text-primary font-bold hover:text-primary/80 transition-colors py-2 px-1"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-left text-primary font-bold hover:text-primary/80 transition-colors py-2 px-1"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("technologies")}
              className="text-left text-primary font-bold hover:text-primary/80 transition-colors py-2 px-1"
            >
              Technologies
            </button>
            <button
              onClick={() => scrollToSection("experience")}
              className="text-left text-primary font-bold hover:text-primary/80 transition-colors py-2 px-1"
            >
              Experience
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar;