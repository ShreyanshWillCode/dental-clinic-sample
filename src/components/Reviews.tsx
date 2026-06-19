import { motion } from "framer-motion";
import { ScrollReveal, StaggerReveal } from "./animations/ScrollReveal";
import { AnimatedCounter } from "./animations/AnimatedCounter";

interface Review {
  name: string;
  initials: string;
  since: string;
  stars: number;
  text: string;
  avatarBg: string;
  avatarColor: string;
  featured?: boolean;
}

const REVIEWS: Review[] = [
  {
    name: "Rohit Sinha",
    initials: "RS",
    since: "Patient since 2022 · Veneers",
    stars: 5,
    text: "I came in nervous about getting veneers, and left with the most confident smile of my life. The team made every step feel comfortable and the results exceeded every expectation I had.",
    avatarBg: "rgba(255,255,255,0.2)",
    avatarColor: "#fff",
    featured: true,
  },
  {
    name: "Anita Mishra",
    initials: "AM",
    since: "Patient since 2021 · Orthodontics",
    stars: 5,
    text: "My son needed braces and Dr. Mehta was incredible with him. The whole process was smooth and the staff always made him feel at ease. Highly recommend.",
    avatarBg: "#f5d4d4",
    avatarColor: "#c44",
  },
  {
    name: "Vijay Rao",
    initials: "VR",
    since: "Patient since 2023 · Implants",
    stars: 5,
    text: "After my implant procedure I barely felt any discomfort. Dr. Nair is exceptional — thorough, gentle, and very clear about every step. The clinic itself is beautiful and clean.",
    avatarBg: "#d4f5d4",
    avatarColor: "#2a8a4a",
  },
];

function StarIcon({ color = "#f59e0b" }: { color?: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill={color}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function ReviewCard({ r }: { r: Review }) {
  return (
    <motion.div
      whileHover={{
        y: -5,
        boxShadow: r.featured ? "0 24px 60px rgba(26,110,248,0.32)" : "0 18px 44px rgba(0,0,0,0.10)",
        transition: { type: "spring", stiffness: 260, damping: 22 },
      }}
      style={{
        background: r.featured ? "#1a6ef8" : "#f8f8f8",
        borderRadius: 20, padding: 24,
        display: "flex", flexDirection: "column",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
        {[...Array(r.stars)].map((_, i) => (
          <StarIcon key={i} color={r.featured ? "#fde68a" : "#f59e0b"} />
        ))}
      </div>

      <p style={{ fontSize: 13, lineHeight: 1.75, color: r.featured ? "rgba(255,255,255,0.88)" : "#444", flex: 1 }}>
        &ldquo;{r.text}&rdquo;
      </p>

      <div
        style={{
          display: "flex", alignItems: "center", gap: 10,
          marginTop: 18, paddingTop: 18,
          borderTop: `1px solid ${r.featured ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.06)"}`,
        }}
      >
        <div
          style={{
            width: 34, height: 34, borderRadius: "50%",
            background: r.avatarBg, display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 600, color: r.avatarColor, flexShrink: 0,
          }}
        >
          {r.initials}
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 500, color: r.featured ? "#fff" : "#0a0a0a" }}>{r.name}</div>
          <div style={{ fontSize: 11, color: r.featured ? "rgba(255,255,255,0.5)" : "#aaa" }}>{r.since}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" style={{ padding: "88px 0", background: "#fff" }}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 w-full">
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <ScrollReveal blur>
            <div className="section-tag">Patient Stories</div>
          </ScrollReveal>
          <ScrollReveal delay={0.06} blur>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.2rem)", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.1, color: "#0a0a0a" }}>
              What our patients{" "}
              <em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>say</em>
            </h2>
          </ScrollReveal>

          {/* Aggregate rating */}
          <ScrollReveal delay={0.12}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
              <div style={{ display: "flex", gap: 2 }}>
                {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
              </div>
              <span style={{ fontWeight: 700, fontSize: 18, color: "#0a0a0a", letterSpacing: "-0.02em" }}>4.9</span>
              <span style={{ fontSize: 13, color: "#888" }}>
                / 5 &middot;{" "}
                <AnimatedCounter target={340} suffix=" verified reviews" trigger />
              </span>
            </div>
          </ScrollReveal>
        </div>

        {/* Cards */}
        <StaggerReveal
          stagger={0.1}
          distance={28}
          style={{ gap: 16 }}
          className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr]"
        >
          {REVIEWS.map((r) => (
            <ReviewCard key={r.name} r={r} />
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
