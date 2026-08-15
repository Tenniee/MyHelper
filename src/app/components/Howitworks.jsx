"use client";
 
import { motion } from "framer-motion";
import {
  Check,
  Mail,
  UserRound,
  CheckCircle2,
  Star,
  ArrowRight,
} from "lucide-react";
import styles from "./Howitworks.module.css";
 
/* -------------------------------------------------------------------- */
/*  Content                                                              */
/* -------------------------------------------------------------------- */
 
const STEPS = [
  {
    number: 1,
    title: "Create Account",
    desc: "Sign up free in seconds. No credit card required to start.",
    card: "accountCreated",
    side: "right", // card sits on the right, text on the left
  },
  {
    number: 2,
    title: "Connect Email",
    desc: "Link your support email to start receiving tickets automatically.",
    card: "connectingInbox",
    side: "left",
  },
  {
    number: 3,
    title: "Add Your Team",
    desc: "Invite team members and assign roles based on your needs.",
    card: "invitesSent",
    side: "right",
  },
  {
    number: 4,
    title: "Delight Customers",
    desc: "Start responding to tickets and watch satisfaction soar.",
    card: "chatSatisfaction",
    side: "left",
  },
];
 
const AVATAR_COLORS = ["#FDE68A", "#BFDBFE", "#FBCFE8"];
 
/* -------------------------------------------------------------------- */
/*  Variants                                                             */
/* -------------------------------------------------------------------- */
 
const numberVariants = {
  hidden: { opacity: 0, scale: 0.4, rotate: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};
 
const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.12 },
  },
};
 
const descVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.22 },
  },
};
 
function cardVariants(side) {
  const fromX = side === "right" ? 60 : -60;
  return {
    hidden: { opacity: 0, x: fromX, scale: 0.94 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
    },
  };
}
 
const cardInnerContainerVariants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.35, staggerChildren: 0.1 } },
};
 
const cardInnerItemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};
 
const ctaVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};
 
/* -------------------------------------------------------------------- */
/*  Card variants (the little product-preview mockups)                  */
/* -------------------------------------------------------------------- */
 
function AccountCreatedCard() {
  return (
    <motion.div
      className={styles.previewCard}
      variants={cardInnerContainerVariants}
    >
      <motion.span
        className={styles.iconCircleGreen}
        variants={cardInnerItemVariants}
      >
        <Check size={26} color="#16A34A" strokeWidth={3} />
      </motion.span>
      <motion.p className={styles.previewTitle} variants={cardInnerItemVariants}>
        Account Created!
      </motion.p>
      <motion.span className={styles.skeletonBar} style={{ width: "80%" }} variants={cardInnerItemVariants} />
      <motion.span className={styles.skeletonBar} style={{ width: "55%" }} variants={cardInnerItemVariants} />
    </motion.div>
  );
}
 
function ConnectingInboxCard() {
  return (
    <motion.div
      className={styles.previewCard}
      variants={cardInnerContainerVariants}
    >
      <motion.span className={styles.iconCircleOrangeWrap} variants={cardInnerItemVariants}>
        <span className={styles.pulseRing} />
        <span className={styles.iconCircleOrange}>
          <Mail size={24} color="#ffffff" strokeWidth={2} />
        </span>
      </motion.span>
      <motion.p className={styles.previewTitle} variants={cardInnerItemVariants}>
        Connecting Inbox...
      </motion.p>
    </motion.div>
  );
}
 
function InvitesSentCard() {
  return (
    <motion.div
      className={styles.previewCard}
      variants={cardInnerContainerVariants}
    >
      <motion.div className={styles.avatarRow} variants={cardInnerItemVariants}>
        <div className={styles.avatarStack}>
          {AVATAR_COLORS.map((color, i) => (
            <span
              key={color}
              className={styles.avatarCircle}
              style={{ background: color, zIndex: AVATAR_COLORS.length - i }}
            >
              <UserRound size={16} color="#374151" strokeWidth={2} />
            </span>
          ))}
        </div>
        <span className={styles.avatarMore}>+3</span>
      </motion.div>
 
      <motion.div className={styles.invitesPill} variants={cardInnerItemVariants}>
        <CheckCircle2 size={16} color="#16A34A" strokeWidth={2} />
        <span>Invites Sent</span>
      </motion.div>
    </motion.div>
  );
}
 
function ChatSatisfactionCard() {
  return (
    <motion.div
      className={styles.previewCard}
      variants={cardInnerContainerVariants}
    >
      <motion.div className={styles.bubbleRowRight} variants={cardInnerItemVariants}>
        <span className={styles.bubbleOrange}>Thank you so much!</span>
      </motion.div>
      <motion.div className={styles.bubbleRowLeft} variants={cardInnerItemVariants}>
        <span className={styles.bubbleGray}>Happy to help!</span>
      </motion.div>
      <motion.div className={styles.satisfactionRow} variants={cardInnerItemVariants}>
        <span className={styles.satisfactionLabel}>Customer Satisfaction</span>
        <span className={styles.satisfactionScore}>
          <Star size={14} color="#FACC15" fill="#FACC15" strokeWidth={0} />
          100%
        </span>
      </motion.div>
    </motion.div>
  );
}
 
const CARD_COMPONENTS = {
  accountCreated: AccountCreatedCard,
  connectingInbox: ConnectingInboxCard,
  invitesSent: InvitesSentCard,
  chatSatisfaction: ChatSatisfactionCard,
};
 
/* -------------------------------------------------------------------- */
/*  One step row                                                        */
/* -------------------------------------------------------------------- */
 
function StepRow({ step }) {
  const CardComponent = CARD_COMPONENTS[step.card];
 
  return (
    <div
      className={`${styles.stepRow} ${
        step.side === "left" ? styles.stepRowReversed : ""
      }`}
    >
      <div className={styles.stepContent}>
        <motion.span
          className={styles.numberCircle}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={numberVariants}
        >
          {step.number}
        </motion.span>
 
        <motion.h3
          className={styles.stepTitle}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={titleVariants}
        >
          {step.title}
        </motion.h3>
 
        <motion.p
          className={styles.stepDesc}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={descVariants}
        >
          {step.desc}
        </motion.p>
      </div>
 
      <motion.div
        className={styles.stepCardWrap}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={cardVariants(step.side)}
      >
        <CardComponent />
      </motion.div>
    </div>
  );
}
 
/* -------------------------------------------------------------------- */
/*  Section                                                              */
/* -------------------------------------------------------------------- */
 
export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Get Started in Minutes
        </motion.h2>
        <motion.p
          className={styles.subheading}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
        >
          Simple setup, powerful results. Be up and running in no time.
        </motion.p>
 
        <div className={styles.stepsList}>
          {STEPS.map((step) => (
            <StepRow key={step.number} step={step} />
          ))}
        </div>
 
        <motion.a
          href="/register"
          className={styles.ctaButton}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
          variants={ctaVariants}
        >
          <span className={styles.ctaButtonLabel}>
            Start Your Free Trial Now
          </span>
          <ArrowRight
            size={18}
            strokeWidth={2.5}
            className={styles.ctaButtonIcon}
          />
        </motion.a>
      </div>
    </section>
  );
}
 