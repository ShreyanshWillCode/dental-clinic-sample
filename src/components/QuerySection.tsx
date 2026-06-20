import { useState } from "react";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerReveal } from "./animations/ScrollReveal";
import { MagneticButton } from "./animations/MagneticButton";

// ─── Before/After section ─────────────────────────────────────────────────────
const BA_ITEMS = [
  {
    label: "Smile Makeover",
    desc: "Complete veneer transformation with whitening and gum contouring",
    duration: "3 visits · 6 weeks",
    afterColor: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
    accentColor: "#3b82f6",
  },
  {
    label: "Clear Aligner Therapy",
    desc: "Full arch straightening with clear aligners. Mild crowding corrected.",
    duration: "18 months",
    afterColor: "linear-gradient(135deg, #0f7b5c, #14b881)",
    accentColor: "#14b881",
  },
  {
    label: "Dental Implant",
    desc: "Single tooth implant replacing extracted molar, natural look achieved",
    duration: "2 visits · 4 months",
    afterColor: "linear-gradient(135deg, #7c3aed, #a855f7)",
    accentColor: "#a855f7",
  },
];

function BACard({ item }: { item: typeof BA_ITEMS[0] }) {
  return (
    <motion.div
      whileHover={{
        y: -5, scale: 1.01,
        transition: { type: "spring", stiffness: 260, damping: 20 },
      }}
      style={{ background: "#1a1a1a", borderRadius: 20, overflow: "hidden" }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "#333" }}>
        <div style={{ height: 140, background: "#2a2a2a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase", color: "#666" }}>
          Before
        </div>
        <div style={{ height: 140, background: item.afterColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)" }}>
          After
        </div>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: "#fff", marginBottom: 4 }}>{item.label}</div>
        <div style={{ fontSize: 11, color: "#555", lineHeight: 1.55 }}>{item.desc}</div>
        <div style={{ fontSize: 10, color: item.accentColor, marginTop: 8, fontWeight: 500 }}>Treatment: {item.duration}</div>
      </div>
    </motion.div>
  );
}

// ─── Insurance ────────────────────────────────────────────────────────────────
const INSURERS = ["Star Health", "HDFC Ergo", "Niva Bupa", "Care Health", "Bajaj Allianz"];

// ─── Contact Form ─────────────────────────────────────────────────────────────
type FormState = "idle" | "submitting" | "success";

export default function QuerySection() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "", service: "" });
  const [state, setState] = useState<FormState>("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");
    setTimeout(() => setState("success"), 1600);
  };

  return (
    <>
      {/* ─── Before/After — dark section with parallax ──────────── */}
      <section id="results" style={{ background: "#0a0a0a", padding: "var(--section-py) 0", overflow: "hidden" }}>
        <div className="max-w-[1200px] mx-auto px-5 md:px-10 w-full">
          {/* Header */}
          <ScrollReveal blur>
            <div className="section-tag" style={{ color: "#60a5fa" }}>Results</div>
          </ScrollReveal>
          <ScrollReveal delay={0.07} blur>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.2rem)", fontWeight: 300,
                letterSpacing: "-0.03em", lineHeight: 1.1, color: "#fff", marginBottom: 48,
              }}
            >
              Real transformations,{" "}
              <em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>real smiles</em>
            </h2>
          </ScrollReveal>

          {/* Cards */}
          <StaggerReveal
            stagger={0.1}
            distance={32}
            style={{ gap: 20 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {BA_ITEMS.map((item) => (
              <BACard key={item.label} item={item} />
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ─── Insurance ────────────────────────────────────────────── */}
      <section style={{ padding: "calc(var(--section-py) * 0.7) 0", background: "#fff", borderTop: "1px solid #f0f0f0" }}>
        <div className="max-w-[1200px] mx-auto px-5 md:px-10 w-full">
          <ScrollReveal blur>
            <div className="section-tag">Partners</div>
          </ScrollReveal>
          <ScrollReveal delay={0.06} blur>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 2.5vw, 1.8rem)", fontWeight: 300,
                letterSpacing: "-0.03em", color: "#0a0a0a", marginBottom: 28,
              }}
            >
              Accepted{" "}
              <em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>insurance</em>
            </h2>
          </ScrollReveal>

          <StaggerReveal
            stagger={0.06}
            style={{ gap: 12, alignItems: "center" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
          >
            {INSURERS.map((name) => (
              <motion.div
                key={name}
                whileHover={{ y: -3, background: "#efefef", transition: { type: "spring", stiffness: 300, damping: 20 } }}
                style={{
                  height: 52, background: "#f5f5f5", borderRadius: 12,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 600, color: "#aaa", letterSpacing: "0.02em",
                  cursor: "default",
                }}
              >
                {name}
              </motion.div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ─── Contact Form ─────────────────────────────────────────── */}
      <section id="contact" style={{ padding: "var(--section-py) 0", background: "#f8f8f8" }}>
        <div className="max-w-[1200px] mx-auto px-5 md:px-10 w-full">
          <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center", marginBottom: 48 }}>
            <ScrollReveal blur>
              <div className="section-tag" style={{ justifyContent: "center" }}>Get in Touch</div>
            </ScrollReveal>
            <ScrollReveal delay={0.07} blur>
              <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.2rem)", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.15, color: "#0a0a0a" }}>
                Book a{" "}
                <em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>consultation</em>
              </h2>
              <p style={{ fontSize: 13, color: "#888", marginTop: 10, lineHeight: 1.7 }}>
                Fill in your details and our team will reach out within 30 minutes during clinic hours.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal distance={40} blur>
            <div
              className="px-6 py-8 md:px-10 md:py-9"
              style={{
                maxWidth: 600, margin: "0 auto",
                background: "#fff", borderRadius: 20,
                boxShadow: "0 4px 32px rgba(0,0,0,0.06)",
              }}
            >
              {state === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  style={{ textAlign: "center", padding: "24px 0" }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                    style={{
                      width: 56, height: 56, background: "#f0fdf4", borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 16px",
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </motion.div>
                  <h3 style={{ fontSize: 18, fontWeight: 500, color: "#0a0a0a", marginBottom: 8 }}>Request received!</h3>
                  <p style={{ fontSize: 13, color: "#888", lineHeight: 1.7 }}>Our team will call you back shortly to confirm your appointment.</p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: 18 }}
                  aria-label="Book a dental consultation"
                  noValidate
                >
                  <div style={{ gap: 14 }} className="grid grid-cols-1 sm:grid-cols-2">
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <label htmlFor="form-name" style={{ fontSize: 12, fontWeight: 500, color: "#444" }}>
                        Full Name
                      </label>
                      <input
                        id="form-name"
                        name="name"
                        className="field"
                        type="text"
                        placeholder="Dr. Rahul Verma"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        autoComplete="name"
                        required
                        aria-required="true"
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <label htmlFor="form-phone" style={{ fontSize: 12, fontWeight: 500, color: "#444" }}>
                        Phone Number
                      </label>
                      <input
                        id="form-phone"
                        name="phone"
                        className="field"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        autoComplete="tel"
                        required
                        aria-required="true"
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label htmlFor="form-email" style={{ fontSize: 12, fontWeight: 500, color: "#444" }}>
                      Email Address
                    </label>
                    <input
                      id="form-email"
                      name="email"
                      className="field"
                      type="email"
                      placeholder="hello@example.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      autoComplete="email"
                      required
                      aria-required="true"
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label htmlFor="form-service" style={{ fontSize: 12, fontWeight: 500, color: "#444" }}>
                      Service Needed
                    </label>
                    <select
                      id="form-service"
                      name="service"
                      className="field"
                      style={{ appearance: "none" }}
                      value={form.service}
                      onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                      required
                      aria-required="true"
                      aria-label="Select a dental service"
                      aria-describedby="form-service-hint"
                    >
                      <option value="">Select a service…</option>
                      <option value="general">General Dentistry</option>
                      <option value="cosmetic">Cosmetic Dentistry</option>
                      <option value="orthodontics">Orthodontics / Aligners</option>
                      <option value="implants">Dental Implants</option>
                      <option value="rootcanal">Root Canal</option>
                      <option value="other">Other</option>
                    </select>
                    <span id="form-service-hint" className="sr-only">
                      Choose the dental treatment you are interested in
                    </span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label htmlFor="form-message" style={{ fontSize: 12, fontWeight: 500, color: "#444" }}>
                      Message{" "}
                      <span style={{ color: "#999", fontWeight: 400 }}>(optional)</span>
                    </label>
                    <textarea
                      id="form-message"
                      name="message"
                      className="field"
                      rows={3}
                      placeholder="Tell us a bit about your dental concern…"
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    />
                  </div>
                  <MagneticButton
                    type="submit"
                    className="btn-blue"
                    style={{ width: "100%", fontSize: 14, padding: "13px 24px", opacity: state === "submitting" ? 0.7 : 1 }}
                    strength={0.15}
                    disabled={state === "submitting"}
                    aria-label="Submit consultation request"
                  >
                    {state === "submitting" ? (
                      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                          style={{ display: "block", width: 14, height: 14, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", willChange: "transform" }}
                        />
                        Sending…
                      </span>
                    ) : (
                      "Book Free Consultation"
                    )}
                  </MagneticButton>
                  <p style={{ fontSize: 11, color: "#999", textAlign: "center" }}>
                    We respond within 30 min · Mon–Sat 8AM–8PM
                  </p>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
