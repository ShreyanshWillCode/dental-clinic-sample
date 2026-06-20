import { ScrollReveal, StaggerReveal } from "./animations/ScrollReveal";
import { MagneticButton } from "./animations/MagneticButton";

function ToothIcon({ color = "#1a6ef8" }: { color?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C9 2 6.5 4 6 7c-.5 3 .5 5 1 7.5s.5 4.5 1.5 4.5c1 0 1.5-1.5 2-3s1-2.5 1.5-2.5 1 1 1.5 2.5 1 3 2 3c1 0 1-3 1.5-4.5s1.5-4.5 1-7.5C17.5 4 15 2 12 2Z"
        fill={color}
      />
    </svg>
  );
}

export default function MapFooter() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{ background: "#0a0a0a", paddingTop: "var(--section-py)", borderTop: "1px solid #1a1a1a" }}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 w-full">
        <div
          style={{ gap: 48, marginBottom: 88 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]"
        >
          {/* Brand Col */}
          <ScrollReveal delay={0.05} distance={20}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#fff", fontSize: 18, fontWeight: 500, letterSpacing: "-0.02em", marginBottom: 20 }}>
              <ToothIcon />
              SmileCare
            </div>
            <p style={{ color: "#888", fontSize: 13, lineHeight: 1.6, maxWidth: 280, marginBottom: 24 }}>
              Premium dental care in Bhubaneswar. We combine modern technology with compassionate care.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {["tw", "fb", "ig"].map((soc) => (
                <MagneticButton
                  key={soc}
                  strength={0.4}
                  style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", border: "1px solid #2a2a2a",
                  }}
                  aria-label={`Follow us on ${soc}`}
                >
                  <div style={{ width: 14, height: 14, background: "#888", borderRadius: 2 }} />
                </MagneticButton>
              ))}
            </div>
          </ScrollReveal>

          {/* Links 1 */}
          <StaggerReveal stagger={0.06} distance={20} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h4 style={{ color: "#fff", fontSize: 14, fontWeight: 500, marginBottom: 8 }}>Services</h4>
            {["General Dentistry", "Cosmetic Dentistry", "Orthodontics", "Dental Implants", "Root Canal"].map((l) => (
              <a key={l} href="#services" style={{ color: "#888", fontSize: 13, textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")} onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}>
                {l}
              </a>
            ))}
          </StaggerReveal>

          {/* Links 2 */}
          <StaggerReveal stagger={0.06} distance={20} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h4 style={{ color: "#fff", fontSize: 14, fontWeight: 500, marginBottom: 8 }}>Company</h4>
            {["About Us", "Our Doctors", "Patient Stories", "Careers", "Contact"].map((l) => (
              <button key={l} onClick={() => scrollTo(l.includes("Doctors") ? "doctors" : l.includes("Patient") ? "reviews" : "home")} style={{ color: "#888", fontSize: 13, textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: 0, transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")} onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}>
                {l}
              </button>
            ))}
          </StaggerReveal>

          {/* Contact */}
          <ScrollReveal delay={0.15} distance={20}>
            <h4 style={{ color: "#fff", fontSize: 14, fontWeight: 500, marginBottom: 20 }}>Visit Us</h4>
            <address style={{ fontStyle: "normal", color: "#888", fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
              123 Dental Street
              <br />
              Khandagiri, Bhubaneswar
              <br />
              Odisha 751030
            </address>
            <div style={{ color: "#fff", fontSize: 13, marginBottom: 8 }}>+91 98765 43210</div>
            <div style={{ color: "#1a6ef8", fontSize: 13 }}>hello@smilecare.com</div>
          </ScrollReveal>
        </div>

        <div style={{ borderTop: "1px solid #1a1a1a", padding: "24px 0", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#666", fontSize: 12 }} className="max-sm:flex-col max-sm:gap-4 max-sm:text-center">
          <div>&copy; {new Date().getFullYear()} SmileCare. All rights reserved.</div>
          <div style={{ display: "flex", gap: 24 }}>
            <a href="#" style={{ color: "#666", textDecoration: "none" }}>Privacy Policy</a>
            <a href="#" style={{ color: "#666", textDecoration: "none" }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
