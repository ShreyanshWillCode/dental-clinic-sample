import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * useCountUp — animates a number from 0 to `target` when the ref enters view.
 *
 * PURPOSE: Animating stats (5000+, 98%) transforms static numbers into
 * compelling proof points. Anchored to scroll position so the user SEES
 * the count-up, making the number feel earned and trustworthy.
 *
 * @param target  Final number to count to
 * @param duration  Animation duration in ms (default 1800ms — slow enough to
 *                  read, fast enough to not wait)
 * @param suffix  e.g. "+", "%", " Years"
 */
export function useCountUp<T extends HTMLElement = HTMLSpanElement>(
  target: number,
  duration = 1800,
  suffix = ""
): { ref: React.RefObject<T | null>; display: string } {
  const ref     = useRef<T>(null!);
  const inView  = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start   = performance.now();
    const step    = (now: number) => {
      const elapsed = Math.min((now - start) / duration, 1);
      // easeOutQuart — starts fast, decelerates to final number
      const eased   = 1 - Math.pow(1 - elapsed, 4);
      setCount(Math.round(eased * target));
      if (elapsed < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return { ref, display: `${count.toLocaleString("en-IN")}${suffix}` };
}

/**
 * useMediaQuery — returns true if the given CSS media query matches.
 * Used to disable heavy animations on small or low-power screens.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

/**
 * usePrefersReducedMotion — respects OS accessibility setting.
 * If true, skip or simplify all animations.
 * This is a WCAG 2.1 AA requirement (Success Criterion 2.3.3).
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
