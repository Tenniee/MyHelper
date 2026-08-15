"use client";
 
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import styles from "./CTASection.module.css";
 
/* -------------------------------------------------------------------- */
/*  Variants                                                             */
/* -------------------------------------------------------------------- */
 
// The whole card eases in upward on scroll.
const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};
 
const blobVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 0.5,
    transition: { duration: 1, ease: "easeOut", delay: 0.1 },
  },
};
 
const headingLineVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
  }),
};
 
const dividerVariants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
  },
};
 
const paragraphVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.35 },
  },
};
 
const buttonVariants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.55 },
  },
};
 
/* -------------------------------------------------------------------- */
/*  Section                                                              */
/* -------------------------------------------------------------------- */
 
export default function CTASection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          className={styles.card}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          {/* Decorative blurred blobs — clipped to this card only */}
          <motion.span
            className={`${styles.blob} ${styles.blobTopRight}`}
            variants={blobVariants}
          />
          <motion.span
            className={`${styles.blob} ${styles.blobBottomLeft}`}
            variants={blobVariants}
          />
 
          <div className={styles.content}>
            {/* Left: heading */}
            <div className={styles.textCol}>
              <h2 className={styles.heading}>
                <motion.span
                  className={styles.headingLine}
                  custom={0.1}
                  variants={headingLineVariants}
                >
                  Ready to Deliver Better Support?
                </motion.span>
                <motion.span
                  className={styles.headingLine}
                  custom={0.25}
                  variants={headingLineVariants}
                >
                  <span className={styles.brand}>MyHelpr</span> is here!
                </motion.span>
              </h2>
            </div>
 
            {/* Right: description + CTA */}
            <div className={styles.rightCol}>
              <motion.span
                className={styles.divider}
                variants={dividerVariants}
              />
              <div className={styles.rightInner}>
                <motion.p
                  className={styles.paragraph}
                  variants={paragraphVariants}
                >
                  Get the insights you need to improve your team&rsquo;s
                  performance while creating a support portal that reflects
                  your identity with your logo, colors, and custom domain.
                </motion.p>
 
                <motion.a
                  href="/register"
                  className={styles.ctaButton}
                  variants={buttonVariants}
                >
                  <span className={styles.ctaButtonLabel}>
                    Start Your Free Trial
                  </span>
                  <ArrowRight
                    size={18}
                    strokeWidth={2.5}
                    className={styles.ctaButtonIcon}
                  />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
 