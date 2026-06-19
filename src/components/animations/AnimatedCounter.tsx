import { useEffect, useRef, useState, memo } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number; // seconds
  decimals?: number;
  className?: string;
  style?: React.CSSProperties;
  trigger?: boolean; // run when true (for scroll-triggered use)
}

/**
 * Smooth eased number counter. Isolated client component — never
 * triggers re-renders in its parent.
 */
export const AnimatedCounter = memo(function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 1.8,
  decimals = 0,
  className,
  style,
  trigger = true,
}: AnimatedCounterProps) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? target : 0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number | null>(null);
  const ran = useRef(false);

  useEffect(() => {
    if (!trigger || reduced) return;
    if (ran.current) return;
    ran.current = true;

    const startVal = 0;
    const endVal = target;

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = (now - startRef.current) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const current = startVal + (endVal - startVal) * easeOut(progress);
      setDisplay(parseFloat(current.toFixed(decimals)));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [trigger, target, duration, decimals, reduced]);

  return (
    <span className={className} style={style}>
      {prefix}
      {decimals > 0 ? display.toFixed(decimals) : Math.round(display)}
      {suffix}
    </span>
  );
});
