import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "./animations/MagneticButton";

// Tooth SVG logo
function ToothIcon({ color = "#1a6ef8" }: { color?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C9 2 6.5 4 6 7c-.5 3 .5 5 1 7.5s.5 4.5 1.5 4.5c1 0 1.5-1.5 2-3s1-2.5 1.5-2.5 1 1 1.5 2.5 1 3 2 3c1 0 1-3 1.5-4.5s1.5-4.5 1-7.5C17.5 4 15 2 12 2Z"
        fill={color}
      />
    </svg>
  );
}

const NAV_ITEMS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Doctors", id: "doctors" },
  { label: "Reviews", id: "reviews" },
  { label: "Contact", id: "contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 20);
      // Update active section based on scroll position
      const sections = NAV_ITEMS.map((n) => n.id);
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY + 100 >= el.offsetTop) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
      className="fixed top-0 inset-x-0 z-50"
      style={{
        background: scrolled ? "rgba(255,255,255,0.94)" : "#fff",
        backdropFilter: scrolled ? "blur(16px) saturate(200%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px) saturate(200%)" : "none",
        borderBottom: "1px solid #f0f0f0",
        transition: "background 0.35s ease, backdrop-filter 0.35s ease, box-shadow 0.35s ease",
        boxShadow: scrolled ? "0 1px 24px rgba(0,0,0,0.06)" : "none",
        willChange: "transform, opacity",
        transform: "translateZ(0)",
      }}
    >
      <div className="nav-container">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          {/* Logo */}
          <motion.div
            onClick={() => scrollTo("home")}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              fontWeight: 600, fontSize: 16, letterSpacing: "-0.02em", cursor: "pointer",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <ToothIcon />
            SmileCare
          </motion.div>

          {/* Desktop nav links with active underline */}
          <div className="hidden lg:flex" style={{ gap: 4, alignItems: "center" }}>
            {NAV_ITEMS.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  position: "relative",
                  fontSize: 13,
                  color: active === item.id ? "#0a0a0a" : "#666",
                  fontWeight: active === item.id ? 500 : 400,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "6px 12px",
                  borderRadius: 8,
                  fontFamily: "var(--font-sans)",
                  transition: "color 0.2s ease",
                  willChange: "transform",
                  transform: "translateZ(0)",
                }}
                whileHover={{ color: "#0a0a0a" }}
              >
                {item.label}
                {/* Active indicator */}
                <AnimatePresence>
                  {active === item.id && (
                    <motion.div
                      layoutId="nav-active"
                      initial={{ opacity: 0, scaleX: 0.5 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      style={{
                        position: "absolute",
                        bottom: 2,
                        left: "50%",
                        transform: "translateX(-50%) translateZ(0)",
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: "#1a6ef8",
                        willChange: "transform",
                      }}
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>

          {/* Magnetic CTA and Mobile toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div className="hidden-mobile">
              <MagneticButton
                className="btn-blue"
                onClick={() => scrollTo("contact")}
                style={{ fontSize: 13, padding: "9px 20px" }}
                strength={0.25}
              >
                Book Appointment
              </MagneticButton>
            </div>

            {/* Mobile hamburger */}
            <button
              className="hidden-desktop"
              style={{ display: "flex", flexDirection: "column", gap: 5, padding: 4, background: "transparent", border: "none" }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={{
                    rotate: mobileOpen && i !== 1 ? (i === 0 ? 45 : -45) : 0,
                    y: mobileOpen && i !== 1 ? (i === 0 ? 6 : -6) : 0,
                    opacity: mobileOpen && i === 1 ? 0 : 1,
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  style={{
                    display: "block",
                    width: 22,
                    height: 2,
                    background: "#0a0a0a",
                    borderRadius: 2,
                    transformOrigin: "center",
                    willChange: "transform, opacity",
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden", background: "#fff", borderTop: "1px solid #f0f0f0" }}
          >
            <div style={{ padding: "12px 40px 20px", display: "flex", flexDirection: "column", gap: 2 }}>
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.25 }}
                  onClick={() => scrollTo(item.id)}
                  style={{
                    padding: "10px 0", fontSize: 14, color: "#0a0a0a",
                    textAlign: "left", fontFamily: "var(--font-sans)",
                    background: "none", border: "none", cursor: "pointer",
                  }}
                >
                  {item.label}
                </motion.button>
              ))}
              <MagneticButton
                className="btn-blue"
                onClick={() => scrollTo("contact")}
                style={{ marginTop: 8, fontSize: 13, padding: "10px 20px" }}
              >
                Book Appointment
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
