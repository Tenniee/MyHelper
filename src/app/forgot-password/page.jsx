"use client";
 
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight, ArrowLeft, Check } from "lucide-react";
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
 
// Little celebratory burst around the success checkmark — purely for fun.
const BURST_DOTS = Array.from({ length: 8 }, (_, i) => i);
const RESEND_COOLDOWN = 30;
 
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [cooldown, setCooldown] = useState(0);
 
  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => setCooldown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(id);
  }, [cooldown]);
 
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setCooldown(RESEND_COOLDOWN);
  }
 
  function handleResend() {
    if (cooldown > 0) return;
    setCooldown(RESEND_COOLDOWN);
  }
 
  return (
    <AuthLayout>
      <div className={styles.cardPlain}>
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.25 } }}
              transition={{ duration: 0.35 }}
            >
              <motion.h1
                className={styles.heading}
                initial="hidden"
                animate="visible"
                variants={fieldVariants}
                custom={0}
              >
                Forgot your password?
              </motion.h1>
              <motion.p
                className={styles.subheading}
                initial="hidden"
                animate="visible"
                variants={fieldVariants}
                custom={0.05}
              >
                No worries — we&rsquo;ll send you reset instructions.
              </motion.p>
 
              <form className={styles.form} onSubmit={handleSubmit}>
                <motion.div
                  className={styles.field}
                  initial="hidden"
                  animate="visible"
                  variants={fieldVariants}
                  custom={0.12}
                >
                  <label className={styles.label} htmlFor="email">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className={styles.inputFilled}
                  />
                </motion.div>
 
                <motion.button
                  type="submit"
                  className={styles.submitButton}
                  initial="hidden"
                  animate="visible"
                  variants={fieldVariants}
                  custom={0.2}
                >
                  Send Reset Link
                  <ArrowRight size={18} strokeWidth={2.5} />
                </motion.button>
              </form>
 
              <motion.div
                className={styles.helpRow}
                initial="hidden"
                animate="visible"
                variants={fieldVariants}
                custom={0.28}
              >
                <Link href="/login" className={styles.helpLink}>
                  <ArrowLeft size={16} strokeWidth={2} />
                  Back to login
                </Link>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              className={styles.successPanel}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.checkCircleWrap}>
                {BURST_DOTS.map((i) => {
                  const angle = (i / BURST_DOTS.length) * 360;
                  return (
                    <motion.span
                      key={i}
                      className={styles.burstDot}
                      style={{ "--angle": `${angle}deg` }}
                      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                      animate={{
                        opacity: [1, 0],
                        scale: [1, 1],
                        x: Math.cos((angle * Math.PI) / 180) * 46,
                        y: Math.sin((angle * Math.PI) / 180) * 46,
                      }}
                      transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                    />
                  );
                })}
 
                <motion.span
                  className={styles.checkCircle}
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 12 }}
                >
                  <Mail size={26} color="#ffffff" strokeWidth={2} />
                </motion.span>
              </div>
 
              <motion.h1
                className={styles.heading}
                style={{ textAlign: "center" }}
                initial="hidden"
                animate="visible"
                variants={fieldVariants}
                custom={0.3}
              >
                Check your email
              </motion.h1>
              <motion.p
                className={styles.subheading}
                style={{ textAlign: "center" }}
                initial="hidden"
                animate="visible"
                variants={fieldVariants}
                custom={0.36}
              >
                We sent a password reset link to
                <br />
                <strong className={styles.emailHighlight}>{email}</strong>
              </motion.p>
 
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fieldVariants}
                custom={0.42}
                className={styles.resendRow}
              >
                {cooldown > 0 ? (
                  <span className={styles.resendDisabled}>
                    Resend email in {cooldown}s
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    className={styles.resendButton}
                  >
                    Didn&rsquo;t get it? Resend email
                  </button>
                )}
              </motion.div>
 
              <motion.div
                className={styles.helpRow}
                initial="hidden"
                animate="visible"
                variants={fieldVariants}
                custom={0.48}
              >
                <Link href="/login" className={styles.helpLink}>
                  <ArrowLeft size={16} strokeWidth={2} />
                  Back to login
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AuthLayout>
  );
}
 