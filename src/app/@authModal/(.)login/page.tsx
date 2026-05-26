"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import AuthForm from "@/Components/Auth/auth_form";

export default function AuthModalPage() {
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      router.back();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.back();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-md p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[900px] shadow-[0_24px_60px_rgba(0,0,0,0.4)] rounded-[2rem] overflow-hidden"
      >
        <button
          onClick={() => router.back()}
          className="absolute right-6 top-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-bg-elevated/40 backdrop-blur-md text-text-primary border border-glass/10 transition-all hover:bg-bg-highest hover:text-text-main"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </button>

        <AuthForm isModal={true} />
      </motion.div>
    </div>
  );
}