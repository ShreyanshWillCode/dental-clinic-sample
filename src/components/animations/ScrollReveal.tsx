import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useReducedMotion } from "../../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

// Detect coarse pointer (mobile/tablet) — blur animation is non-composited on mobile GPUs
const isFinePointer = typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;       // seconds
  distance?: number;    // px to travel upward
  blur?: boolean;       // blur-to-clear effect (desktop only)
  once?: boolean;       // only animate on first enter
}

/**
 * GSAP scroll-triggered reveal. Fades + translates into view.
 * Optional blur-to-clear for a premium feel (disabled on mobile — non-composited).
 * Safe to nest inside Framer Motion sections.
 */
export function ScrollReveal({
  children,
  className,
  style,
  delay = 0,
  distance = 32,
  blur = false,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  // Only use blur on desktop (fine pointer) — on mobile it causes non-composited repaints
  const useBlur = blur && isFinePointer;

  useEffect(() => {
    if (reduced || !ref.current) return;
    const el = ref.current;

    const fromVars: gsap.TweenVars = {
      opacity: 0,
      y: distance,
      ...(useBlur ? { filter: "blur(8px)" } : {}),
    };

    const toVars: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      ...(useBlur ? { filter: "blur(0px)" } : {}),
      duration: 0.75,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        once,
        toggleActions: once ? "play none none none" : "play reverse play reverse",
      },
    };

    const ctx = gsap.context(() => {
      gsap.fromTo(el, fromVars, toVars);
    }, el);

    return () => ctx.revert();
  }, [delay, distance, useBlur, once, reduced]);

  return (
    <div ref={ref} className={className} style={{ ...style, willChange: "transform, opacity" }}>
      {children}
    </div>
  );
}

/**
 * Staggered version — wraps children divs and reveals them sequentially.
 */
interface StaggerRevealProps {
  children: React.ReactNode[];
  className?: string;
  style?: React.CSSProperties;
  stagger?: number;
  distance?: number;
  blur?: boolean;
  once?: boolean;
}

export function StaggerReveal({
  children,
  className,
  style,
  stagger = 0.1,
  distance = 24,
  blur = false,
  once = true,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    const items = ref.current.querySelectorAll(":scope > *");
    if (!items.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: distance,
          ...(blur ? { filter: "blur(6px)" } : {}),
        },
        {
          opacity: 1,
          y: 0,
          ...(blur ? { filter: "blur(0px)" } : {}),
          duration: 0.65,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once,
            toggleActions: once ? "play none none none" : "play reverse play reverse",
          },
        }
      );
    }, ref.current);

    return () => ctx.revert();
  }, [stagger, distance, blur, once, reduced]);

  return (
    <div ref={ref} className={className} style={style}>
      {children.map((child, i) => (
        <div key={i} style={{ willChange: "transform, opacity" }}>
          {child}
        </div>
      ))}
    </div>
  );
}
