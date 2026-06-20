import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Premium loading screen — shows a brief branded animation on first load,
 * then slides away to reveal the page. Self-destroys after animation.
 */
export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"loading" | "exiting">("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress
    const timings = [
      { p: 40, delay: 120 },
      { p: 70, delay: 280 },
      { p: 90, delay: 480 },
      { p: 100, delay: 680 },
    ];

    const timers: ReturnType<typeof setTimeout>[] = [];
    timings.forEach(({ p, delay }) => {
      timers.push(setTimeout(() => setProgress(p), delay));
    });

    // Exit after progress hits 100
    timers.push(
      setTimeout(() => {
        setPhase("exiting");
        setTimeout(onComplete, 650);
      }, 900)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase === "loading" && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(12px)", scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#0a0a0a",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
          }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: "#fff",
              fontFamily: "var(--font-sans)",
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: "-0.03em",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C9 2 6.5 4 6 7c-.5 3 .5 5 1 7.5s.5 4.5 1.5 4.5c1 0 1.5-1.5 2-3s1-2.5 1.5-2.5 1 1 1.5 2.5 1 3 2 3c1 0 1-3 1.5-4.5s1.5-4.5 1-7.5C17.5 4 15 2 12 2Z"
                fill="#1a6ef8"
              />
            </svg>
            SmileCare
          </motion.div>

          {/* Progress bar */}
          <div
            style={{
              width: 160,
              height: 2,
              background: "rgba(255,255,255,0.1)",
              borderRadius: 9999,
              overflow: "hidden",
            }}
          >
            <motion.div
              animate={{ scaleX: progress / 100 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                height: "100%",
                background: "linear-gradient(90deg, #1a6ef8, #60a5fa)",
                borderRadius: 9999,
                transformOrigin: "left center",
                willChange: "transform",
              }}
            />
          </div>

          {/* Subtle label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: 11,
              color: "#fff",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontFamily: "var(--font-sans)",
            }}
          >
            Loading
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
