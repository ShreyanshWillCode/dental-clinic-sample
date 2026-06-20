import { motion } from "framer-motion";
import { ScrollReveal, StaggerReveal } from "./animations/ScrollReveal";
import { MagneticButton } from "./animations/MagneticButton";

interface Doctor {
  name: string;
  role: string;
  specialty: string;
  rating: string;
  reviews: number;
  schedule: string;
  image: string;
  gradientFrom: string;
  gradientTo: string;
}

const DOCTORS: Doctor[] = [
  {
    name: "Dr. Priya Sharma",
    role: "BDS, MDS — 12 years experience",
    specialty: "Cosmetic Dentist",
    rating: "4.9",
    reviews: 348,
    schedule: "Mon — Fri · 9AM–6PM",
    image: "/images/dentist-mask.png",
    gradientFrom: "#dce9ff",
    gradientTo: "#c8d9f5",
  },
  {
    name: "Dr. Arjun Mehta",
    role: "BDS, MDS Orthodontics — 9 yrs",
    specialty: "Orthodontist",
    rating: "4.8",
    reviews: 201,
    schedule: "Tue — Sat · 10AM–7PM",
    image: "/images/dentist-male.png",
    gradientFrom: "#e0d4f5",
    gradientTo: "#cdc0ec",
  },
  {
    name: "Dr. Kavya Nair",
    role: "BDS, MDS Implants — 14 yrs",
    specialty: "Implantologist",
    rating: "5.0",
    reviews: 412,
    schedule: "Mon — Thu · 8AM–5PM",
    image: "/images/dentist-tools.png",
    gradientFrom: "#d4f0e4",
    gradientTo: "#c0e8d4",
  },
];

function StarIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="#f59e0b">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function DoctorCard({ doc }: { doc: Doctor }) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      whileHover={{
        y: -6,
        boxShadow: "0 20px 48px rgba(0,0,0,0.10)",
        transition: { type: "spring", stiffness: 260, damping: 20 },
      }}
      style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
    >
      {/* Photo */}
      <div
        style={{
          height: 200,
          background: `linear-gradient(160deg, ${doc.gradientFrom}, ${doc.gradientTo})`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <motion.img
          src={doc.image}
          alt={doc.name}
          initial={{ scale: 1.05 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", position: "absolute", inset: 0 }}
          loading="lazy"
        />
        {/* Specialty badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            position: "absolute", top: 12, right: 12,
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(8px)",
            borderRadius: 9999, padding: "4px 10px",
            fontSize: 10, fontWeight: 500, color: "#1a6ef8", zIndex: 1,
          }}
        >
          {doc.specialty}
        </motion.div>
      </div>

      {/* Info */}
      <div style={{ padding: 18 }}>
        <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: "-0.01em", marginBottom: 2 }}>{doc.name}</div>
        <div style={{ fontSize: 12, color: "#888", marginBottom: 10 }}>{doc.role}</div>

        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
          {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
          <span style={{ fontSize: 11, color: "#888", marginLeft: 4 }}>{doc.rating} ({doc.reviews} reviews)</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14, paddingTop: 14, borderTop: "1px solid #f0f0f0" }}>
          <span style={{ fontSize: 11, color: "#aaa" }}>{doc.schedule}</span>
          <MagneticButton
            onClick={() => scrollTo("contact")}
            strength={0.2}
            style={{
              fontSize: 11, fontWeight: 500, color: "#1a6ef8",
              background: "#EEF4FF", border: "none", padding: "6px 14px",
              borderRadius: 9999, cursor: "pointer", fontFamily: "var(--font-sans)",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e: any) => (e.currentTarget.style.background = "#dce9ff")}
            onMouseLeave={(e: any) => (e.currentTarget.style.background = "#EEF4FF")}
          >
            Book Now
          </MagneticButton>
        </div>
      </div>
    </motion.div>
  );
}

export default function WhyUs() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="doctors" style={{ background: "#f4f6ff", padding: "88px 0" }}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 w-full">
        {/* Header */}
        <div
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}
          className="max-md:flex-col max-md:items-start max-md:gap-4"
        >
          <div>
            <ScrollReveal blur>
              <div className="section-tag">Meet the Team</div>
            </ScrollReveal>
            <ScrollReveal delay={0.06} blur>
              <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.2rem)", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.1, color: "#0a0a0a" }}>
                Our expert{" "}
                <em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>doctors</em>
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.1}>
            <MagneticButton
              className="btn-primary"
              onClick={() => scrollTo("contact")}
              style={{ fontSize: 12, padding: "10px 20px" }}
              strength={0.25}
            >
              View all doctors
            </MagneticButton>
          </ScrollReveal>
        </div>

        {/* Cards */}
        <StaggerReveal
          stagger={0.1}
          distance={32}
          once={false}
          style={{ gap: 20 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {DOCTORS.map((doc) => (
            <DoctorCard key={doc.name} doc={doc} />
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
