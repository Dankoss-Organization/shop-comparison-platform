"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/Lib/utils";
import { signIn, signUp } from "@/Lib/auth/auth_client";



interface AuthFormProps {
  isModal?: boolean;
}

export default function AuthForm({ isModal = false }: AuthFormProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const getPasswordStrength = (pass: string) => {
    let strength = 0;
    if (pass.length > 5) strength += 1;
    if (pass.length > 7) strength += 1;
    if (/[A-Z]/.test(pass)) strength += 1;
    if (/[0-9]/.test(pass) || /[^A-Za-z0-9]/.test(pass)) strength += 1;
    return strength;
  };

  const strengthScore = getPasswordStrength(password);
  
  const strengthLabels = ["Very Weak", "Weak", "Fair", "Strong", "Ironclad"];
  const strengthColors = [
    "bg-text-main/10 dark:bg-white/10", 
    "bg-red-500/60",                
    "bg-yellow-500/80",             
    "bg-brand-orange/80",             
    "bg-brand-orange shadow-[0_0_8px_rgba(236,88,0,0.6)]" 
  ];

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return; 
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (mode === "login") {
        await signIn.email({ email, password, callbackURL: "/" });
      } else {
        await signUp.email({ email, password, name, callbackURL: "/" });
      }
    } catch (err) {
      console.error("Auth error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn(
      "flex w-full bg-bg-surface overflow-hidden text-text-main antialiased",
      isModal ? "h-[600px] max-w-[900px] rounded-[2rem]" : "min-h-screen"
    )}>
      
      <div className="relative hidden w-1/2 bg-bg-deepest p-8 md:flex flex-col justify-between overflow-hidden border-r border-glass/10">
        <div className="absolute inset-0 pointer-events-none bg-[url('/map-placeholder.jpg')] bg-cover bg-center opacity-20 blur-md scale-105" />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/10 via-transparent to-bg-deepest/80 z-0" />

        <div className="relative z-10">
          <span className="text-xl font-black tracking-wider text-brand-orange">DANKOSS</span>
        </div>

        <div className="relative z-10 rounded-2xl border border-glass/10 bg-bg-surface/5 backdrop-blur-xl p-5 shadow-xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-text-primary/50">Smart Basket Active</p>
          <h4 className="mt-2 text-2xl font-bold font-serif">You're unlocking:</h4>
          <div className="mt-4 space-y-2 text-sm text-text-primary/80">
            <p className="flex justify-between"><span>📉 Average discount:</span> <span className="font-bold text-brand-orange">+24%</span></p>
            <p className="flex justify-between"><span>🏪 Monitored supermarkets:</span> <span className="font-bold">Silpo, ATB, Fora...</span></p>
          </div>
        </div>

        <div className="relative z-10 text-[11px] text-text-primary/40 font-medium">
          © 2026 DANKOSS. Start saving smart.
        </div>
      </div>

      <div className="flex w-full flex-col justify-center p-8 md:w-1/2 bg-bg-surface">
        <div className="mx-auto w-full max-w-[340px]">
          
          <div className="mb-6">
            <h2 className="text-2xl font-black tracking-tight text-text-main font-serif">
              {mode === "login" ? "Welcome back" : "Start saving today"}
            </h2>
            <p className="text-xs text-text-muted mt-1.5 font-medium">
              {mode === "login" ? "Enter your details to access your dashboard" : "Create an account to track exclusive local deals"}
            </p>
          </div>

          {step === 1 && (
            <div className="grid gap-2 mb-4">
              <button type="button" className="inline-flex w-full items-center justify-center gap-3 rounded-xl border border-glass/10 bg-bg-elevated px-4 py-2.5 text-sm font-semibold text-text-primary transition-all hover:bg-bg-highest">
                <span className="text-xs">Continue with Google</span>
              </button>
            </div>
          )}

          {step === 1 && (
            <div className="relative my-5 flex items-center justify-center">
              <div className="absolute inset-0 border-t border-glass/10" />
              <span className="relative bg-bg-surface px-3 text-[10px] font-bold uppercase tracking-widest text-text-primary/40">or use email</span>
            </div>
          )}

          <form onSubmit={step === 1 ? handleNextStep : handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-4"
                >
                  {mode === "register" && (
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-text-primary/60">Full Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-glass/10 bg-bg-deep px-4 py-2.5 text-sm focus:border-brand-orange/40 focus:outline-none focus:ring-1 focus:ring-brand-orange/40 transition-all shadow-inner"
                        placeholder="John Doe"
                      />
                    </div>
                  )}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-text-primary/60">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-glass/10 bg-bg-deep px-4 py-2.5 text-sm focus:border-brand-orange/40 focus:outline-none focus:ring-1 focus:ring-brand-orange/40 transition-all shadow-inner"
                      placeholder="you@example.com"
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-5"
                >
                  <div className="group">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-text-primary/60 transition-colors group-focus-within:text-brand-orange">
                        {mode === "register" ? "Create Password" : "Password"}
                      </label>
                      {mode === "register" && password.length > 0 && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-text-primary/50 transition-all">
                          {strengthLabels[strengthScore]}
                        </span>
                      )}
                    </div>
                    
                    <div className="relative mt-1.5">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-xl border border-glass/10 bg-bg-deep px-4 py-2.5 pr-10 text-sm text-text-main shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_2px_8px_rgba(0,0,0,0.2)] focus:border-brand-orange/50 focus:bg-bg-surface focus:outline-none focus:ring-1 focus:ring-brand-orange/50 transition-all duration-300"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-primary/40 hover:text-brand-orange transition-colors focus:outline-none"
                      >
                        {showPassword ? (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
                        ) : (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                        )}
                      </button>
                    </div>

                    {mode === "register" && (
                      <div className="mt-2.5 flex h-1 w-full overflow-hidden rounded-full bg-text-main/5 dark:bg-white/5">
                        <motion.div
                          className={`h-full rounded-full transition-colors duration-500 ${strengthColors[strengthScore]}`}
                          initial={{ width: "0%" }}
                          animate={{ width: `${(strengthScore / 4) * 100}%` }}
                          transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-brand-orange py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-brand-orange/90 active:scale-[0.98] disabled:opacity-50"
            >
              {isLoading ? "Processing..." : step === 1 ? "Continue" : mode === "login" ? "Unlock Dashboard" : "Create Account"}
            </button>
          </form>

          <div className="mt-5 text-center">
            <button
              type="button"
              onClick={() => {
                setMode(prev => prev === "login" ? "register" : "login");
                setStep(1);
              }}
              className="text-xs font-semibold text-brand-orange hover:underline focus:outline-none"
            >
              {mode === "login" ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}