"use client";
 
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ClipboardList, BookOpen } from "lucide-react";
import styles from "./Features.module.css";
 
/* -------------------------------------------------------------------- */
/*  Exact icons from Figma for cards 3 & 4 (not close lucide matches —  */
/*  the real SVG paths, as inline components so they behave like any    */
/*  other icon component: size/color/strokeWidth props).                */
/* -------------------------------------------------------------------- */
 
function TeamCollabIcon({ size = 24, color = "#ffffff", strokeWidth = 2.33 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.83268 22.1666C3.25708 22.1666 1.16602 20.0756 1.16602 17.5V3.49996C1.16602 2.21216 2.21155 1.16663 3.49935 1.16663H8.16602C9.45382 1.16663 10.4993 2.21216 10.4993 3.49996V17.5C10.4993 20.0756 8.40829 22.1666 5.83268 22.1666V22.1666M5.83268 22.1666H19.8327C21.1205 22.1666 22.166 21.1211 22.166 19.8333V15.1666C22.166 13.8788 21.1205 12.8333 19.8327 12.8333H17.0992M10.4993 6.23346L12.4325 4.30029C13.3437 3.3894 14.8207 3.3894 15.7318 4.30029L19.0323 7.60079C19.9432 8.51196 19.9432 9.98896 19.0323 10.9001L9.13202 20.7993M5.83268 17.5H5.84435"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
 
function KnowledgeBaseIcon({ size = 24, color = "#ffffff", strokeWidth = 2.33 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.834 23.3333H25.6673V21C25.6672 19.509 24.7226 18.1818 23.3139 17.6933C21.9052 17.2049 20.3417 17.6625 19.4186 18.8335M19.834 23.3333H8.16732M19.834 23.3333V21C19.834 20.2346 19.687 19.5031 19.4186 18.8335M8.16732 23.3333H2.33398V21C2.33409 19.509 3.27874 18.1818 4.68744 17.6933C6.09615 17.2049 7.65963 17.6625 8.58265 18.8335M8.16732 23.3333V21C8.16732 20.2346 8.31432 19.5031 8.58265 18.8335M8.58265 18.8335C9.46906 16.6183 11.6147 15.1658 14.0007 15.1658C16.3866 15.1658 18.5322 16.6183 19.4186 18.8335M17.5007 8.16663C17.5007 10.0983 15.9324 11.6666 14.0007 11.6666C12.0689 11.6666 10.5007 10.0983 10.5007 8.16663C10.5007 6.23492 12.0689 4.66663 14.0007 4.66663C15.9324 4.66663 17.5007 6.23492 17.5007 8.16663L19.834 23.3333M26.834 26.8333C26.834 28.1211 25.7885 29.1666 24.5007 29.1666C23.2128 29.1666 22.1673 28.1211 22.1673 26.8333C22.1673 25.5455 23.2128 24.5 24.5007 24.5C25.7885 24.5 26.834 25.5455 26.834 26.8333V26.8333M8.16732 11.6666C8.16732 12.9544 7.12179 14 5.83398 14C4.54618 14 3.50065 12.9544 3.50065 11.6666C3.50065 10.3788 4.54618 9.33329 5.83398 9.33329C7.12179 9.33329 8.16732 10.3788 8.16732 11.6666V11.6666"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
 
/* -------------------------------------------------------------------- */
/*  Detects whether the card is in its stacked (mobile) layout, so the  */
/*  right box's entrance slide can use a much smaller travel distance   */
/*  instead of a proportional one — a 30%-of-width slide is correct     */
/*  math, but still reads as "sliding way off center" on a narrow card. */
/* -------------------------------------------------------------------- */
 
function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(false);
 
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [breakpoint]);
 
  return isMobile;
}
 
/* -------------------------------------------------------------------- */
/*  Content — only "Smart Ticketing" copy was given, the other 3        */
/*  features and the section heading are placeholder text. Edit freely. */
/* -------------------------------------------------------------------- */
 
const FEATURES = [
  {
    icon: ClipboardList,
    badge: "Smart Ticketing",
    lines: [
      "Automatically organize, prioritize, and route tickets.",
      "Never miss a conversation with smart notifications.",
    ],
    eyebrow: "We are here to",
    highlight: "Optimize Ticket Routing",
  },
  {
    icon: BookOpen,
    badge: "Email Integration",
    lines: [
      "Convert emails to tickets instantly and build",
      "self-service documentation to help customers",
      "find answers 24/7 without waiting.",
    ],
    eyebrow: "We are here to",
    highlight: "Make Support Easier",
  },
  {
    icon: KnowledgeBaseIcon,
    badge: "Knowledge Base",
    lines: [
      "Build self-service docs to deflect tickets. Help",
      "customers find answers 24/7 without waiting.",
    ],
    eyebrow: "We are here to",
    highlight: "Give Customers the Answers They Need",
  },
  {
    icon: TeamCollabIcon,
    badge: "Team Collaboration",
    lines: [
      "Assign tickets, mention teammates, and add",
      "internal notes. Work together seamlessly.",
    ],
    eyebrow: "We are here to",
    highlight: "Keep Your Team in Sync",
  },
];
 
/* -------------------------------------------------------------------- */
/*  Variants                                                             */
/* -------------------------------------------------------------------- */
 
// Right box appears first (fades + scales in while holding its position),
// then slides right into its final place. The left section only starts
// once this entire sequence has finished.
function getRightBoxVariants(offset) {
  return {
    hidden: { opacity: 0, scale: 0.88, x: -offset },
    visible: {
      opacity: [0, 1, 1],
      scale: [0.88, 1, 1],
      x: [-offset, -offset, 0],
      transition: {
        duration: 0.9,
        times: [0, 0.4, 1],
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
}
 
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
  const isMobile = useIsMobile();
  const rightBoxVariants = getRightBoxVariants(isMobile ? 0 : 180);
 
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
            <feature.icon size={26} color="#ffffff" strokeWidth={2} />
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
        <h2 className={styles.heading}>Everything You Need to Excel</h2>
 
        <div className={styles.list}>
          {FEATURES.map((feature) => (
            <FeatureRow key={feature.badge} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
 