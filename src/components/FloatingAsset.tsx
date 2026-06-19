import { motion } from "framer-motion";

interface FloatingAssetProps {
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  rotateOffset?: number;
  icon: "tooth" | "stethoscope" | "sparkle" | "shield";
}

const ICONS = {
  tooth: (
    <svg viewBox="0 0 24 24" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full drop-shadow-sm">
      <path d="M10 22.5c-2.5 0-4.5-2.5-4.5-6.5 0-3.5 1-6 4.5-6s4.5 2.5 4.5 6c0 4-2 6.5-4.5 6.5z" />
      <path d="M14 10c0-3.5-1-6-4.5-6S5 6.5 5 10c0 4 2 6.5 4.5 6.5" />
      <path d="M12 22s-2.5-1.5-2.5-4.5M12 22s2.5-1.5 2.5-4.5" />
      <path d="M7 13.5c-2.5-1.5-3.5-4.5-2.5-7.5C5.5 3 8 2 10 2" />
      <path d="M17 13.5c2.5-1.5 3.5-4.5 2.5-7.5C18.5 3 16 2 14 2" />
    </svg>
  ),
  stethoscope: (
    <svg viewBox="0 0 24 24" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full drop-shadow-sm">
      <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
      <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
      <circle cx="20" cy="10" r="2" fill="none" />
    </svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full drop-shadow-sm">
      <path d="M12 3v18M3 12h18M7.5 7.5l9 9M16.5 7.5l-9 9" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full drop-shadow-sm">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
};

export default function FloatingAsset({
  className = "text-blue-500/10",
  delay = 0,
  duration = 6,
  yOffset = 20,
  rotateOffset = 10,
  icon,
}: FloatingAssetProps) {
  return (
    <motion.div
      className={`absolute pointer-events-none select-none z-0 ${className}`}
      animate={{
        y: [0, -yOffset, 0],
        rotate: [0, rotateOffset, -rotateOffset, 0],
      }}
      transition={{
        duration,
        ease: "easeInOut",
        repeat: Infinity,
        delay,
      }}
    >
      {ICONS[icon]}
    </motion.div>
  );
}
