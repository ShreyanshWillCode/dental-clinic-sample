import type { Easing, Transition, Variants } from "framer-motion";

// ── Clinic constants ──────────────────────────────────────────────────────────
export const CLINIC_PHONE   = "+91 98765 43210";
export const CLINIC_WA      = "919876543210";
export const CLINIC_EMAIL   = "hello@smilecaredental.in";
export const CLINIC_ADDRESS = "42, MG Road, Near City Hospital, Bhubaneswar, Odisha 751001";

// ── Easing library (GPU-friendly, named for intent) ──────────────────────────
// "Expo out" — fast start, smooth finish. Used for entrances.
export const EASE_EXPO: Easing = [0.16, 1, 0.3, 1];
// "Quart out" — slightly softer. Used for hover states.
export const EASE_QUART: Easing = [0.25, 1, 0.5, 1];
// "Standard" — Material/iOS standard curve. Used for exits and transitions.
export const EASE_STD: Easing = [0.4, 0, 0.2, 1];

// ── Purposeful variants ───────────────────────────────────────────────────────

/**
 * PURPOSE: First-impression content (headlines, badges, paragraphs).
 * Healthcare: gentle 28px rise, 600ms — calming, not jarring.
 * Used in: Hero, section headings, contact info.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_EXPO } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.3, ease: EASE_STD } },
};

/**
 * PURPOSE: Pure opacity reveal. For elements that shouldn't move.
 * Used in: overlays, success states, form transitions.
 */
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1,  transition: { duration: 0.5, ease: EASE_STD } },
  exit:    { opacity: 0,  transition: { duration: 0.3, ease: EASE_STD } },
};

/**
 * PURPOSE: Navigation slide-in. Tells user "the UI is ready."
 * Slight Y movement (not X) keeps it aligned with page content flow.
 */
export const slideDown: Variants = {
  hidden:  { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0,   transition: { duration: 0.6, ease: EASE_EXPO } },
};

/**
 * PURPOSE: Forms and important conversion zones — slide up to grab attention,
 * implying the form is "rising to meet" the user.
 * Used in: Contact form card, FAQ panel.
 */
export const slideUp: Variants = {
  hidden:  { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_EXPO } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.3, ease: EASE_STD } },
};

/**
 * PURPOSE: Service/review/feature cards. Subtle scale + rise creates
 * a "peeling off the page" effect that feels premium but not showy.
 */
export const cardReveal: Variants = {
  hidden:  { opacity: 0, y: 25, scale: 0.98 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: EASE_EXPO },
  },
};

/**
 * PURPOSE: Hero visual elements (floating badges, doctor card).
 * Scale from 0.88 creates a "pop into existence" effect, building trust
 * by showcasing social proof elements dramatically.
 */
export const popIn: Variants = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1, scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  exit:    { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

/**
 * PURPOSE: Floating CTAs (WhatsApp, Book Now). Slides from right edge
 * without disrupting scroll reading. Matches "the action is always ready."
 */
export const floatEntry: Variants = {
  hidden:  { opacity: 0, x: 64, scale: 0.9 },
  visible: { opacity: 1, x: 0, scale: 1,   transition: { duration: 0.5, ease: EASE_EXPO } },
  exit:    { opacity: 0, x: 40, scale: 0.9, transition: { duration: 0.3, ease: EASE_STD } },
};

/**
 * PURPOSE: Stagger container — orchestrates child animations.
 * Prevents all children from animating at once (overwhelming).
 * Healthcare: slower stagger (90ms) feels calmer than tech (50ms).
 */
export const staggerContainer: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

/**
 * PURPOSE: Faster stagger for navigation links and small repeated elements.
 */
export const staggerFast: Variants = {
  hidden:  { opacity: 0 },
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.25 } },
};

/**
 * PURPOSE: Section-level stagger (slower, for big content blocks).
 */
export const staggerSlow: Variants = {
  hidden:  { opacity: 0 },
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.06 } },
};

// ── Shared whileHover configs (reusable, consistent feel) ─────────────────────

/** Standard card hover: lift 6px, spring physics for organic feel. */
export const HOVER_LIFT = {
  y: -6,
  transition: { type: "spring", stiffness: 300, damping: 20 } as Transition,
};

/** Primary CTA hover: slight scale + lift. Draws the eye without alarm. */
export const HOVER_CTA = {
  scale: 1.04,
  y: -2,
  transition: { type: "spring", stiffness: 400, damping: 25 } as Transition,
};

/** Secondary/ghost button hover: scale only (no lift — it's less primary). */
export const HOVER_BTN_GHOST = {
  scale: 1.03,
  transition: { type: "spring", stiffness: 400, damping: 25 } as Transition,
};

/** Icon hover: gentle rotate + scale. Implies interactivity without distraction. */
export const HOVER_ICON = {
  scale: 1.15,
  rotate: 8,
  transition: { type: "spring", stiffness: 380, damping: 18 } as Transition,
};

/** Universal tap/press feedback. */
export const TAP = { scale: 0.96 };
