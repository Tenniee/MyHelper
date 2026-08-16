"use client";
import ColumnPhoto1 from "../../assets/Support-Agent.webp";
import ColumnPhoto2 from "../../assets/Support-Agent2.webp";
import ColumnPhoto3 from "../../assets/Platform-Dashboard.webp"; 
import ColumnPhoto4 from "../../assets/User-Typing3.webp";
import ColumnPhoto5 from "../../assets/User-Typing2.webp";
import ColumnPhoto6 from "../../assets/User-Typing.webp";

import { useEffect, useRef } from "react";
import {
  motion,
  useAnimationControls,
} from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Ticket,
  Star,
  Heart,
  MessageSquareMore,
  Phone,
  Mic,
  UserRound,
} from "lucide-react";
import styles from "./Hero.module.css";
 
/**
 * Resolves a card's `gradient` field into a valid CSS `background` value,
 * whether it's:
 *   - a plain CSS gradient string, e.g. "linear-gradient(...)"
 *   - a plain image URL string, e.g. "/images/foo.webp"
 *   - a Next.js static image import, e.g. `import x from "../assets/foo.webp"`
 *     (which resolves to an OBJECT like { src, width, height }, not a string —
 *     that's why swapping a gradient string for an imported image silently
 *     did nothing before: `background: {object}` is invalid CSS and gets
 *     dropped, not an error, so nothing visibly changes.)
 */
function resolveCardBackground(source) {
  if (!source) return undefined;
  if (typeof source === "string") {
    return source.includes("gradient(")
      ? source
      : `url(${source}) center / cover no-repeat`;
  }
  // Next.js StaticImageData object from a static import
  if (source.src) {
    return `url(${source.src}) center / cover no-repeat`;
  }
  return undefined;
}
 
/* -------------------------------------------------------------------- */
/*  Placeholder image-card data                                         */
/*  Swap `gradient` for a real background-image once assets land.       */
/* -------------------------------------------------------------------- */
 
const CARD_TYPES = ["voice", "help", "ask"];
 
const LEFT_COLUMN_CARDS = [
  { id: "l1", type: "voice", gradient: ColumnPhoto1 },
  { id: "l2", type: "help", gradient: ColumnPhoto2 },
  { id: "l3", type: "ask", gradient: ColumnPhoto3 },
  { id: "l4", type: "voice", gradient: ColumnPhoto4 },
  { id: "l5", type: "voice", gradient: ColumnPhoto5 },
  { id: "l6", type: "voice", gradient: ColumnPhoto6 },
];
 
const RIGHT_COLUMN_CARDS = [
  { id: "r1", type: "help", gradient: ColumnPhoto6 },
  { id: "r2", type: "ask", gradient: ColumnPhoto5 },
  { id: "r3", type: "voice", gradient: ColumnPhoto4 },
  { id: "r4", type: "help", gradient: ColumnPhoto1 },
  { id: "r5", type: "help", gradient: ColumnPhoto2 },
  { id: "r6", type: "help", gradient: ColumnPhoto3 },
];
 
// Mobile gets a single horizontal strip instead of two vertical columns —
// a row suits a narrow screen far better than two tall columns competing
// for space. Reuses the same cards, just flattened into one sequence.
const MOBILE_STRIP_CARDS = [
  LEFT_COLUMN_CARDS[0],
  RIGHT_COLUMN_CARDS[0],
  LEFT_COLUMN_CARDS[1],
  RIGHT_COLUMN_CARDS[1],
  LEFT_COLUMN_CARDS[2],
  RIGHT_COLUMN_CARDS[2],
];
 
/* -------------------------------------------------------------------- */
/*  Card footer — the 3 UI-mockup pill variants                         */
/* -------------------------------------------------------------------- */
 
function CardFooter({ type }) {
  if (type === "voice") {
    return (
      <div className={styles.pillBar}>
        <span className={styles.pillBarPlaceholder}>Type here...</span>
        <span className={styles.pillBarIcon}>
          <Mic size={12} color="#16A34A" strokeWidth={2} />
        </span>
      </div>
    );
  }
 
  if (type === "help") {
    return (
      <div className={styles.pillBar}>
        <span className={styles.pillBarIcon}>
          <UserRound size={12} color="#16A34A" strokeWidth={2} />
        </span>
        <span className={styles.pillBarText}>How can I help you?</span>
      </div>
    );
  }
 
  return (
    <div className={styles.askBar}>
      <span className={styles.askBarText}>Ask me a question</span>
      <span className={styles.askBarIcon}>
        <ArrowRight size={16} color="#111827" strokeWidth={2} />
      </span>
    </div>
  );
}
 
/* -------------------------------------------------------------------- */
/*  Scrolling column — duplicated list, animated with a fast-in /       */
/*  slow-loop two-stage sequence for a seamless infinite marquee.       */
/* -------------------------------------------------------------------- */
 
function ImageColumn({ cards, direction, phaseOffset = 0 }) {
  const controls = useAnimationControls();
  const trackRef = useRef(null);
 
  useEffect(() => {
    let cancelled = false;
 
    async function run() {
      const trackHeight = trackRef.current?.scrollHeight ?? 0;
      const loopDistance = trackHeight / 3; // content is tripled, so one third = one full loop
 
      if (cancelled || !loopDistance) return;
 
      // "up" reveals more content by scrolling toward what's already
      // below it (safe, since the track is top-aligned with plenty of
      // tripled content underneath). "down" needs the opposite: buffer
      // *above* it. Since there's nothing above a top-aligned track by
      // default, "down" instead starts pre-shifted up by one full loop
      // and animates back down toward rest — same trick, mirrored.
      const startY = direction === "up" ? phaseOffset : phaseOffset - loopDistance;
      const endY = direction === "up" ? phaseOffset - loopDistance : phaseOffset;
 
      // Snap into starting position instantly while still invisible
      // (opacity 0), so there's no visible jump once it fades in.
      controls.set({ y: startY });
 
      // Entrance: cards grow + fade in first
      await controls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      });
 
      if (cancelled) return;
 
      // Fast burst on load
      await controls.start({
        y: endY,
        transition: { duration: 1.4, ease: "easeIn" },
      });
 
      if (cancelled) return;
 
      // Settle into a slow, steady infinite loop. This snaps between two
      // positions exactly one copy-height apart — invisible because the
      // content is duplicated, so those two positions show identical
      // cards. Crucially this stays *bounded* (always the same from/to),
      // rather than growing forever, which is what was cutting the loop
      // short before: it ran past the end of the duplicated content.
      controls.start({
        y: [startY, endY],
        transition: {
          duration: 22,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        },
      });
    }
 
    run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  const tripled = [...cards, ...cards, ...cards];
 
  return (
    <div className={styles.imageColumn}>
      <motion.div
        ref={trackRef}
        className={styles.imageTrack}
        initial={{ opacity: 0, scale: 0.85, y: phaseOffset }}
        animate={controls}
      >
        {tripled.map((card, i) => (
          <div
            key={`${card.id}-${i}`}
            className={styles.imageCard}
            style={{ background: resolveCardBackground(card.gradient) }}
          >
            <div className={styles.imageCardOverlay} />
            <div className={styles.imageCardFooter}>
              <CardFooter type={card.type} />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
 
/* -------------------------------------------------------------------- */
/*  Mobile-only horizontal strip (replaces the two vertical columns)    */
/* -------------------------------------------------------------------- */
 
function MobileImageStrip({ cards }) {
  const controls = useAnimationControls();
  const trackRef = useRef(null);
 
  useEffect(() => {
    let cancelled = false;
 
    async function run() {
      const trackWidth = trackRef.current?.scrollWidth ?? 0;
      const loopDistance = trackWidth / 3; // content is tripled, so one third = one full loop
 
      if (cancelled || !loopDistance) return;
 
      await controls.start({
        opacity: 1,
        transition: { duration: 0.5, ease: "easeOut" },
      });
 
      if (cancelled) return;
 
      controls.start({
        x: [0, -loopDistance],
        transition: {
          duration: 18,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        },
      });
    }
 
    run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  const tripled = [...cards, ...cards, ...cards];
 
  return (
    <div className={styles.mobileStrip}>
      <motion.div
        ref={trackRef}
        className={styles.mobileTrack}
        initial={{ opacity: 0, x: 0 }}
        animate={controls}
      >
        {tripled.map((card, i) => (
          <div
            key={`${card.id}-${i}`}
            className={styles.mobileCard}
            style={{ background: resolveCardBackground(card.gradient) }}
          >
            <div className={styles.imageCardOverlay} />
            <div className={styles.imageCardFooter}>
              <CardFooter type={card.type} />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
 
/* -------------------------------------------------------------------- */
/*  Animation variants                                                  */
/* -------------------------------------------------------------------- */
 
const headerLineVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};
 
const subtextVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 },
  },
};
 
// Buttons: start as a tight circle hugging the icon, then expand outward.
const buttonVariants = {
  hidden: { width: 36, opacity: 0 },
  visible: (delay = 0) => ({
    width: "auto",
    opacity: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
  }),
};
 
const buttonLabelVariants = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.3, delay: delay + 0.3 },
  }),
};
 
const pillsContainerVariants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.9, staggerChildren: 0.1 },
  },
};
 
const pillPopVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: [0.5, 1.08, 1],
    transition: { duration: 0.45, ease: "easeOut" },
  },
};
 
const iconStackVariants = {
  hidden: { opacity: 0, scale: 0.6, rotate: -15 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 1.1 },
  },
};
 
/* -------------------------------------------------------------------- */
/*  Hero                                                                 */
/* -------------------------------------------------------------------- */
 
export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        {/* ---------- Left: text column ---------- */}
        <div className={styles.textCol}>
          <h1 className={styles.heading}>
            <motion.span
              className={styles.headingLine}
              custom={0}
              initial="hidden"
              animate="visible"
              variants={headerLineVariants}
            >
              Customer Support
            </motion.span>
            <motion.span
              className={`${styles.headingLine} ${styles.headingLineMuted}`}
              custom={0.15}
              initial="hidden"
              animate="visible"
              variants={headerLineVariants}
            >
              Made Simpler
            </motion.span>
          </h1>
 
          <motion.p
            className={styles.subtext}
            initial="hidden"
            animate="visible"
            variants={subtextVariants}
          >
            Instant, real-time communication providing both visual
            connection and immediate answers to customer inquiries. Empower
            your team with a modern helpdesk platform.
          </motion.p>
 
          <div className={styles.buttonsRow}>
            <motion.div
              custom={0.5}
              initial="hidden"
              animate="visible"
              variants={buttonVariants}
              className={styles.ctaButton}
            >
              <span className={styles.ctaIcon}>
                <ArrowRight size={18} color="#FF6B00" strokeWidth={2.5} />
              </span>
              <motion.span
                custom={0.5}
                initial="hidden"
                animate="visible"
                variants={buttonLabelVariants}
                className={styles.ctaLabel}
              >
                Start Free Trial
              </motion.span>
            </motion.div>
 
            <motion.div
              custom={0.6}
              initial="hidden"
              animate="visible"
              variants={buttonVariants}
              className={styles.secondaryButton}
            >
              <motion.span
                custom={0.6}
                initial="hidden"
                animate="visible"
                variants={buttonLabelVariants}
                className={styles.secondaryLabel}
              >
                See Features
              </motion.span>
              <span className={styles.secondaryIcon}>
                <ExternalLink size={15} color="#E5E7EB" strokeWidth={1.5} />
              </span>
            </motion.div>
          </div>
 
          <motion.div
            className={styles.statsRow}
            initial="hidden"
            animate="visible"
            variants={pillsContainerVariants}
          >
            <motion.div className={styles.statPill} variants={pillPopVariants}>
              <span className={styles.statDot} style={{ background: "#22C55E" }} />
              <span className={styles.statText}>99% Uptime</span>
            </motion.div>
 
            <motion.div className={styles.statPill} variants={pillPopVariants}>
              <Ticket size={14} color="#6B7280" strokeWidth={2} />
              <span className={styles.statText}>50K+ Tickets Resolved</span>
            </motion.div>
 
            <motion.div className={styles.statPill} variants={pillPopVariants}>
              <Star size={14} color="#FACC15" fill="#FACC15" strokeWidth={0} />
              <span className={styles.statText}>4.9/5 Rating</span>
            </motion.div>
          </motion.div>
        </div>
 
        {/* ---------- Middle: icon stack ---------- */}
        <motion.div
          className={styles.iconStack}
          initial="hidden"
          animate="visible"
          variants={iconStackVariants}
        >
          <span className={styles.iconCircle}>
            <Heart size={20} color="#1D4ED8" fill="#1D4ED8" strokeWidth={0} />
          </span>
          <span className={styles.iconCircle}>
            <MessageSquareMore size={20} color="#1D4ED8" strokeWidth={2} />
          </span>
          <span className={styles.iconCircle}>
            <Phone size={20} color="#1D4ED8" strokeWidth={2} />
          </span>
        </motion.div>
 
        {/* ---------- Right: scrolling image rows ---------- */}
        <div className={styles.imagesWrap}>
          <ImageColumn cards={LEFT_COLUMN_CARDS} direction="down" />
          <ImageColumn cards={RIGHT_COLUMN_CARDS} direction="up" phaseOffset={140} />
        </div>
 
        {/* ---------- Mobile-only: single horizontal strip ---------- */}
        <MobileImageStrip cards={MOBILE_STRIP_CARDS} />
      </div>
    </section>
  );
}
 