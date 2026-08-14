"use client";
 
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import styles from "./Features.module.css";
 
/* -------------------------------------------------------------------- */
/*  Content — only "Smart Ticketing" copy was given, the other 3        */
/*  features and the section heading are placeholder text. Edit freely. */
/* -------------------------------------------------------------------- */
 
const FEATURES = [
  {
    badge: "Smart Ticketing",
    lines: [
      "Automatically organize, prioritize, and route tickets.",
      "Never miss a conversation with smart notifications.",
    ],
    eyebrow: "We are here to",
    highlight: "Optimize Ticket Routing",
  },
  {
    badge: "Real-Time Chat",
    lines: [
      "Connect with customers instantly through live chat.",
      "Keep every conversation flowing without delays.",
    ],
    eyebrow: "We are here to",
    highlight: "Speed Up Response Time",
  },
  {
    badge: "Team Collaboration",
    lines: [
      "Assign, discuss, and resolve tickets together.",
      "Keep your whole team aligned on every issue.",
    ],
    eyebrow: "We are here to",
    highlight: "Simplify Team Workflows",
  },
  {
    badge: "Insightful Analytics",
    lines: [
      "Track performance, spot trends, and measure satisfaction.",
      "Make decisions backed by real data.",
    ],
    eyebrow: "We are here to",
    highlight: "Drive Data-Backed Decisions",
  },
];
 
/* -------------------------------------------------------------------- */
/*  Variants                                                             */
/* -------------------------------------------------------------------- */
 
// Right box appears first (fades + scales in while holding its position),
// then slides right into its final place. The left section only starts
// once this entire sequence has finished.
const rightBoxVariants = {
  hidden: { opacity: 0, scale: 0.88, x: -180 },
  visible: {
    opacity: [0, 1, 1],
    scale: [0.88, 1, 1],
    x: [-180, -180, 0],
    transition: {
      duration: 0.9,
      times: [0, 0.4, 1],
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
 
// Left side "grows" into view via a left-to-right wipe (clip-path),
// rather than a layout width change, so it stays smooth and responsive.
// Starts only after the right box has finished moving into place.
const leftWipeVariants = {
  hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.85 },
  },
};
 
// Icon grows and rotates into place (no vertical slide).
const iconVariants = {
  hidden: { opacity: 0, scale: 0.4, rotate: -25 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.95 },
  },
};
 
const badgeVariants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut", delay: 1.1 },
  },
};
 
const lineVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut", delay: 1.2 + i * 0.12 },
  }),
};
 
/* -------------------------------------------------------------------- */
/*  One row                                                              */
/* -------------------------------------------------------------------- */
 
function FeatureRow({ feature }) {
  return (
    <motion.div
      className={styles.card}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
    >
      <div className={styles.left}>
        <motion.div className={styles.leftWipe} variants={leftWipeVariants}>
          <motion.span className={styles.iconCircle} variants={iconVariants}>
            <Sparkles size={26} color="#ffffff" strokeWidth={2} />
          </motion.span>
 
          <div className={styles.leftText}>
            <motion.span className={styles.badge} variants={badgeVariants}>
              {feature.badge}
            </motion.span>
 
            <p className={styles.paragraph}>
              {feature.lines.map((line, i) => (
                <motion.span
                  key={line}
                  className={styles.line}
                  custom={i}
                  variants={lineVariants}
                >
                  {line}
                </motion.span>
              ))}
            </p>
          </div>
        </motion.div>
      </div>
 
      <motion.div className={styles.rightBox} variants={rightBoxVariants}>
        <span className={styles.eyebrow}>{feature.eyebrow}</span>
        <span className={styles.highlight}>{feature.highlight}</span>
      </motion.div>
    </motion.div>
  );
}
 
/* -------------------------------------------------------------------- */
/*  Section                                                              */
/* -------------------------------------------------------------------- */
 
export default function Features() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Built to Handle Every Ticket</h2>
 
        <div className={styles.list}>
          {FEATURES.map((feature) => (
            <FeatureRow key={feature.badge} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}