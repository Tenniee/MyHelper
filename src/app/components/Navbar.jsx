"use client";
 
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./Navbar.module.css";
 
const NAV_LINKS = ["Features", "How it works", "Reviews", "Pricing"];
 
// Logo + wordmark slide in together from the left, fading in as they move.
// delay: 1s -> waits for the hero text to finish its own load-in first.
const logoVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 1 },
  },
};
 
// Buttons "pop" in: grow from the middle, overshoot past full size, settle back.
const buttonsContainerVariants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 1, staggerChildren: 0.08 },
  },
};
 
const buttonPopVariants = {
  hidden: { opacity: 0, scale: 0.4 },
  visible: {
    opacity: 1,
    scale: [0.4, 1.1, 1], // overshoot -> settle, gives the "pop"
    transition: { duration: 0.5, ease: "easeOut" },
  },
};
 
// Pill grows horizontally from its center point. Starts after logo/buttons,
// finishes last (its children -- the links -- animate in after it starts growing).
const pillVariants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 1.3 },
  },
};
 
const linksContainerVariants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 1.6, staggerChildren: 0.08 },
  },
};
 
// Each nav link drops from top, fading in.
const linkDropVariants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};
 
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
 
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
 
  return (
    <header
      className={`${styles.navbar} ${scrolled ? styles.scrolled : styles.atTop}`}
    >
      <div className={styles.inner}>
        {/* Logo + wordmark */}
        <motion.div
          className={styles.logoGroup}
          initial="hidden"
          animate="visible"
          variants={logoVariants}
        >
          <span className={styles.logoMark}>M</span>
          <span className={styles.logoText}>My Helpr</span>
        </motion.div>
 
        {/* Pill nav */}
        <motion.nav
          className={styles.pill}
          initial="hidden"
          animate="visible"
          variants={pillVariants}
          aria-label="Primary"
        >
          <motion.ul
            className={styles.pillList}
            initial="hidden"
            animate="visible"
            variants={linksContainerVariants}
          >
            {NAV_LINKS.map((label) => (
              <motion.li key={label} variants={linkDropVariants}>
                <a
                  href={`#${label.toLowerCase().replace(/\s+/g, "-")}`}
                  className={styles.pillLink}
                >
                  {label}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.nav>
 
        {/* Sign in / CTA */}
        <motion.div
          className={styles.actions}
          initial="hidden"
          animate="visible"
          variants={buttonsContainerVariants}
        >
          <motion.div variants={buttonPopVariants}>
            <Link href="/login" className={styles.signIn}>
              Sign In
            </Link>
          </motion.div>
          <motion.div variants={buttonPopVariants}>
            <Link href="/register" className={styles.cta}>
              Start Free Trial
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}
 