"use client";
 
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Heart, ArrowUpRight } from "lucide-react";
import styles from "./Testimonials.module.css";
import TestimonialPhoto1 from "../../assets/Elara-Steele.webp";
import TestimonialPhoto2 from "../../assets/Elara-Steele.webp";
import TestimonialPhoto3 from "../../assets/Elara-Steele.webp";
 
/* -------------------------------------------------------------------- */
/*  Content — only testimonial #1 was given. #2 and #3 are placeholder  */
/*  copy + gradient avatars. Swap in real quotes/photos when ready.     */
/* -------------------------------------------------------------------- */
 
const TESTIMONIALS = [
  {
    quote:
      "Setup took 10 minutes. Within a week, we had our entire knowledge base migrated and team onboarded. Incredible experience",
    name: "Elara Steele",
    role: "Support Lead, CloudFlow",
    image: TestimonialPhoto1,
    gradient: null,
  },
  {
    quote:
      "Our first-response time dropped by half in the first month. The whole team actually enjoys working tickets now.",
    name: "Marcus Adeyemi",
    role: "Head of Support, Lumen",
    image: null,
    gradient: "linear-gradient(160deg,#93C5FD,#60A5FA)",
  },
  {
    quote:
      "Switching over felt risky, but the migration was painless and our customers noticed the difference immediately.",
    name: "Priya Nair",
    role: "Operations Manager, Fenwick",
    image: null,
    gradient: "linear-gradient(160deg,#FDBA74,#FB923C)",
  },
];
 
const HEADING_WORDS = "Loved by Support Teams".split(" ");
 
/* -------------------------------------------------------------------- */
/*  Variants                                                             */
/* -------------------------------------------------------------------- */
 
const topItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};
 
const headingContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
 
// Each word fades + slides up on its own — combined with the stagger above,
// this reads as "typing" while the line rises into place.
const headingWordVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};
 
const cardRevealVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};
 
// Whole slide (quote side + image side) — entrance staggers children,
// exit is a simple fade-to-back so the outgoing card recedes cleanly.
const slideVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.35, ease: "easeInOut" },
  },
};
 
const storyBadgeVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};
 
const quoteVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
 
const nameVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.1 } },
};
 
// Image "pops": grows past full size, then settles back.
const imageVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: [0.85, 1.08, 1],
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};
 
const badgeGrowVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "backOut", delay: 0.35 },
  },
};
 
/* -------------------------------------------------------------------- */
/*  Section                                                              */
/* -------------------------------------------------------------------- */
 
export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = TESTIMONIALS[activeIndex];
 
  return (
    <section className={styles.section} id="reviews">
      <div className={styles.inner}>
        {/* ---------- Top bar ---------- */}
        <motion.div
          className={styles.topBar}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.7 }}
        >
          <motion.span className={styles.reviewsPill} variants={topItemVariants}>
            <MessageSquare size={14} strokeWidth={2} />
            CUSTOMER REVIEWS
          </motion.span>
 
          <motion.h2
            className={styles.heading}
            variants={headingContainerVariants}
          >
            {HEADING_WORDS.map((word, i) => (
              <motion.span
                key={word + i}
                className={styles.headingWord}
                variants={headingWordVariants}
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>
 
          <motion.span className={styles.reviewAbout} variants={topItemVariants}>
            Review about
            <span className={styles.brandBadge}>MyHelpr</span>
          </motion.span>
        </motion.div>
 
        {/* ---------- Main card ---------- */}
        <motion.div
          className={styles.card}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardRevealVariants}
        >
          <div className={styles.dots}>
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name}
                type="button"
                aria-label={`Show testimonial from ${t.name}`}
                className={`${styles.dot} ${
                  i === activeIndex ? styles.dotActive : ""
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
 
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className={styles.slide}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={slideVariants}
            >
              <div className={styles.leftCol}>
                <motion.span
                  className={styles.storyBadge}
                  variants={storyBadgeVariants}
                >
                  Customer Stories
                </motion.span>
 
                <motion.p className={styles.quote} variants={quoteVariants}>
                  &quot;{active.quote}&quot;
                </motion.p>
 
                <motion.div variants={nameVariants}>
                  <p className={styles.name}>{active.name}</p>
                  <p className={styles.role}>{active.role}</p>
                </motion.div>
              </div>
 
              <motion.div className={styles.imageWrap} variants={imageVariants}>
                {active.image ? (
                  <Image
                    src={active.image}
                    alt={active.name}
                    className={styles.image}
                  />
                ) : (
                  <div
                    className={styles.imagePlaceholder}
                    style={{ background: active.gradient }}
                  />
                )}
 
                <motion.span
                  className={styles.heartBadge}
                  variants={badgeGrowVariants}
                >
                  <Heart size={18} color="#111827" strokeWidth={2} />
                </motion.span>
 
                <motion.a
                  href="#"
                  className={styles.connectBadge}
                  variants={badgeGrowVariants}
                >
                  <span className={styles.connectLabel}>Connect</span>
                  <span className={styles.connectIcon}>
                    <ArrowUpRight size={14} color="#ffffff" strokeWidth={2.5} />
                  </span>
                </motion.a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
 