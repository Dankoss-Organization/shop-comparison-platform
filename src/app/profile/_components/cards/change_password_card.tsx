"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import ProfileGlassCard from "@/app/profile/_components/ui/profile_glass_card";
import ProfileInput from "@/app/profile/_components/ui/profile_input";

export default function ChangePasswordCard() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => setIsMounted(true), []);

  const isLengthValid = newPassword.length >= 8 || newPassword.length === 0;
  const passwordsMatch = newPassword === confirmPassword;
  const canSubmit = currentPassword.length > 0 && newPassword.length >= 8 && passwordsMatch && !isSaving;

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setIsSaved(false), 3000);
    }, 1000);
  };

  if (!isMounted) return null;

  return (
    <ProfileGlassCard variant="gradient" glow className="p-5 sm:p-6 md:p-8 h-full">
      <form onSubmit={handlePasswordChange} className="relative z-10 flex flex-col gap-4 sm:gap-5">
        
        <ProfileInput
          label="Current Password"
          type="password"
          placeholder="Enter current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        <ProfileInput
          label="New Password"
          type="password"
          placeholder="Min. 8 characters"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          error={!isLengthValid}
          errorText="Too short (Min 8)"
        />

        <ProfileInput
          label="Confirm New Password"
          type="password"
          placeholder="Repeat your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={confirmPassword.length > 0 && !passwordsMatch}
          errorText="Mismatch"
        />

        <div className="mt-2 sm:mt-4 flex justify-end pt-4 sm:pt-5 border-t border-text-main/5 dark:border-text-primary/5">
          <button
            disabled={!canSubmit || isSaved}
            className={`relative flex items-center justify-center rounded-[14px] sm:rounded-[16px] w-full sm:w-[180px] h-[48px] text-[13px] sm:text-[14px] font-bold transition-all duration-300 ${
              isSaved
                ? "bg-green-500 text-white shadow-[0_5px_15px_rgba(34,197,94,0.3)] dark:shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                : canSubmit
                ? "bg-brand-orange text-white shadow-[0_5px_15px_rgb(var(--brand-orange)/0.2)] dark:shadow-[0_10px_16px_rgb(var(--brand-orange)/0.18)] hover:-translate-y-[2px] hover:brightness-110"
                : "bg-black/5 dark:bg-bg-elevated text-text-main/30 dark:text-text-primary/20 cursor-not-allowed opacity-50 shadow-inner dark:shadow-none"
            }`}
          >
            <AnimatePresence mode="wait">
              {isSaving ? (
                <motion.div key="saving" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-1.5">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                </motion.div>
              ) : isSaved ? (
                <motion.div key="saved" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center gap-2">✓ Updated</motion.div>
              ) : (
                <motion.span key="default" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Update Password</motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </form>
    </ProfileGlassCard>
  );
}