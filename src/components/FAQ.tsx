import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal, StaggerReveal } from "./animations/ScrollReveal";
import { MagneticButton } from "./animations/MagneticButton";

const FAQS = [
  {
    q: "How often should I visit the dentist?",
    a: "For most people, we recommend a routine checkup and cleaning every 6 months. However, if you have a history of periodontal disease or other dental concerns, we may suggest more frequent visits.",
  },
  {
    q: "Do you offer emergency dental care?",
    a: "Yes! We understand that dental emergencies happen. We keep dedicated slots open daily for urgent cases. If you're experiencing severe pain or trauma, call us immediately.",
  },
  {
    q: "Are teeth whitening treatments safe?",
    a: "Absolutely. Our professional whitening treatments are completely safe and use ADA-approved bleaching agents that protect your enamel while delivering guaranteed results.",
  },
  {
    q: "What are the payment options?",
    a: "We accept all major credit cards, UPI, and work with most top insurance providers. We also offer flexible 0% interest EMI options for larger treatments like implants or aligners.",
  },
];

function Chevron() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function AccordionItem({ f, isOpen, onClick }: { f: typeof FAQS[0]; isOpen: boolean; onClick: () => void }) {
  return (
    <div style={{ borderBottom: "1px solid #f0f0f0" }}>
      <button
        onClick={onClick}
        style={{
          width: "100%", padding: "24px 0",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: "none", border: "none", cursor: "pointer",
          textAlign: "left", fontFamily: "var(--font-sans)",
        }}
        aria-expanded={isOpen}
      >
        <span style={{ fontSize: 16, fontWeight: isOpen ? 500 : 400, color: isOpen ? "#1a6ef8" : "#0a0a0a", transition: "color 0.2s" }}>
          {f.q}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} style={{ color: isOpen ? "#1a6ef8" : "#ccc" }}>
          <Chevron />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ paddingBottom: 24, color: "#666", fontSize: 14, lineHeight: 1.65, maxWidth: 480 }}>
              {f.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number>(0);

  return (
    <section id="faq" style={{ padding: "var(--section-py) 0", background: "#fff" }}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 w-full">
        <div style={{ gap: 64 }} className="grid grid-cols-1 md:grid-cols-2">
          {/* Left — Content */}
          <div>
            <ScrollReveal blur>
              <div className="section-tag">FAQ</div>
            </ScrollReveal>
            <ScrollReveal delay={0.06} blur>
              <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.2rem)", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.1, color: "#0a0a0a", marginBottom: 32 }}>
                Common{" "}
                <em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>questions</em>
              </h2>
            </ScrollReveal>

            {/* Accordion Group */}
            <StaggerReveal distance={16} stagger={0.08} style={{ display: "flex", flexDirection: "column" }}>
              {FAQS.map((f, i) => (
                <AccordionItem key={i} f={f} isOpen={openIdx === i} onClick={() => setOpenIdx(openIdx === i ? -1 : i)} />
              ))}
            </StaggerReveal>
          </div>

          {/* Right — Blue CTA box */}
          <ScrollReveal delay={0.15} distance={40} blur>
            <motion.div
              whileHover={{ y: -4, boxShadow: "0 24px 56px rgba(26,110,248,0.24)", transition: { type: "spring", stiffness: 300 } }}
              className="px-6 py-10 md:px-10 md:py-12"
              style={{
                background: "linear-gradient(135deg, #1a6ef8 0%, #0d4bc0 100%)",
                borderRadius: 24,
                color: "#fff", display: "flex", flexDirection: "column", justifyContent: "center",
                height: "100%", position: "relative", overflow: "hidden",
              }}
            >
              <motion.div
                aria-hidden
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                style={{
                  position: "absolute", top: "-50%", right: "-20%", width: 400, height: 400,
                  background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%)",
                  borderRadius: "50%", pointerEvents: "none",
                }}
              />
              <h3 style={{ fontSize: 24, fontWeight: 300, marginBottom: 12 }}>Still have questions?</h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", lineHeight: 1.6, marginBottom: 32 }}>
                Can't find the answer you're looking for? Please chat to our friendly team.
              </p>
              <MagneticButton
                className="btn-primary"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: "#fff", color: "#1a6ef8", width: "fit-content", fontSize: 13 }}
                strength={0.2}
              >
                Contact us
              </MagneticButton>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
