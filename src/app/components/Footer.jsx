"use client";
 
import { motion } from "framer-motion";
import { Globe, AtSign, ArrowUpRight } from "lucide-react";
import styles from "./Footer.module.css";
 
/* -------------------------------------------------------------------- */
/*  Content                                                              */
/* -------------------------------------------------------------------- */
 
const LOGO_TEXT = "MyHelpr";
 
const COLUMNS = [
  { title: "PRODUCT", links: ["Features", "Security", "API"] },
  { title: "COMPANY", links: ["About", "Careers", "Blog"] },
  { title: "SUPPORT", links: ["Contact", "Help Center"] },
  { title: "LEGAL", links: ["Privacy", "Terms"] },
];
 
const YEAR = new Date().getFullYear();
 
/* -------------------------------------------------------------------- */
/*  Variants                                                             */
/* -------------------------------------------------------------------- */
 
const footerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
 
// Each letter of the wordmark springs in with a little alternating tilt —
// like it's assembling itself rather than just fading up.
const logoContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.05 } },
};
 
const logoLetterVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.4, rotate: -18 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 12,
    },
  }),
};
 
const fadeUpVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};
 
const socialContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};
 
const socialIconVariants = {
  hidden: { opacity: 0, scale: 0, rotate: -90 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 260, damping: 11 },
  },
};
 
function columnVariants(index) {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.06, delayChildren: 0.15 + index * 0.07 },
    },
  };
}
 
const columnTitleVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};
 
const linkVariants = {
  hidden: { opacity: 0, x: -14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};
 
const dividerVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 },
  },
};
 
const bottomRowVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, delay: 0.7 },
  },
};
 
/* -------------------------------------------------------------------- */
/*  Footer                                                               */
/* -------------------------------------------------------------------- */
 
export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Slowly drifting background glows — purely decorative */}
      <span className={`${styles.glow} ${styles.glowOrange}`} />
      <span className={`${styles.glow} ${styles.glowBlue}`} />
 
      <motion.div
        className={styles.inner}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={footerVariants}
      >
        <div className={styles.topGrid}>
          {/* ---------- Brand column ---------- */}
          <div className={styles.brandCol}>
            <motion.h3
              className={styles.logo}
              variants={logoContainerVariants}
              aria-label={LOGO_TEXT}
            >
              {LOGO_TEXT.split("").map((letter, i) => (
                <motion.span
                  key={i}
                  className={styles.logoLetter}
                  custom={i}
                  variants={logoLetterVariants}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.h3>
 
            <motion.p className={styles.tagline} variants={fadeUpVariants}>
              Empowering connections through effortless communication.
              Elevate your dialogues instantly.
            </motion.p>
 
            <motion.div
              className={styles.socialRow}
              variants={socialContainerVariants}
            >
              <motion.a
                href="#"
                aria-label="Website"
                className={styles.socialIcon}
                variants={socialIconVariants}
                whileHover={{
                  scale: 1.15,
                  rotate: 14,
                  transition: { type: "spring", stiffness: 300, damping: 8 },
                }}
                whileTap={{ scale: 0.88 }}
              >
                <Globe size={18} color="#ffffff" strokeWidth={2} />
              </motion.a>
              <motion.a
                href="#"
                aria-label="Email"
                className={styles.socialIcon}
                variants={socialIconVariants}
                whileHover={{
                  scale: 1.15,
                  rotate: -14,
                  transition: { type: "spring", stiffness: 300, damping: 8 },
                }}
                whileTap={{ scale: 0.88 }}
              >
                <AtSign size={18} color="#ffffff" strokeWidth={2} />
              </motion.a>
            </motion.div>
          </div>
 
          {/* ---------- Link columns ---------- */}
          <div className={styles.linkGrid}>
            {COLUMNS.map((col, index) => (
              <motion.div
                key={col.title}
                className={styles.linkCol}
                variants={columnVariants(index)}
              >
                <motion.h4
                  className={styles.colTitle}
                  variants={columnTitleVariants}
                >
                  {col.title}
                </motion.h4>
                <ul className={styles.linkList}>
                  {col.links.map((link) => (
                    <motion.li key={link} variants={linkVariants}>
                      <a href="#" className={styles.link}>
                        <span className={styles.linkText}>{link}</span>
                        <ArrowUpRight
                          size={13}
                          strokeWidth={2.5}
                          className={styles.linkArrow}
                        />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
 
        <motion.span className={styles.divider} variants={dividerVariants} />
 
        <motion.div className={styles.bottomRow} variants={bottomRowVariants}>
          <span>&copy; {YEAR} MyHelpr Inc. All rights reserved.</span>
          <span>myhelpr.com</span>
        </motion.div>
      </motion.div>
    </footer>
  );
}
 