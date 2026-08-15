"use client";
 
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, HelpCircle } from "lucide-react";
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
 
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
 
  return (
    <AuthLayout footerNote={<>Powered by <strong>SendBaba</strong></>}>
      <motion.div
        className={styles.card}
        initial="hidden"
        animate="visible"
        variants={fieldVariants}
        custom={0}
      >
        <motion.h1 className={styles.heading} variants={fieldVariants} custom={0.05}>
          Welcome Back
        </motion.h1>
        <motion.p className={styles.subheading} variants={fieldVariants} custom={0.1}>
          Sign in to access your support portal
        </motion.p>
 
        <form className={styles.form}>
          <motion.div className={styles.field} variants={fieldVariants} custom={0.15}>
            <label className={styles.label} htmlFor="identifier">
              Email or Organization ID
            </label>
            <input
              id="identifier"
              type="text"
              placeholder="e.g. name@company.com"
              className={styles.input}
            />
            <span className={styles.hint}>
              Use your SendBaba account credentials
            </span>
          </motion.div>
 
          <motion.div className={styles.field} variants={fieldVariants} custom={0.2}>
            <div className={styles.labelRow}>
              <label className={styles.label} htmlFor="password">
                Password
              </label>
              <Link href="/forgot-password" className={styles.forgotLink}>
                Forgot password?
              </Link>
            </div>
            <div className={styles.passwordWrap}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={styles.input}
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
            variants={fieldVariants}
            custom={0.28}
          >
            Sign In
            <ArrowRight size={18} strokeWidth={2.5} />
          </motion.button>
        </form>
 
        <motion.div
          className={styles.helpRow}
          variants={fieldVariants}
          custom={0.34}
        >
          <Link href="#" className={styles.helpLink}>
            <HelpCircle size={16} strokeWidth={2} />
            Need help logging in?
          </Link>
        </motion.div>
 
        <motion.p
          className={styles.switchAuth}
          style={{ marginTop: 16 }}
          variants={fieldVariants}
          custom={0.4}
        >
          Don't have an account?{" "}
          <Link href="/register" className={styles.switchAuthLink}>
            Sign up
          </Link>
        </motion.p>
      </motion.div>
    </AuthLayout>
  );
}
 