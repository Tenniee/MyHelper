"use client";
 
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./AuthLayout.module.css";
 
/* -------------------------------------------------------------------- */
/*  Testimonials — same agent across all 3, quotes rotate every 60s.    */
/*  Lines are hardcoded per quote so the line-by-line reveal is         */
/*  deliberate rather than relying on however the browser wraps text.   */
/* -------------------------------------------------------------------- */
 
const TESTIMONIALS = [
  {
    lines: [
      "\"Switching to MyHelpr transformed our support",
      "workflow. The integration with SendBaba was",
      "seamless, and our team efficiency skyrocketed",
      "within the first week.\"",
    ],
    name: "Sarah Judah",
    role: "Support Lead, CloudFlow",
    initials: "SJ",
  },
  {
    lines: [
      "\"MyHelpr transformed the way our team manages",
      "customer interactions. It's fast, intuitive, and",
      "the ROI was immediate.\"",
    ],
    name: "Sarah Judah",
    role: "Support Lead, CloudFlow",
    initials: "SJ",
  },
  {
    lines: [
      "\"Our team was fully onboarded in a day. What",
      "used to take five support tools now happens",
      "in one clean, shared inbox.\"",
    ],
    name: "Sarah Judah",
    role: "Support Lead, CloudFlow",
    initials: "SJ",
  },
];
 
const ROTATE_INTERVAL_MS = 60000; // 1 minute
 
/* -------------------------------------------------------------------- */
/*  Variants                                                             */
/* -------------------------------------------------------------------- */
 
const quoteBlockVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};
 
const lineVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};
 
const authorVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut", delay: 0.1 },
  },
};
 
/* -------------------------------------------------------------------- */
/*  Layout                                                               */
/* -------------------------------------------------------------------- */
 
export default function AuthLayout({ children, footerNote }) {
  const [activeIndex, setActiveIndex] = useState(0);
 
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);
 
  const active = TESTIMONIALS[activeIndex];
 
  return (
    <div className={styles.page}>
      {/* ---------- Left: form ---------- */}
      <div className={styles.formPanel}>
        <Link href="/" className={styles.logoGroup}>
          <span className={styles.logoMark}>M</span>
          <span className={styles.logoText}>MyHelpr</span>
        </Link>
 
        <div className={styles.formArea}>{children}</div>
 
        {footerNote && <div className={styles.footerNote}>{footerNote}</div>}
      </div>
 
      {/* ---------- Right: photo + rotating testimonial ---------- */}
      <div className={styles.imagePanel}>
        <img
          src="/auth/auth-agent.jpg"
          alt="MyHelpr customer support agent"
          className={styles.image}
        />
        <div className={styles.scrim} />
 
        <div className={styles.testimonial}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={quoteBlockVariants}
            >
              <p className={styles.quote}>
                {active.lines.map((line, i) => (
                  <motion.span
                    key={i}
                    className={styles.quoteLine}
                    variants={lineVariants}
                  >
                    {line}
                  </motion.span>
                ))}
              </p>
 
              <motion.div className={styles.author} variants={authorVariants}>
                <span className={styles.avatar}>{active.initials}</span>
                <span>
                  <span className={styles.authorName}>{active.name}</span>
                  <span className={styles.authorRole}>{active.role}</span>
                </span>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
 