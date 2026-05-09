/**
 * @file page.tsx
 * @brief Security settings page with password validation and field clearing.
 */

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

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
    <div className="relative flex flex-col gap-10 w-full pb-10 z-10 max-w-[1000px] mx-auto">
      <div className="flex flex-col gap-2">
        <h2 className="text-[32px] md:text-[40px] font-bold tracking-[1px] text-text-main dark:text-text-primary font-serif drop-shadow-md">
          Security Settings
        </h2>
        <p className="text-[15px] font-medium tracking-[-0.5px] text-text-muted dark:text-text-primary/50">Manage your password and active sessions.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <h3 className="text-[18px] font-bold tracking-[1px] text-text-main/90 dark:text-text-primary/90 pl-1 font-serif">Change Password</h3>
          <div className="relative rounded-[36px] p-[1px] bg-gradient-to-br from-brand-orange via-brand-orange/10 dark:via-[#FFDEBA]/10 to-transparent shadow-sm dark:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
            <div className="flex flex-col rounded-[36px] bg-white/60 dark:bg-[linear-gradient(135deg,rgba(50,45,50,0.5),rgba(30,26,30,0.4))] backdrop-blur-[20px] p-8 h-full border border-black/5 dark:border-transparent">
              <form onSubmit={handlePasswordChange} className="flex flex-col gap-5">
                
                <SecurityInput 
                  label="Current Password" 
                  type="password" 
                  placeholder="Enter current password" 
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center pr-2">
                    <label className="text-[13px] font-medium text-text-muted dark:text-text-primary/60 pl-2">New Password</label>
                    {!isLengthValid && (
                      <span className="text-[10px] font-bold text-red-500 dark:text-red-400 uppercase tracking-wider animate-pulse">Too short (Min 8)</span>
                    )}
                  </div>
                  <input 
                    type="password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    className={`w-full rounded-[16px] border border-black/5 dark:border-transparent px-5 py-3.5 text-[15px] text-text-main dark:text-text-primary outline-none transition-all placeholder:text-text-muted/50 dark:placeholder:text-text-primary/30 focus:ring-2 bg-black/5 dark:bg-[rgba(45,40,45,0.4)] backdrop-blur-[5px] ${
                      !isLengthValid 
                        ? 'focus:ring-red-500/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] dark:shadow-[2px_2px_1px_#EF4444]' 
                        : 'focus:ring-brand-orange/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] dark:shadow-[2px_2px_1px_#EC5800]'
                    }`}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center pr-2">
                    <label className="text-[13px] font-medium text-text-muted dark:text-text-primary/60 pl-2">Confirm New Password</label>
                    {confirmPassword.length > 0 && !passwordsMatch && (
                      <span className="text-[10px] font-bold text-red-500 dark:text-red-400 uppercase tracking-wider animate-pulse">Mismatch</span>
                    )}
                  </div>
                  <input 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat your password"
                    className={`w-full rounded-[16px] border border-black/5 dark:border-transparent px-5 py-3.5 text-[15px] text-text-main dark:text-text-primary outline-none transition-all placeholder:text-text-muted/50 dark:placeholder:text-text-primary/30 focus:ring-2 bg-black/5 dark:bg-[rgba(45,40,45,0.4)] backdrop-blur-[5px] ${
                      !passwordsMatch && confirmPassword.length > 0 
                        ? 'focus:ring-red-500/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] dark:shadow-[2px_2px_1px_#EF4444]' 
                        : 'focus:ring-brand-orange/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] dark:shadow-[2px_2px_1px_#EC5800]'
                    }`}
                  />
                </div>
                
                <div className="mt-4 flex justify-end pt-5 border-t border-black/5 dark:border-[#FFDEBA]/5">
                  <button 
                    disabled={!canSubmit || isSaved}
                    className={`relative flex items-center justify-center rounded-[16px] w-[180px] h-[48px] text-[14px] font-bold transition-all duration-300 ${
                      isSaved ? 'bg-green-500 text-white shadow-[0_5px_15px_rgba(34,197,94,0.3)] dark:shadow-[0_0_20px_rgba(34,197,94,0.4)]' : 
                      canSubmit ? 'bg-brand-orange text-white shadow-[0_5px_15px_rgba(236,88,0,0.2)] dark:shadow-[2px_2px_1px_rgba(30,26,30,0.8)] hover:-translate-y-[2px] hover:shadow-xl' : 
                      'bg-black/5 dark:bg-bg-elevated text-text-main/30 dark:text-text-primary/20 cursor-not-allowed opacity-50 shadow-inner dark:shadow-none'
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {isSaving ? (
                        <motion.div key="saving" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-1.5"><span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" /><span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} /><span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} /></motion.div>
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

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="text-[18px] font-bold tracking-[1px] text-text-main/90 dark:text-text-primary/90 pl-1 font-serif">Extra Protection</h3>
            <div className="relative rounded-[32px] p-[1px] bg-gradient-to-br from-brand-orange/30 via-brand-orange/5 dark:via-[#FFDEBA]/5 to-transparent shadow-sm dark:shadow-none">
              <div onClick={() => setTwoFactor(!twoFactor)} className="group flex items-center justify-between p-6 rounded-[32px] bg-white/50 dark:bg-[rgba(50,45,50,0.4)] backdrop-blur-[20px] cursor-pointer hover:bg-white/80 dark:hover:bg-[rgba(70,59,70,0.2)] border border-black/5 dark:border-transparent transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-orange/10 text-brand-orange border border-brand-orange/20 shadow-sm dark:shadow-none">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[16px] font-bold text-text-main dark:text-text-primary">Two-Factor Authentication</span>
                    <span className="text-[13px] text-text-muted dark:text-text-primary/40">Adds an extra layer of security</span>
                  </div>
                </div>
                <button className={`flex h-[28px] w-[50px] items-center rounded-full p-1 transition-colors shadow-inner dark:shadow-none ${twoFactor ? 'bg-brand-orange' : 'bg-black/10 dark:bg-bg-elevated'}`}>
                  <motion.div layout className="h-[20px] w-[20px] rounded-full bg-white dark:bg-[#FFDEBA] shadow-sm" animate={{ x: twoFactor ? 22 : 0 }} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-[18px] font-bold tracking-[1px] text-text-main/90 dark:text-text-primary/90 pl-1 font-serif">Active Sessions</h3>
            <div className="flex flex-col gap-3">
              <SessionCard device="MacBook Pro" location="Kyiv, Ukraine" status="Current Session" active />
              <SessionCard device="iPhone 15 Pro" location="Kyiv, Ukraine" status="Active 2h ago" />
              <button className="text-[13px] font-bold text-red-500/80 dark:text-red-400/60 hover:text-red-600 dark:hover:text-red-400 transition-colors py-2 text-left pl-2">Terminate all other sessions</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SecurityInput({ label, type, placeholder, value, onChange }: { label: string; type: string; placeholder: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[13px] font-medium text-text-muted dark:text-text-primary/60 pl-2">{label}</label>
      <input 
        type={type} 
        placeholder={placeholder} 
        value={value}
        onChange={onChange}
        className="w-full rounded-[16px] border border-black/5 dark:border-transparent px-5 py-3.5 text-[15px] text-text-main dark:text-text-primary outline-none transition-all placeholder:text-text-muted/50 dark:placeholder:text-text-primary/30 focus:ring-2 focus:ring-brand-orange/50 bg-black/5 dark:bg-[rgba(45,40,45,0.4)] backdrop-blur-[5px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] dark:shadow-[2px_2px_1px_#EC5800]" 
      />
    </div>
  );
}

function SessionCard({ device, location, status, active }: { device: string; location: string; status: string; active?: boolean }) {
  return (
    <div className="flex items-center justify-between p-5 rounded-[24px] bg-white/60 dark:bg-[rgba(30,26,30,0.4)] border border-black/5 dark:border-[#FFDEBA]/5 backdrop-blur-[10px] shadow-sm dark:shadow-none hover:bg-white/80 dark:hover:bg-[rgba(45,40,45,0.3)] transition-colors">
      <div className="flex items-center gap-4">
        <div className={`h-10 w-10 rounded-full flex items-center justify-center shadow-inner dark:shadow-none ${active ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-black/5 dark:bg-[#FFDEBA]/5 text-text-muted/70 dark:text-[#FFDEBA]/30'}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><rect width="16" height="11" x="4" y="9" rx="2"/><path d="M9 15v.01"/><path d="M15 15v.01"/><path d="M8 9V5a4 4 0 0 1 8 0v4"/></svg>
        </div>
        <div className="flex flex-col">
          <span className="text-[15px] font-bold text-text-main dark:text-[#FFDEBA]">{device}</span>
          <span className="text-[12px] font-medium text-text-muted dark:text-[#FFDEBA]/40">{location}</span>
        </div>
      </div>
      <span className={`text-[11px] font-bold uppercase tracking-wider ${active ? 'text-green-600 dark:text-green-400' : 'text-text-muted/60 dark:text-[#FFDEBA]/30'}`}>{status}</span>
    </div>
  );
}