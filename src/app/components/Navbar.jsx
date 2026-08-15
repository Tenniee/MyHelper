"use client";
 
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
 
// Mobile panel: height auto-animates open/closed. Framer can't animate to
// "auto" directly on layout height reliably across browsers, so we animate
// max-height instead -- generous ceiling, real height clips it.
const panelVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
  },
};
 
const mobileLinksContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
};
 
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
 
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
 
  // Lock body scroll while the mobile menu is open, and close it
  // automatically if the viewport grows back past the breakpoint
  // (e.g. rotating a tablet, or resizing a browser window).
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
 
    const onResize = () => {
      if (window.innerWidth > 1100) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
 
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", onResize);
    };
  }, [mobileOpen]);
 
  const closeMenu = () => setMobileOpen(false);
 
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
 
        {/* Pill nav (desktop) */}
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
 
        {/* Sign in / CTA (desktop) */}
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
 
        {/* Hamburger (mobile only, via CSS media query) */}
        <button
          type="button"
          className={styles.hamburger}
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-panel"
        >
          <motion.span
            className={styles.hamburgerBar}
            animate={{
              rotate: mobileOpen ? 45 : 0,
              y: mobileOpen ? 0 : -5,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
          <motion.span
            className={styles.hamburgerBar}
            animate={{
              rotate: mobileOpen ? -45 : 0,
              y: mobileOpen ? 0 : 5,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
        </button>
      </div>
 
      {/* Mobile menu panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-panel"
            className={styles.mobilePanel}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={panelVariants}
          >
            <motion.div
              className={styles.mobilePanelInner}
              initial="hidden"
              animate="visible"
              variants={mobileLinksContainerVariants}
            >
              {NAV_LINKS.map((label) => (
                <motion.a
                  key={label}
                  href={`#${label.toLowerCase().replace(/\s+/g, "-")}`}
                  className={styles.mobileLink}
                  variants={linkDropVariants}
                  onClick={closeMenu}
                >
                  {label}
                </motion.a>
              ))}
 
              <motion.div className={styles.mobileActions} variants={linkDropVariants}>
                <Link href="/login" className={styles.mobileSignIn} onClick={closeMenu}>
                  Sign In
                </Link>
                <Link href="/register" className={styles.mobileCta} onClick={closeMenu}>
                  Start Free Trial
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}