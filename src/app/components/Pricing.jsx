"use client";

import { motion } from "framer-motion";
import { Phone, Box, Star, Building2, Check, ArrowUpRight } from "lucide-react";
import styles from "./Pricing.module.css";

/* -------------------------------------------------------------------- */
/*  Content                                                              */
/* -------------------------------------------------------------------- */

const PLANS = [
  {
    icon: Box,
    name: "Starter Version",
    subtitle: "Perfect for getting started",
    price: "$0",
    features: [
      "1 team member",
      "50 tickets/month",
      "10 KB articles",
      "Email support",
      "Custom domain",
      "Remove branding",
    ],
    highlighted: false,
  },
  {
    icon: Star,
    name: "Pro Version",
    subtitle: "For growing teams",
    price: "$59",
    features: [
      "5,000 tickets/month",
      "10 Team Members",
      "Unlimited KB articles",
      "Priority support",
      "Custom domain",
      "Remove branding",
    ],
    highlighted: true,
  },
  {
    icon: Building2,
    name: "Enterprise Version",
    subtitle: "For large Organization",
    price: "$199",
    features: [
      "Unlimited tickets",
      "Unlimited team",
      "Unlimited everything",
      "Dedicated support",
      "Custom Integrations",
      "SLA guarantee",
    ],
    highlighted: false,
  },
];

const HEADING_WORDS = "Simple, Transparent Pricing".split(" ");
const SUBTEXT_LINES = [
  "Start free, upgrade when you're ready.",
  "No hidden fees.",
];

/* -------------------------------------------------------------------- */
/*  Variants                                                             */
/* -------------------------------------------------------------------- */

// Pill: grows out from nothing with a pop/overshoot.
const pillVariants = {
  hidden: { opacity: 0, scale: 0.4 },
  visible: {
    opacity: 1,
    scale: [0.4, 1.12, 1],
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const headingContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const headingWordVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

// Subtext fades up, one line at a time.
const subtextContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const subtextLineVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

function cardVariants(index) {
  return {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.15,
        staggerChildren: 0.06,
        delayChildren: index * 0.15 + 0.15,
      },
    },
  };
}

const cardItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

// Bottom arrow circle: rotates in from ~10 o'clock, swings past its resting
// angle, then settles back — combined with a grow/pop scale.
const circleVariants = {
  hidden: { opacity: 0, scale: 0.4, rotate: -55 },
  visible: {
    opacity: 1,
    scale: [0.4, 1.15, 1],
    rotate: [-55, 12, 0],
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/* -------------------------------------------------------------------- */
/*  Section                                                              */
/* -------------------------------------------------------------------- */

export default function Pricing() {
  return (
    <section className={styles.section} id="pricing">
      <div className={styles.inner}>
        <div className={styles.topRow}>
          <motion.span
            className={styles.pill}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
            variants={pillVariants}
          >
            Schedule A Call
            <Phone size={14} strokeWidth={2} />
          </motion.span>
        </div>

        <motion.h2
          className={styles.heading}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.7 }}
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

        <motion.p
          className={styles.subtext}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
          variants={subtextContainerVariants}
        >
          {SUBTEXT_LINES.map((line) => (
            <motion.span
              key={line}
              className={styles.subtextLine}
              variants={subtextLineVariants}
            >
              {line}
            </motion.span>
          ))}
        </motion.p>

        <div className={styles.grid}>
          {PLANS.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                className={`${styles.card} ${
                  plan.highlighted ? styles.cardHighlighted : ""
                }`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants(index)}
              >
                <motion.span
                  className={`${styles.icon} ${
                    plan.highlighted ? styles.iconHighlighted : ""
                  }`}
                  variants={cardItemVariants}
                >
                  <Icon
                    size={40}
                    strokeWidth={1.5}
                    color={plan.highlighted ? "#FF6B00" : "#9CA3AF"}
                  />
                </motion.span>

                <motion.h3 className={styles.planName} variants={cardItemVariants}>
                  {plan.name}
                </motion.h3>
                <motion.p className={styles.planSubtitle} variants={cardItemVariants}>
                  {plan.subtitle}
                </motion.p>

                <motion.p className={styles.price} variants={cardItemVariants}>
                  {plan.price}
                  <span className={styles.pricePeriod}>/ month</span>
                </motion.p>

                <motion.div className={styles.divider} variants={cardItemVariants} />

                <motion.ul className={styles.featureList} variants={cardItemVariants}>
                  {plan.features.map((feature) => (
                    <li key={feature} className={styles.featureItem}>
                      <Check
                        size={16}
                        strokeWidth={2.5}
                        color={plan.highlighted ? "#FF6B00" : "#9CA3AF"}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </motion.ul>

                <motion.div
                  className={styles.circleWrap}
                  variants={circleVariants}
                >
                  <span className={styles.circleBackdrop} />
                  <a
                    href="/register"
                    aria-label={`Get started with ${plan.name}`}
                    className={`${styles.circleButton} ${
                      plan.highlighted ? styles.circleButtonHighlighted : ""
                    }`}
                  >
                    <ArrowUpRight
                      size={20}
                      strokeWidth={2.25}
                      color={plan.highlighted ? "#C2410C" : "#374151"}
                    />
                  </a>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}