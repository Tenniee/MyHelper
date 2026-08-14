"use client";
 
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
 
/* -------------------------------------------------------------------- */
/*  Placeholder image-card data                                         */
/*  Swap `gradient` for a real background-image once assets land.       */
/* -------------------------------------------------------------------- */
 
const CARD_TYPES = ["voice", "help", "ask"];
 
const LEFT_COLUMN_CARDS = [
  { id: "l1", type: "voice", gradient: "linear-gradient(160deg,#FDBA74,#FB923C)" },
  { id: "l2", type: "help", gradient: "linear-gradient(160deg,#93C5FD,#60A5FA)" },
  { id: "l3", type: "ask", gradient: "linear-gradient(160deg,#FCA5A5,#F87171)" },
  { id: "l4", type: "voice", gradient: "linear-gradient(160deg,#A7F3D0,#6EE7B7)" },
];
 
const RIGHT_COLUMN_CARDS = [
  { id: "r1", type: "help", gradient: "linear-gradient(160deg,#DDD6FE,#C4B5FD)" },
  { id: "r2", type: "ask", gradient: "linear-gradient(160deg,#FDE68A,#FCD34D)" },
  { id: "r3", type: "voice", gradient: "linear-gradient(160deg,#BFDBFE,#93C5FD)" },
  { id: "r4", type: "help", gradient: "linear-gradient(160deg,#FBCFE8,#F9A8D4)" },
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
 
function ImageColumn({ cards, direction, offset = false }) {
  const controls = useAnimationControls();
  const trackRef = useRef(null);
 
  useEffect(() => {
    let cancelled = false;
 
    async function run() {
      const trackHeight = trackRef.current?.scrollHeight ?? 0;
      const loopDistance = trackHeight / 2; // duplicated content, so half height = one full loop
      const sign = direction === "up" ? -1 : 1;
 
      if (cancelled || !loopDistance) return;
 
      // Entrance: cards grow + fade in first
      await controls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      });
 
      if (cancelled) return;
 
      // Fast burst on load
      await controls.start({
        y: sign * loopDistance,
        transition: { duration: 1.4, ease: "easeIn" },
      });
 
      if (cancelled) return;
 
      // Settle into a slow, steady infinite loop.
      // Content is duplicated, so landing back at y:0 is visually seamless.
      controls.start({
        y: [0, sign * loopDistance],
        transition: { duration: 22, ease: "linear", repeat: Infinity },
      });
    }
 
    run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  const doubled = [...cards, ...cards];
 
  return (
    <div className={`${styles.imageColumn} ${offset ? styles.imageColumnOffset : ""}`}>
      <motion.div
        ref={trackRef}
        className={styles.imageTrack}
        initial={{ opacity: 0, scale: 0.85, y: 0 }}
        animate={controls}
      >
        {doubled.map((card, i) => (
          <div
            key={`${card.id}-${i}`}
            className={styles.imageCard}
            style={{ background: card.gradient }}
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
  hidden: { width: 46, opacity: 0 },
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
          <ImageColumn cards={RIGHT_COLUMN_CARDS} direction="up" offset />
        </div>
      </div>
    </section>
  );
}
 