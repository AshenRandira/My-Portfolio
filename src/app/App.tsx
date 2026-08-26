import { useEffect } from "react";
import { CursorProvider } from "./components/cursor";
import { Galaxy } from "./components/galaxy";
import { Nav } from "./components/nav";
import { Hero } from "./components/hero";
import { Work } from "./components/work";
import { About } from "./components/about";
import { Journey } from "./components/journey";
import { Experience } from "./components/experience";
import { Credentials } from "./components/credentials";
import { Contact } from "./components/contact";

export default function App() {
  // Smooth scrolling for in-page anchors (respects reduced-motion).
  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncScrollBehavior = () => {
      document.documentElement.style.scrollBehavior = motionPreference.matches
        ? "auto"
        : "smooth";
    };

    syncScrollBehavior();
    motionPreference.addEventListener("change", syncScrollBehavior);

    return () => {
      motionPreference.removeEventListener("change", syncScrollBehavior);
      document.documentElement.style.removeProperty("scroll-behavior");
    };
  }, []);

  return (
    <CursorProvider>
      <div className="grain relative min-h-screen w-full overflow-x-hidden text-foreground font-body">
        <Galaxy />
        <Nav />
        <main className="relative z-10">
          <Hero />
          <Work />
          <About />
          <Journey />
          <Experience />
          <Credentials />
          <Contact />
        </main>
      </div>
    </CursorProvider>
  );
}
