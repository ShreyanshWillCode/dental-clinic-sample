import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";
import Reviews from "./components/Reviews";
import QuerySection from "./components/QuerySection";
import FAQ from "./components/FAQ";
import MapFooter from "./components/MapFooter";
import FloatingCTAs from "./components/FloatingCTAs";

import { LoadingScreen } from "./components/animations/LoadingScreen";
import { CursorGlow } from "./components/animations/CursorGlow";
import { useLenis } from "./hooks/useLenis";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const handleLoaded = useCallback(() => setLoaded(true), []);

  // Initialise Lenis + GSAP ScrollTrigger bridge at root
  useLenis();

  return (
    <div style={{ fontFamily: "var(--font-sans)", position: "relative" }}>
      {/* Loading screen — self-removes after animation */}
      <LoadingScreen onComplete={handleLoaded} />

      {/* Ambient cursor glow — light sections only, behind all content */}
      <CursorGlow color="rgba(26,110,248,0.055)" size={520} />

      {/* Page content fades in after loader exits */}
      <AnimatePresence>
        {loaded && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Nav />
            <Hero />
            <Services />
            <WhyUs />
            <Reviews />
            <QuerySection />
            <FAQ />
            <MapFooter />
            <FloatingCTAs />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
