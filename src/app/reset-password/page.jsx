"use client";
 
import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  ShieldCheck,
} from "lucide-react";
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
 
const STRENGTH_LEVELS = [
  { label: "", color: "#e5e7eb" },
  { label: "Weak", color: "#ef4444" },
  { label: "Fair", color: "#f97316" },
  { label: "Good", color: "#eab308" },
  { label: "Strong", color: "#22c55e" },
];
 
function getStrength(password) {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[0-9]/.test(password) && /[a-zA-Z]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  return Math.min(score, 4);
}
 
const shakeVariants = {
  idle: { x: 0 },
  shake: {
    x: [0, -8, 8, -8, 8, -4, 4, 0],
    transition: { duration: 0.5 },
  },
};
 
export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
 
  const strength = useMemo(() => getStrength(password), [password]);
  const strengthInfo = STRENGTH_LEVELS[strength];
  const confirmTouched = confirmPassword.length > 0;
  const passwordsMatch = confirmTouched && password === confirmPassword;
  const passwordsMismatch = confirmTouched && password !== confirmPassword;
 
  function handleSubmit(e) {
    e.preventDefault();
    if (passwordsMismatch || strength < 2) {
      setShakeKey((k) => k + 1);
      return;
    }
    setSubmitted(true);
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
                Set a new password
              </motion.h1>
              <motion.p
                className={styles.subheading}
                initial="hidden"
                animate="visible"
                variants={fieldVariants}
                custom={0.05}
              >
                Your new password must be different from previously used
                passwords.
              </motion.p>
 
              <form className={styles.form} onSubmit={handleSubmit}>
                <motion.div
                  className={styles.field}
                  initial="hidden"
                  animate="visible"
                  variants={fieldVariants}
                  custom={0.12}
                >
                  <label className={styles.label} htmlFor="password">
                    New Password
                  </label>
                  <div className={styles.passwordWrap}>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
 
                  {/* Strength meter */}
                  <div className={styles.strengthRow}>
                    <div className={styles.strengthTrack}>
                      <motion.div
                        className={styles.strengthFill}
                        animate={{
                          width: `${(strength / 4) * 100}%`,
                          backgroundColor: strengthInfo.color,
                        }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      />
                    </div>
                    <AnimatePresence mode="wait">
                      {password && (
                        <motion.span
                          key={strengthInfo.label}
                          className={styles.strengthLabel}
                          style={{ color: strengthInfo.color }}
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          {strengthInfo.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
 
                <motion.div
                  key={shakeKey}
                  className={styles.field}
                  initial="hidden"
                  animate="visible"
                  variants={fieldVariants}
                  custom={0.18}
                >
                  <label className={styles.label} htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <motion.div
                    className={styles.passwordWrap}
                    variants={shakeVariants}
                    animate={shakeKey > 0 && passwordsMismatch ? "shake" : "idle"}
                  >
                    <input
                      id="confirmPassword"
                      type={showConfirm ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className={styles.inputFilled}
                      style={
                        passwordsMismatch
                          ? { borderColor: "#ef4444" }
                          : passwordsMatch
                          ? { borderColor: "#22c55e" }
                          : undefined
                      }
                    />
                    <button
                      type="button"
                      className={styles.eyeButton}
                      onClick={() => setShowConfirm((v) => !v)}
                      aria-label={showConfirm ? "Hide password" : "Show password"}
                    >
                      {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </motion.div>
 
                  <AnimatePresence mode="wait">
                    {confirmTouched && (
                      <motion.div
                        key={passwordsMatch ? "match" : "mismatch"}
                        className={styles.matchRow}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        {passwordsMatch ? (
                          <>
                            <Check size={14} color="#22c55e" strokeWidth={3} />
                            <span style={{ color: "#22c55e" }}>
                              Passwords match
                            </span>
                          </>
                        ) : (
                          <>
                            <X size={14} color="#ef4444" strokeWidth={3} />
                            <span style={{ color: "#ef4444" }}>
                              Passwords don&rsquo;t match
                            </span>
                          </>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
 
                <motion.button
                  type="submit"
                  className={styles.submitButton}
                  initial="hidden"
                  animate="visible"
                  variants={fieldVariants}
                  custom={0.26}
                >
                  Reset Password
                  <ArrowRight size={18} strokeWidth={2.5} />
                </motion.button>
              </form>
 
              <motion.div
                className={styles.helpRow}
                initial="hidden"
                animate="visible"
                variants={fieldVariants}
                custom={0.34}
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
              <motion.span
                className={styles.checkCircle}
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 12 }}
              >
                <ShieldCheck size={26} color="#ffffff" strokeWidth={2} />
              </motion.span>
 
              <motion.h1
                className={styles.heading}
                style={{ textAlign: "center" }}
                initial="hidden"
                animate="visible"
                variants={fieldVariants}
                custom={0.2}
              >
                Password reset!
              </motion.h1>
              <motion.p
                className={styles.subheading}
                style={{ textAlign: "center" }}
                initial="hidden"
                animate="visible"
                variants={fieldVariants}
                custom={0.26}
              >
                Your password has been changed successfully.
              </motion.p>
 
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fieldVariants}
                custom={0.34}
                style={{ width: "100%" }}
              >
                <Link href="/login" className={styles.submitButton}>
                  Continue to Login
                  <ArrowRight size={18} strokeWidth={2.5} />
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AuthLayout>
  );
}
 