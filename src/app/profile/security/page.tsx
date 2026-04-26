/**
 * @file page.tsx
 * @brief Security settings page with password forms and session management.
 */

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function SecurityPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }, 1000);
  };

  if (!isMounted) return null;

  return (
    <div className="relative flex flex-col gap-10 w-full pb-10 z-10">
      
      <div className="flex flex-col gap-2 relative">
        <h2 className="text-[32px] md:text-[40px] font-bold tracking-[1px] text-[#FFDEBA] leading-none font-serif cursor-default select-none drop-shadow-md">
          Security Settings
        </h2>
        <p className="text-[15px] text-[#FFDEBA]/50 tracking-wide cursor-default select-none">
          Keep your account secure by managing your password and active sessions.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        <div className="flex flex-col gap-4">
          <h3 className="text-[18px] font-bold tracking-[1px] text-[#FFDEBA]/90 pl-1 font-serif">Change Password</h3>
          <div className="relative rounded-[36px] p-[1px] bg-gradient-to-br from-[#EC5800] via-[#FFDEBA]/10 to-transparent shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
            <div className="flex flex-col rounded-[36px] bg-[linear-gradient(135deg,rgba(50,45,50,0.5),rgba(30,26,30,0.4))] backdrop-blur-[20px] p-8 h-full">
              <form onSubmit={handlePasswordChange} className="flex flex-col gap-5">
                <SecurityInput label="Current Password" type="password" placeholder="••••••••" />
                <SecurityInput label="New Password" type="password" placeholder="Enter new password" />
                <SecurityInput label="Confirm New Password" type="password" placeholder="Confirm new password" />
                
                <div className="mt-4 flex justify-end pt-5 border-t border-[#FFDEBA]/5">
                  <button 
                    disabled={isSaving || isSaved}
                    className={`relative flex items-center justify-center rounded-[16px] w-[180px] h-[48px] text-[14px] font-bold text-white transition-all duration-300 ${
                      isSaved ? 'bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.4)]' : 'bg-[#EC5800] shadow-[2px_2px_1px_rgba(30,26,30,0.8)] hover:-translate-y-1 hover:shadow-xl'
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
            <h3 className="text-[18px] font-bold tracking-[1px] text-[#FFDEBA]/90 pl-1 font-serif">Extra Protection</h3>
            <div className="relative rounded-[32px] p-[1px] bg-gradient-to-br from-[#EC5800]/30 via-[#FFDEBA]/5 to-transparent">
              <div onClick={() => setTwoFactor(!twoFactor)} className="group flex items-center justify-between p-6 rounded-[32px] bg-[rgba(50,45,50,0.4)] backdrop-blur-[20px] cursor-pointer hover:bg-[rgba(70,59,70,0.2)] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EC5800]/10 text-[#EC5800] border border-[#EC5800]/20">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[16px] font-bold text-[#FFDEBA]">Two-Factor Authentication</span>
                    <span className="text-[13px] text-[#FFDEBA]/40">Adds an extra layer of security</span>
                  </div>
                </div>
                <button className={`flex h-[28px] w-[50px] items-center rounded-full p-1 transition-colors ${twoFactor ? 'bg-[#EC5800]' : 'bg-[#3F363F]'}`}>
                  <motion.div layout className="h-[20px] w-[20px] rounded-full bg-white shadow-md" animate={{ x: twoFactor ? 22 : 0 }} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-[18px] font-bold tracking-[1px] text-[#FFDEBA]/90 pl-1 font-serif">Active Sessions</h3>
            <div className="flex flex-col gap-3">
              <SessionCard device="MacBook Pro" location="Kyiv, Ukraine" status="Current Session" active />
              <SessionCard device="iPhone 15 Pro" location="Kyiv, Ukraine" status="Active 2h ago" />
              <button className="text-[13px] font-bold text-red-400/60 hover:text-red-400 transition-colors py-2">Terminate all other sessions</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function SecurityInput({ label, type, placeholder }: { label: string; type: string; placeholder: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[13px] font-medium text-[#FFDEBA]/60 pl-2">{label}</label>
      <input 
        type={type} 
        placeholder={placeholder}
        className="w-full rounded-[16px] border-none px-5 py-3.5 text-[15px] text-[#FFDEBA] outline-none transition-all placeholder:text-[#FFDEBA]/30 focus:ring-2 focus:ring-[#EC5800]/50"
        style={{
          background: "rgba(45, 40, 45, 0.4)",
          boxShadow: "2px 2px 1px #EC5800",
          backdropFilter: "blur(5px)",
        }}
      />
    </div>
  );
}

function SessionCard({ device, location, status, active }: { device: string; location: string; status: string; active?: boolean }) {
  return (
    <div className="flex items-center justify-between p-5 rounded-3xl bg-[rgba(30,26,30,0.4)] border border-[#FFDEBA]/5">
      <div className="flex items-center gap-4">
        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${active ? 'bg-green-500/10 text-green-400' : 'bg-[#FFDEBA]/5 text-[#FFDEBA]/30'}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><rect width="16" height="11" x="4" y="9" rx="2"/><path d="M9 15v.01"/><path d="M15 15v.01"/><path d="M8 9V5a4 4 0 0 1 8 0v4"/></svg>
        </div>
        <div className="flex flex-col">
          <span className="text-[15px] font-bold text-[#FFDEBA]">{device}</span>
          <span className="text-[12px] text-[#FFDEBA]/40">{location}</span>
        </div>
      </div>
      <span className={`text-[11px] font-bold uppercase tracking-wider ${active ? 'text-green-400' : 'text-[#FFDEBA]/30'}`}>{status}</span>
    </div>
  );
}