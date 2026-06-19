import { motion } from "framer-motion";
import { ScrollReveal, StaggerReveal } from "./animations/ScrollReveal";
import { MagneticButton } from "./animations/MagneticButton";

interface Service {
  icon: React.ReactNode;
  title: string;
  desc: string;
  price: string;
  featured?: boolean;
}

const SERVICES: Service[] = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a6ef8" strokeWidth="1.5">
        <path d="M12 2C9 2 6.5 4 6 7c-.5 3 .5 5 1 7.5s.5 4.5 1.5 4.5c1 0 1.5-1.5 2-3s1-2.5 1.5-2.5 1 1 1.5 2.5 1 3 2 3c1 0 1-3 1.5-4.5s1.5-4.5 1-7.5C17.5 4 15 2 12 2Z" />
      </svg>
    ),
    title: "General Dentistry",
    desc: "Routine checkups, cleanings, and preventive care to keep your teeth healthy year-round.",
    price: "From ₹800",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5">
        <path d="M12 3l1.9 5.8H20l-4.9 3.6 1.9 5.8L12 15l-5 3.2 1.9-5.8L4 8.8h6.1z" />
      </svg>
    ),
    title: "Cosmetic Dentistry",
    desc: "Veneers, whitening, and smile makeovers that transform the way you look and feel about yourself.",
    price: "From ₹4,500",
    featured: true,
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a6ef8" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="9" y1="7" x2="15" y2="7" />
        <line x1="9" y1="12" x2="15" y2="12" />
        <line x1="9" y1="17" x2="13" y2="17" />
      </svg>
    ),
    title: "Orthodontics",
    desc: "Clear aligners and traditional braces to straighten your teeth and align your bite perfectly.",
    price: "From ₹12,000",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a6ef8" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Dental Implants",
    desc: "Permanent tooth replacement solutions that look, feel, and function like your natural teeth.",
    price: "From ₹18,000",
  },
];

function ServiceCard({ s }: { s: Service }) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        boxShadow: s.featured
          ? "0 24px 56px rgba(0,0,0,0.3)"
          : "0 16px 40px rgba(26,110,248,0.12)",
        transition: { type: "spring", stiffness: 260, damping: 20 },
      }}
      style={{
        background: s.featured ? "#0a0a0a" : "#f8f8f8",
        borderRadius: 16,
        padding: 24,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        minHeight: 200,
      }}
    >
      <div
        style={{
          width: 40, height: 40,
          background: s.featured ? "rgba(255,255,255,0.12)" : "#fff",
          borderRadius: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 16, flexShrink: 0,
        }}
      >
        {s.icon}
      </div>

      <h3 style={{ fontSize: 14, fontWeight: 500, marginBottom: 8, letterSpacing: "-0.01em", color: s.featured ? "#fff" : "#0a0a0a" }}>
        {s.title}
      </h3>
      <p style={{ fontSize: 12, color: s.featured ? "rgba(255,255,255,0.6)" : "#888", lineHeight: 1.65, flex: 1 }}>
        {s.desc}
      </p>

      <div style={{ fontSize: 11, fontWeight: 500, color: s.featured ? "rgba(255,255,255,0.7)" : "#1a6ef8", marginTop: 12, letterSpacing: "0.02em" }}>
        {s.price}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
        <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={s.featured ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.3)"} strokeWidth="1.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" style={{ padding: "88px 0", background: "#fff" }}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 w-full">
        {/* Header */}
        <div
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}
          className="max-md:flex-col max-md:items-start max-md:gap-4"
        >
          <div>
            <ScrollReveal blur>
              <div className="section-tag">Our Services</div>
            </ScrollReveal>
            <ScrollReveal delay={0.06} blur>
              <h2
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.2rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  color: "#0a0a0a",
                }}
              >
                Everything your
                <br />
                smile{" "}
                <em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>needs</em>
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.1}>
            <p style={{ fontSize: 13, color: "#888", maxWidth: 200, textAlign: "right", lineHeight: 1.6 }}
               className="max-md:text-left max-md:max-w-full">
              Comprehensive dental solutions for every stage of life
            </p>
          </ScrollReveal>
        </div>

        {/* Cards — staggered reveal */}
        <StaggerReveal
          stagger={0.09}
          distance={28}
          once={false}
          style={{ gap: 14 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SERVICES.map((s) => (
            <ServiceCard key={s.title} s={s} />
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
