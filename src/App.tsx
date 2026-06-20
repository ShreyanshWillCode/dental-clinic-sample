import { useState, useCallback, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Nav from "./components/Nav";
import Hero from "./components/Hero";

// Eagerly load above-fold components
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";

// Lazy-load below-fold components — deferred until after LCP
const Reviews = lazy(() => import("./components/Reviews"));
const QuerySection = lazy(() => import("./components/QuerySection"));
const FAQ = lazy(() => import("./components/FAQ"));
const MapFooter = lazy(() => import("./components/MapFooter"));
const FloatingCTAs = lazy(() => import("./components/FloatingCTAs"));

// Desktop-only — never loaded on mobile touch devices
const CursorGlow = lazy(() =>
  import("./components/animations/CursorGlow").then(m => ({ default: m.CursorGlow }))
);

import { LoadingScreen } from "./components/animations/LoadingScreen";
import { useLenis } from "./hooks/useLenis";

// Detect desktop pointer device
const isDesktop = typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const handleLoaded = useCallback(() => setLoaded(true), []);

  // Initialise Lenis + GSAP ScrollTrigger bridge at root
  useLenis();

  return (
    <>
      {/* Loading screen — overlay only, content renders underneath immediately */}
      <LoadingScreen onComplete={handleLoaded} />

      {/* Ambient cursor glow — desktop only, lazy-loaded */}
      {isDesktop && (
        <Suspense fallback={null}>
          <CursorGlow color="rgba(26,110,248,0.055)" size={520} />
        </Suspense>
      )}

      {/* Page content — rendered immediately, NOT gated behind loader */}
      {/* Hero and Nav render right away for fast LCP */}
      <div style={{ fontFamily: "var(--font-sans)", position: "relative" }}>
        <header>
          <Nav />
        </header>
        <main>
          {/* Above-fold: eagerly loaded */}
          <Hero />
          <Services />
          <WhyUs />

          {/* Below-fold: lazy-loaded after JS hydration */}
          <Suspense fallback={null}>
            <AnimatePresence>
              {loaded && (
                <motion.div
                  key="below-fold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Reviews />
                  <QuerySection />
                  <FAQ />
                </motion.div>
              )}
            </AnimatePresence>
          </Suspense>
        </main>

        <Suspense fallback={null}>
          {loaded && <MapFooter />}
        </Suspense>

        <Suspense fallback={null}>
          {loaded && <FloatingCTAs />}
        </Suspense>
      </div>
    </>
  );
}
