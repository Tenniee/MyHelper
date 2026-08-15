"use client";
 
import { motion } from "framer-motion";
import { Globe, Video, ArrowRight, User } from "lucide-react";
import styles from "./FinalCTA.module.css";

import LeftSuportAgent from "../../assets/Woman-on-video-callBottom.webp";
//import SecondTypingOnKeyboard from '';
//import ThirdSupportAgent from '';
import FourthBottomWomanWithHeadset from '../../assets/Woman-with-headset.webp';
import FourthTopKeyboard from '../../assets/Keyboard.webp';
 
/**
 * Resolves a card's `gradient` field into a valid CSS `background` value,
 * whether it's a CSS gradient string, a plain image URL string, or a
 * Next.js static image import (which resolves to an OBJECT like
 * { src, width, height }, not a string — swapping a gradient string for
 * an imported image without this would silently do nothing, since
 * `background: {object}` is invalid CSS and just gets dropped).
 */
function resolveCardBackground(source) {
  if (!source) return undefined;
  if (typeof source === "string") {
    return source.includes("gradient(")
      ? source
      : `url(${source}) center / cover no-repeat`;
  }
  if (source.src) {
    return `url(${source.src}) center / cover no-repeat`;
  }
  return undefined;
}
 
/* -------------------------------------------------------------------- */
/*  Content                                                              */
/* -------------------------------------------------------------------- */
 
const HEADING_LINES = [
  { words: ["Ready", "to", "Transform"] },
  { words: ["Your", "Support?"] },
  { words: [{ text: "MyHelpr", brand: true }, "is", "here!"] },
];
 
// Placeholder gallery — swap `gradient` for real background-image urls.
// gridColumn/gridRow follow the bento layout from the design directly.
// The badge + image below it are one "stack" item so the badge can sit
// tight against the image instead of floating in its own grid row.
const GALLERY = [
  { id: "g1", type: "image", gradient: LeftSuportAgent, gridColumn: "1", gridRow: "1 / 3" },
  { id: "g2", type: "stack", gridColumn: "2", gridRow: "1 / 3", gradient: "linear-gradient(160deg,#A7F3D0,#6EE7B7)" },
  { id: "g3", type: "image", gradient: "linear-gradient(160deg,#93C5FD,#60A5FA)", gridColumn: "3", gridRow: "1 / 3" },
  { id: "g4a", type: "image", gradient: FourthTopKeyboard, gridColumn: "4", gridRow: "1" },
  { id: "g4b", type: "image", gradient: FourthBottomWomanWithHeadset, gridColumn: "4", gridRow: "2" },
];
 
/* -------------------------------------------------------------------- */
/*  Variants                                                             */
/* -------------------------------------------------------------------- */
 
const headingContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};
 
const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};
 
// Icons fade in while their rotation overshoots past 0 and springs back —
// the "recoil" comes from spring physics rather than a hand-authored
// keyframe list (more on this below the code).
const iconVariants = {
  hidden: { opacity: 0, rotate: -45 },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: {
      opacity: { duration: 0.3 },
      rotate: { type: "spring", stiffness: 260, damping: 9, delay: 0.2 },
    },
  },
};
 
const rightTextVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};
 
// Button: grows past full size, dips smaller than final, then settles —
// a spring with low damping produces exactly this overshoot/undershoot.
const buttonVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      opacity: { duration: 0.2 },
      scale: { type: "spring", stiffness: 300, damping: 8, delay: 0.15 },
    },
  },
};
 
const galleryContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
 
const galleryItemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};
 
/* -------------------------------------------------------------------- */
/*  Section                                                              */
/* -------------------------------------------------------------------- */
 
export default function FinalCTA() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.topRow}>
          {/* ---------- Left: heading + icon stack ---------- */}
          <div className={styles.headingRow}>
            <motion.h2
              className={styles.heading}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              variants={headingContainerVariants}
            >
              {HEADING_LINES.map((line, lineIndex) => (
                <span className={styles.headingLine} key={lineIndex}>
                  {line.words.map((word, wordIndex) => {
                    const isBrand = typeof word === "object" && word.brand;
                    const text = isBrand ? word.text : word;
                    return (
                      <motion.span
                        key={text + wordIndex}
                        className={`${styles.word} ${
                          isBrand ? styles.brandWord : ""
                        }`}
                        variants={wordVariants}
                      >
                        {text}
                      </motion.span>
                    );
                  })}
                </span>
              ))}
            </motion.h2>
 
            <div className={styles.iconStack}>
              <motion.span
                className={styles.iconCircle}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.8 }}
                variants={iconVariants}
              >
                <Globe size={18} color="#374151" strokeWidth={2} />
              </motion.span>
              <motion.span
                className={styles.iconCircle}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.8 }}
                variants={iconVariants}
                transition={{ delayChildren: 0.1 }}
              >
                <Video size={18} color="#374151" strokeWidth={2} />
              </motion.span>
            </div>
          </div>
 
          {/* ---------- Right: description + CTA ---------- */}
          <div className={styles.rightCol}>
            <motion.p
              className={styles.rightText}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.8 }}
              variants={rightTextVariants}
            >
              Join thousands of businesses delivering exceptional customer
              experiences with MyHelpr.
            </motion.p>
 
            <motion.a
              href="/register"
              className={styles.ctaButton}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.8 }}
              variants={buttonVariants}
            >
              Start Your Free Trial
              <span className={styles.ctaIcon}>
                <ArrowRight size={16} color="#FF6B00" strokeWidth={2.5} />
              </span>
            </motion.a>
          </div>
        </div>
 
        {/* ---------- Image gallery ---------- */}
        <motion.div
          className={styles.gallery}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={galleryContainerVariants}
        >
          {GALLERY.map((item) => {
            if (item.type === "stack") {
              return (
                <motion.div
                  key={item.id}
                  className={styles.stackCell}
                  style={{ gridColumn: item.gridColumn, gridRow: item.gridRow }}
                  variants={galleryItemVariants}
                >
                  <div className={styles.badgeCard}>
                    <span className={styles.badgeIcon}>
                      <User size={14} color="#ffffff" strokeWidth={2} />
                    </span>
                    <span className={styles.badgeText}>Making Support Simple</span>
                  </div>
                  <div
                    className={styles.galleryImage}
                    style={{ background: resolveCardBackground(item.gradient), flex: 1 }}
                  />
                </motion.div>
              );
            }
 
            return (
              <motion.div
                key={item.id}
                className={styles.galleryImage}
                style={{
                  background: resolveCardBackground(item.gradient),
                  gridColumn: item.gridColumn,
                  gridRow: item.gridRow,
                }}
                variants={galleryItemVariants}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
 