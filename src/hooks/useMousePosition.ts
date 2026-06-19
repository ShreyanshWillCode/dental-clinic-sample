import { useEffect, useRef, useState } from "react";

/**
 * Tracks the mouse position relative to the viewport.
 * Returns { x, y } in pixels. Throttled to rAF for performance.
 */
export function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handler);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return pos;
}
