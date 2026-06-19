import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MagneticButton } from "./animations/MagneticButton";
import { AnimatedCounter } from "./animations/AnimatedCounter";
import { useReducedMotion } from "../hooks/useReducedMotion";

// ─── variants ─────────────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const imageVariants = {
  hidden: { scale: 0.92, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Floating badge ───────────────────────────────────────────────────────────
function FloatingBadge({
  children,
  style,
  delay = 0,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "absolute",
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px) saturate(180%)",
        WebkitBackdropFilter: "blur(12px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.7)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.8)",
        borderRadius: 14,
        padding: "10px 14px",
        fontSize: 11,
        fontWeight: 500,
        zIndex: 2,
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── Play icon ────────────────────────────────────────────────────────────────
function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" />
    </svg>
  );
}

// ─── Hero image with subtle mouse-tilt ────────────────────────────────────────
function HeroImage() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotX = useSpring(useTransform(rawY, [-300, 300], [6, -6]), { stiffness: 80, damping: 20 });
  const rotY = useSpring(useTransform(rawX, [-300, 300], [-6, 6]), { stiffness: 80, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set(e.clientX - rect.left - rect.width / 2);
    rawY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        position: "relative",
        transformStyle: "preserve-3d",
        rotateX: reduced ? 0 : rotX,
        rotateY: reduced ? 0 : rotY,
      }}
    >
      {/* Photo card */}
      <motion.div
        variants={imageVariants}
        style={{
          width: "100%",
          maxWidth: 280,
          aspectRatio: "280/380",
          borderRadius: "24px 24px 64px 24px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img
          src="https://picsum.photos/seed/portrait-doctor/560/760"
          alt="Dental professional"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          loading="eager"
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(26,110,248,0.08) 0%, transparent 55%)",
          }}
        />
      </motion.div>

      {/* Badge — left */}
      <FloatingBadge
        delay={0.7}
        style={{ bottom: 80, left: -10, display: "flex", alignItems: "center", gap: 8 }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            background: "#EEF4FF",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C9 2 6.5 4 6 7c-.5 3 .5 5 1 7.5s.5 4.5 1.5 4.5c1 0 1.5-1.5 2-3s1-2.5 1.5-2.5 1 1 1.5 2.5 1 3 2 3c1 0 1-3 1.5-4.5s1.5-4.5 1-7.5C17.5 4 15 2 12 2Z"
              fill="#1a6ef8"
            />
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 10, color: "#999" }}>Compassionate care</div>
          <div style={{ fontSize: 11, fontWeight: 500 }}>Confident smiles</div>
        </div>
      </FloatingBadge>

      {/* Badge — right */}
      <FloatingBadge
        delay={0.85}
        style={{ top: 80, right: -10, display: "flex", flexDirection: "column", gap: 4, minWidth: 118 }}
      >
        <div style={{ fontSize: 10, color: "#999" }}>Expert doctors</div>
        <div style={{ fontSize: 18, fontWeight: 600, color: "#0a0a0a", letterSpacing: "-0.02em", lineHeight: 1 }}>
          30+
        </div>
        <div style={{ display: "flex", marginTop: 4 }}>
          {["Dr", "M", "S"].map((av, i) => (
            <div
              key={i}
              style={{
                width: 22, height: 22, borderRadius: "50%", border: "2px solid #fff",
                background: "#c8d9f5", marginLeft: i === 0 ? 0 : -6,
                fontSize: 8, display: "flex", alignItems: "center", justifyContent: "center",
                color: "#4a6fa8", fontWeight: 600,
              }}
            >
              {av}
            </div>
          ))}
          <div
            style={{
              width: 22, height: 22, borderRadius: "50%", border: "2px solid #fff",
              background: "#EEF4FF", marginLeft: -6,
              fontSize: 7, display: "flex", alignItems: "center", justifyContent: "center",
              color: "#1a6ef8", fontWeight: 600,
            }}
          >
            +27
          </div>
        </div>
      </FloatingBadge>
    </motion.div>
  );
}

// ─── Stat item with animated counter ─────────────────────────────────────────
function StatItem({ num, label, target, suffix }: { num: string; label: string; target: number; suffix: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <span style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.03em", color: "#0a0a0a", lineHeight: 1 }}>
        <AnimatedCounter target={target} suffix={suffix} trigger />
      </span>
      <span style={{ fontSize: 11, color: "#999", letterSpacing: "0.03em" }}>{label}</span>
    </div>
  );
}

// ─── Hero component ───────────────────────────────────────────────────────────
export default function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      style={{
        minHeight: "100dvh",
        paddingTop: 60,
        background: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
      className="grid grid-cols-1 md:grid-cols-2"
    >
      {/* Animated gradient blob — background depth */}
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "10%",
          left: "-5%",
          width: "100%",
          maxWidth: 480,
          aspectRatio: "1/1",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(26,110,248,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Left — Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 24,
          padding: "60px 48px",
          maxWidth: 600,
          position: "relative",
          zIndex: 1,
        }}
        className="max-md:px-6 max-md:pt-12 max-md:pb-8"
      >
        {/* Eyebrow pill */}
        <motion.div
          variants={itemVariants}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#EEF4FF", color: "#1a6ef8",
            fontSize: 11, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase",
            padding: "6px 14px", borderRadius: 9999, width: "fit-content",
          }}
        >
          <motion.span
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 6, height: 6, background: "#1a6ef8", borderRadius: "50%", display: "block" }}
          />
          Premium Dental Care
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          style={{
            fontSize: "clamp(2.6rem, 5vw, 3.2rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            fontWeight: 300,
            color: "#0a0a0a",
          }}
        >
          Transform your smile
          <br />
          with{" "}
          <em
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 400,
              color: "#1a6ef8",
            }}
          >
            expert care
          </em>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={itemVariants}
          style={{ fontSize: 14, color: "#666", lineHeight: 1.75, maxWidth: 380 }}
        >
          We combine cutting-edge technology with compassionate care to deliver
          results that last a lifetime. Your healthy smile is our mission.
        </motion.p>

        {/* Actions — magnetic primary CTA */}
        <motion.div variants={itemVariants} style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <MagneticButton
            className="btn-primary"
            onClick={() => scrollTo("contact")}
            strength={0.3}
          >
            Book Free Consultation
          </MagneticButton>
          <motion.button
            className="btn-ghost"
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <PlayIcon />
            Watch our story
          </motion.button>
        </motion.div>

        {/* Stats with counters */}
        <motion.div
          variants={itemVariants}
          style={{
            display: "flex", gap: 28, paddingTop: 20,
            borderTop: "1px solid #f0f0f0", marginTop: 4,
          }}
        >
          <StatItem num="12k+" label="Happy patients" target={12} suffix="k+" />
          <StatItem num="98%" label="Satisfaction rate" target={98} suffix="%" />
          <StatItem num="15yr" label="Of excellence" target={15} suffix="yr" />
        </motion.div>
      </motion.div>

      {/* Right — Image with mouse-tilt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.1 }}
        style={{
          background: "linear-gradient(135deg, #EEF4FF 0%, #F5F9FF 100%)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          zIndex: 1,
        }}
        className="max-md:min-h-[360px]"
      >
        {/* Animated gradient ring */}
        <motion.div
          aria-hidden
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "conic-gradient(from 0deg, rgba(26,110,248,0.08), rgba(96,165,250,0.04), rgba(26,110,248,0.08))",
            pointerEvents: "none",
          }}
        />

        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
          <HeroImage />
        </motion.div>
      </motion.div>
    </section>
  );
}
