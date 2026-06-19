import { useEffect, useRef } from "react";
import { useMousePosition } from "../../hooks/useMousePosition";
import { useReducedMotion } from "../../hooks/useReducedMotion";

/**
 * Ambient cursor glow — a large, soft radial gradient that follows the mouse.
 * Fixed, pointer-events-none pseudo-layer. Only repaints on GPU (transform).
 * Excluded from reduced-motion users.
 */
export function CursorGlow({
  color = "rgba(26,110,248,0.06)",
  size = 600,
}: {
  color?: string;
  size?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition();
  const reduced = useReducedMotion();
  const rafId = useRef<number>(0);
  const current = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  // Update target from mouse hook
  useEffect(() => {
    target.current = { x: mouse.x, y: mouse.y };
  }, [mouse]);

  // Smooth lerp on RAF — never touches React state
  useEffect(() => {
    if (reduced) return;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      current.current.x = lerp(current.current.x, target.current.x, 0.07);
      current.current.y = lerp(current.current.y, target.current.y, 0.07);

      if (ref.current) {
        ref.current.style.transform = `translate(${current.current.x - size / 2}px, ${current.current.y - size / 2}px)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [reduced, size]);

  if (reduced) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle at center, ${color}, transparent 70%)`,
        pointerEvents: "none",
        zIndex: 0,
        willChange: "transform",
        // Only visible in light sections — z-index keeps it behind content
      }}
      ref={ref}
    />
  );
}
