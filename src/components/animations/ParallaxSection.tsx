import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useReducedMotion } from "../../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number; // 0 = pinned, negative = moves up faster, positive = slower
  className?: string;
  style?: React.CSSProperties;
  tag?: React.ElementType;
}

/**
 * GSAP-powered parallax wrapper. The inner content translates on Y at `speed`
 * relative to scroll. Completely isolated from Framer Motion trees.
 * Uses only transform/opacity — no layout properties animated.
 */
export function ParallaxSection({
  children,
  speed = -0.15,
  className,
  style,
  tag: Tag = "div",
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;

    const el = ref.current;
    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [speed, reduced]);

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
