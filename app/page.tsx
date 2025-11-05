import { Hero } from "@/components/ui/hero";
import { ScrollPrompt } from "@/components/ui/scroll-prompt";
import { Technologies } from "@/components/ui/technologies";
import { About } from "@/components/ui/about";
import { Timeline } from "@/components/ui/timeline";
import Navbar from "@/components/ui/navbar";
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="home" className="relative min-h-screen w-full flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-6xl mx-auto px-4 relative z-10">
          <Hero />
        </div>
        <ScrollPrompt />
      </main>

      <section id="about">
        <About />
      </section>

      <section id="technologies">
        <Technologies />
      </section>

      <section id="experience">
        <Timeline />
      </section>
    </>
  );
}
