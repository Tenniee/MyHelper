"use client";
 
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, BadgeCheck, CreditCard, CalendarX } from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import styles from "../components/AuthForm.module.css";
 
const fieldVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut", delay },
  }),
};
 
const TRUST_BADGES = [
  { icon: BadgeCheck, label: "14-day free trial" },
  { icon: CreditCard, label: "No credit card required" },
  { icon: CalendarX, label: "Cancel anytime" },
];
 
export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
 
  return (
    <AuthLayout>
      <div className={styles.cardPlain}>
        <motion.h1
          className={styles.heading}
          initial="hidden"
          animate="visible"
          variants={fieldVariants}
          custom={0}
        >
          Create your account
        </motion.h1>
        <motion.p
          className={styles.subheading}
          initial="hidden"
          animate="visible"
          variants={fieldVariants}
          custom={0.05}
        >
          Start your 14-day free trial
        </motion.p>
 
        <form className={styles.form}>
          <motion.div
            className={styles.field}
            initial="hidden"
            animate="visible"
            variants={fieldVariants}
            custom={0.12}
          >
            <label className={styles.label} htmlFor="fullName">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Jane Doe"
              className={styles.inputFilled}
            />
          </motion.div>
 
          <motion.div
            className={styles.field}
            initial="hidden"
            animate="visible"
            variants={fieldVariants}
            custom={0.18}
          >
            <label className={styles.label} htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="jane@example.com"
              className={styles.inputFilled}
            />
          </motion.div>
 
          <motion.div
            className={styles.field}
            initial="hidden"
            animate="visible"
            variants={fieldVariants}
            custom={0.24}
          >
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <div className={styles.passwordWrap}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={styles.inputFilled}
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </motion.div>
 
          <motion.button
            type="submit"
            className={styles.submitButton}
            initial="hidden"
            animate="visible"
            variants={fieldVariants}
            custom={0.32}
          >
            Create Account
          </motion.button>
        </form>
 
        <motion.div
          className={styles.divider}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        />
 
        <motion.div
          className={styles.trustRow}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
          }}
        >
          {TRUST_BADGES.map(({ icon: Icon, label }) => (
            <motion.div
              key={label}
              className={styles.trustItem}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
              }}
            >
              <Icon size={20} color="#FF6B00" strokeWidth={1.75} />
              <span>{label}</span>
            </motion.div>
          ))}
        </motion.div>
 
        <motion.p
          className={styles.switchAuth}
          initial="hidden"
          animate="visible"
          variants={fieldVariants}
          custom={0.65}
        >
          Already have an account?{" "}
          <Link href="/login" className={styles.switchAuthLink}>
            Sign in
          </Link>
        </motion.p>
      </div>
    </AuthLayout>
  );
}
 