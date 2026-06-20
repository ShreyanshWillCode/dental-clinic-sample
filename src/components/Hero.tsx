import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { MagneticButton } from "./animations/MagneticButton";
import { AnimatedCounter } from "./animations/AnimatedCounter";
import { useReducedMotion } from "../hooks/useReducedMotion";

// ── Mobile detection — once per module load, no React overhead ────────────────
const isMobile = typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches;

// ── Desktop-only variants — on mobile everything renders immediately ───────────
const containerVariants: Variants = isMobile
  ? { hidden: {}, visible: {} } // no stagger on mobile
  : {
      hidden: {},
      visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
    };

// Hero content items: use only opacity + translateY (GPU-composited) ──────────
const itemVariants: Variants = isMobile
  ? { hidden: { opacity: 1 }, visible: { opacity: 1 } } // instant on mobile
  : {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      },
    };

// ── Floating glassmorphism badge ──────────────────────────────────────────────
function FloatingBadge({
  children,
  style,
  delay = 0,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  delay?: number;
}) {
  // On mobile: render immediately, no animation
  if (isMobile) {
    return (
      <div
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
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
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
        willChange: "transform",
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

// ── Play icon ─────────────────────────────────────────────────────────────────
function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" />
    </svg>
  );
}

// ── Hero image with desktop-only mouse-tilt ───────────────────────────────────
function HeroImage() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Only create motion values on desktop — mobile always gets static rendering
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotX = useSpring(useTransform(rawY, [-300, 300], [5, -5]), { stiffness: 80, damping: 20 });
  const rotY = useSpring(useTransform(rawX, [-300, 300], [-5, 5]), { stiffness: 80, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    if (reduced || isMobile || !ref.current) return;
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
        rotateX: reduced || isMobile ? 0 : rotX,
        rotateY: reduced || isMobile ? 0 : rotY,
        willChange: "transform",
      }}
    >
      {/* ── LCP Image — NO animation, loads immediately ── */}
      <div
        style={{
          width: "100%",
          maxWidth: 280,
          aspectRatio: "280/380",
          borderRadius: "24px 24px 64px 24px",
          overflow: "hidden",
          position: "relative",
          contain: "layout paint",
        }}
      >
        <img
          src="/images/dentist.webp"
          alt="SmileCare dental professional"
          width={560}
          height={760}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          loading="eager"
          fetchPriority="high"
          decoding="sync"
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(26,110,248,0.08) 0%, transparent 55%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* ── Floating badge — left ── */}
      <FloatingBadge
        delay={0.5}
        style={{ bottom: 80, left: -10, display: "flex", alignItems: "center", gap: 8 }}
      >
        <div
          style={{
            width: 28, height: 28,
            background: "#EEF4FF",
            borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 2C9 2 6.5 4 6 7c-.5 3 .5 5 1 7.5s.5 4.5 1.5 4.5c1 0 1.5-1.5 2-3s1-2.5 1.5-2.5 1 1 1.5 2.5 1 3 2 3c1 0 1-3 1.5-4.5s1.5-4.5 1-7.5C17.5 4 15 2 12 2Z"
              fill="#1a6ef8"
            />
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 10, color: "#767676" }}>Compassionate care</div>
          <div style={{ fontSize: 11, fontWeight: 500 }}>Confident smiles</div>
        </div>
      </FloatingBadge>

      {/* ── Floating badge — right ── */}
      <FloatingBadge
        delay={0.65}
        style={{ top: 80, right: -10, display: "flex", flexDirection: "column", gap: 4, minWidth: 118 }}
      >
        <div style={{ fontSize: 10, color: "#767676" }}>Expert doctors</div>
        <div style={{ fontSize: 18, fontWeight: 600, color: "#0a0a0a", letterSpacing: "-0.02em", lineHeight: 1 }}>
          <AnimatedCounter target={100} suffix="k+" />
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

// ── Stat strip ────────────────────────────────────────────────────────────────
function StatItem({ label, target, suffix }: { label: string; target: number; suffix: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <span style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.03em", color: "#0a0a0a", lineHeight: 1 }}>
        <AnimatedCounter target={target} suffix={suffix} trigger />
      </span>
      <span style={{ fontSize: 11, color: "#767676", letterSpacing: "0.03em" }}>{label}</span>
    </div>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
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
        contain: "layout",
      }}
      className="hero-grid"
    >
      {/* Background blob — CSS animation, GPU transform-only, desktop only */}
      <div
        aria-hidden="true"
        className="hidden-mobile"
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
          animation: "hero-blob 8s ease-in-out infinite",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      />

      {/* ── Left: Content ── */}
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
        className="hero-left"
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
          {/* Pulsing dot — CSS transform only, desktop only */}
          <span
            aria-hidden="true"
            className="hidden-mobile"
            style={{
              width: 6, height: 6, background: "#1a6ef8",
              borderRadius: "50%",
              animation: "pulse-dot 2s ease-in-out infinite",
              willChange: "transform",
              transform: "translateZ(0)",
            }}
          />
          Premium Dental Care
        </motion.div>

        {/* H1 — renders immediately (opacity:1 on mobile, fast fade on desktop) */}
        <motion.h1
          variants={itemVariants}
          style={{
            fontSize: "clamp(2.4rem, 5vw, 3.2rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            fontWeight: 300,
            color: "#0a0a0a",
            willChange: isMobile ? "auto" : "transform",
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
          style={{ fontSize: 14, color: "#444", lineHeight: 1.75, maxWidth: 380 }}
        >
          We combine cutting-edge technology with compassionate care to deliver
          results that last a lifetime. Your healthy smile is our mission.
        </motion.p>

        {/* CTAs — render immediately on mobile */}
        <motion.div
          variants={itemVariants}
          style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}
        >
          <MagneticButton
            className="btn-primary"
            onClick={() => scrollTo("contact")}
            strength={isMobile ? 0 : 0.3}
            aria-label="Book a free dental consultation"
          >
            Book Free Consultation
          </MagneticButton>
          <motion.button
            className="btn-ghost"
            whileHover={isMobile ? {} : { x: 3 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ willChange: "transform", transform: "translateZ(0)" }}
          >
            <PlayIcon />
            Watch our story
          </motion.button>
        </motion.div>

        {/* Stats strip — always visible */}
        <motion.div
          variants={itemVariants}
          style={{
            display: "flex", gap: 28, paddingTop: 20,
            borderTop: "1px solid #f0f0f0", marginTop: 4,
          }}
        >
          <StatItem label="Happy patients" target={12} suffix="k+" />
          <StatItem label="Satisfaction rate" target={98} suffix="%" />
          <StatItem label="Of excellence" target={15} suffix="yr" />
        </motion.div>
      </motion.div>

      {/* ── Right: Image panel ── */}
      <div
        style={{
          background: "linear-gradient(135deg, #EEF4FF 0%, #F5F9FF 100%)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          zIndex: 1,
          contain: "layout paint",
        }}
        className="hero-right"
      >
        {/* Rotating ring — CSS transform only, desktop only */}
        <div
          aria-hidden="true"
          className="hidden-mobile"
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "conic-gradient(from 0deg, rgba(26,110,248,0.08), rgba(96,165,250,0.04), rgba(26,110,248,0.08))",
            pointerEvents: "none",
            animation: "hero-ring 30s linear infinite",
            willChange: "transform",
            transform: "translateZ(0)",
          }}
        />
        <HeroImage />
      </div>
    </section>
  );
}
