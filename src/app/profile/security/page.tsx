/**
 * @file page.tsx
 * @brief Security settings page with password validation and field clearing.
 */

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const cardClassName =
  "relative overflow-hidden rounded-[24px] sm:rounded-[36px] bg-gradient-to-b from-bg-surface to-bg-deepest dark:from-bg-surface dark:to-bg-deep border border-text-main/5 dark:border-white/5 shadow-lg dark:shadow-[0px_-3px_8px_rgb(var(--brand-orange)/0.20),0_24px_40px_rgba(0,0,0,0.4)] transition-colors duration-300 backdrop-blur-[20px]";

const glowLayerClassName =
  "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_90%,rgb(var(--brand-orange)/0.08),transparent_30%)] dark:bg-[radial-gradient(circle_at_8%_90%,rgb(var(--brand-orange)/0.35),transparent_28%),radial-gradient(circle_at_92%_10%,rgb(var(--brand-orange)/0.2),transparent_24%)]";

const inputBaseClassName =
  "w-full rounded-[14px] sm:rounded-[16px] border border-text-main/5 dark:border-transparent px-4 sm:px-5 py-3 sm:py-3.5 text-[14px] sm:text-[15px] text-text-main dark:text-text-primary outline-none transition-all placeholder:text-text-muted/50 dark:placeholder:text-text-primary/30 focus:ring-2 bg-black/5 dark:bg-[rgba(54,46,54,0.6)] backdrop-blur-[5px]";

export default function SecurityPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);

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
    <div className="relative flex flex-col gap-8 sm:gap-10 w-full pb-10 z-10 max-w-[1000px] mx-auto">
      <div className="flex flex-col gap-1.5 sm:gap-2">
        <h2 className="text-[28px] sm:text-[32px] md:text-[40px] font-bold tracking-[1px] text-text-main dark:text-text-primary font-serif drop-shadow-md leading-tight">
          Security Settings
        </h2>
        <p className="text-[14px] sm:text-[15px] font-medium tracking-[-0.5px] text-text-muted dark:text-text-primary/50">
          Manage your password and active sessions.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">

        <div className="flex flex-col gap-3 sm:gap-4">
          <h3 className="text-[16px] sm:text-[18px] font-bold tracking-[1px] text-text-main/90 dark:text-text-primary/90 pl-1 font-serif">
            Change Password
          </h3>

          <div className="relative rounded-[25px] sm:rounded-[37px] p-[1px] bg-gradient-to-br from-brand-orange/50 via-brand-orange/10 to-transparent shadow-xl dark:shadow-2xl">
            <div className={`${cardClassName} p-5 sm:p-6 md:p-8 h-full`}>
              <div className={glowLayerClassName} />

              <form onSubmit={handlePasswordChange} className="relative z-10 flex flex-col gap-4 sm:gap-5">

                <SecurityInput
                  label="Current Password"
                  type="password"
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  shadowClass="shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] dark:shadow-[2px_2px_1px_rgb(var(--brand-orange))]"
                />

                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <div className="flex justify-between items-center pr-2">
                    <label className="text-[12px] sm:text-[13px] font-medium text-text-muted dark:text-text-primary/60 pl-1 sm:pl-2">
                      New Password
                    </label>
                    {!isLengthValid && (
                      <span className="text-[9px] sm:text-[10px] font-bold text-red-500 dark:text-red-400 uppercase tracking-wider animate-pulse">
                        Too short (Min 8)
                      </span>
                    )}
                  </div>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    className={`${inputBaseClassName} focus:ring-2 ${
                      !isLengthValid
                        ? "focus:ring-red-500/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] dark:shadow-[2px_2px_1px_rgb(var(--semantic-danger))]"
                        : "focus:ring-brand-orange/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] dark:shadow-[2px_2px_1px_rgb(var(--brand-orange))]"
                    }`}
                  />
                </div>

                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <div className="flex justify-between items-center pr-2">
                    <label className="text-[12px] sm:text-[13px] font-medium text-text-muted dark:text-text-primary/60 pl-1 sm:pl-2">
                      Confirm New Password
                    </label>
                    {confirmPassword.length > 0 && !passwordsMatch && (
                      <span className="text-[9px] sm:text-[10px] font-bold text-red-500 dark:text-red-400 uppercase tracking-wider animate-pulse">
                        Mismatch
                      </span>
                    )}
                  </div>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat your password"
                    className={`${inputBaseClassName} focus:ring-2 ${
                      !passwordsMatch && confirmPassword.length > 0
                        ? "focus:ring-red-500/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] dark:shadow-[2px_2px_1px_rgb(var(--semantic-danger))]"
                        : "focus:ring-brand-orange/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] dark:shadow-[2px_2px_1px_rgb(var(--brand-orange))]"
                    }`}
                  />
                </div>

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
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 sm:gap-8">

          <div className="flex flex-col gap-3 sm:gap-4">
            <h3 className="text-[16px] sm:text-[18px] font-bold tracking-[1px] text-text-main/90 dark:text-text-primary/90 pl-1 font-serif">
              Extra Protection
            </h3>
            <div className="relative rounded-[25px] sm:rounded-[33px] p-[1px] bg-gradient-to-br from-brand-orange/40 via-brand-orange/10 to-transparent">
              <div
                onClick={() => setTwoFactor(!twoFactor)}
                className="group relative overflow-hidden flex items-center justify-between p-5 sm:p-6 rounded-[24px] sm:rounded-[32px] bg-gradient-to-b from-bg-surface to-bg-deepest dark:from-bg-surface dark:to-bg-deep backdrop-blur-[20px] cursor-pointer border border-text-main/5 dark:border-white/5 transition-colors hover:brightness-105"
              >
                <div className={glowLayerClassName} />
                <div className="relative z-10 flex items-center gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-brand-orange/10 text-brand-orange border border-brand-orange/20 shadow-sm shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 sm:w-6 sm:h-6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] sm:text-[16px] font-bold text-text-main dark:text-text-primary">Two-Factor Auth</span>
                    <span className="text-[11px] sm:text-[13px] text-text-muted dark:text-text-primary/40 leading-tight">Adds an extra layer of security</span>
                  </div>
                </div>
                <button className={`relative z-10 flex h-[24px] w-[44px] sm:h-[28px] sm:w-[50px] items-center rounded-full p-1 transition-colors shadow-inner dark:shadow-none shrink-0 ${twoFactor ? "bg-brand-orange" : "bg-black/10 dark:bg-bg-elevated"}`}>
                  <motion.div
                    layout
                    className="h-[16px] w-[16px] sm:h-[20px] sm:w-[20px] rounded-full bg-white dark:bg-text-primary shadow-sm"
                    animate={{ x: twoFactor ? (typeof window !== "undefined" && window.innerWidth < 640 ? 20 : 22) : 0 }}
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:gap-4">
            <h3 className="text-[16px] sm:text-[18px] font-bold tracking-[1px] text-text-main/90 dark:text-text-primary/90 pl-1 font-serif">
              Active Sessions
            </h3>
            <div className="flex flex-col gap-2 sm:gap-3">
              <SessionCard device="MacBook Pro" location="Kyiv, Ukraine" status="Current Session" active />
              <SessionCard device="iPhone 15 Pro" location="Kyiv, Ukraine" status="Active 2h ago" />
              <button className="text-[12px] sm:text-[13px] font-bold text-red-500/80 dark:text-red-400/60 hover:text-red-600 dark:hover:text-red-400 transition-colors py-2 text-left pl-2">
                Terminate all other sessions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SecurityInput({
  label, type, placeholder, value, onChange, shadowClass,
}: {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  shadowClass?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5 sm:gap-2">
      <label className="text-[12px] sm:text-[13px] font-medium text-text-muted dark:text-text-primary/60 pl-1 sm:pl-2">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full rounded-[14px] sm:rounded-[16px] border border-text-main/5 dark:border-transparent px-4 sm:px-5 py-3 sm:py-3.5 text-[14px] sm:text-[15px] text-text-main dark:text-text-primary outline-none transition-all placeholder:text-text-muted/50 dark:placeholder:text-text-primary/30 focus:ring-2 focus:ring-brand-orange/50 bg-black/5 dark:bg-[rgba(54,46,54,0.6)] backdrop-blur-[5px] ${shadowClass ?? "shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] dark:shadow-[2px_2px_1px_rgb(var(--brand-orange))]"}`}
      />
    </div>
  );
}

function SessionCard({ device, location, status, active }: { device: string; location: string; status: string; active?: boolean }) {
  return (
    <div className="flex items-center justify-between p-4 sm:p-5 rounded-[20px] sm:rounded-[24px] bg-gradient-to-b from-bg-surface to-bg-deepest dark:from-bg-surface dark:to-bg-deep border border-text-main/5 dark:border-text-primary/5 backdrop-blur-[10px] shadow-sm hover:brightness-105 transition-all gap-2">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className={`h-8 w-8 sm:h-10 sm:w-10 shrink-0 rounded-full flex items-center justify-center ${active ? "bg-green-500/10 text-green-600 dark:text-green-400" : "bg-black/5 dark:bg-text-primary/5 text-text-muted/70 dark:text-text-primary/30"}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 sm:w-5 sm:h-5"><rect width="16" height="11" x="4" y="9" rx="2"/><path d="M9 15v.01"/><path d="M15 15v.01"/><path d="M8 9V5a4 4 0 0 1 8 0v4"/></svg>
        </div>
        <div className="flex flex-col">
          <span className="text-[13px] sm:text-[15px] font-bold text-text-main dark:text-text-primary leading-tight">{device}</span>
          <span className="text-[11px] sm:text-[12px] font-medium text-text-muted dark:text-text-primary/40">{location}</span>
        </div>
      </div>
      <span className={`text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-right ${active ? "text-green-600 dark:text-green-400" : "text-text-muted/60 dark:text-text-primary/30"}`}>
        {status}
      </span>
    </div>
  );
}