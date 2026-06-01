/**
 * @file profile_header_section.tsx
 * @description A header component for the user profile, displaying user credentials, an interactive avatar with upload/resize capabilities, and a profile completion progress bar.
 */
"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useUserStore } from "@/Store/user_store";
/**
 * The main profile header section.
 * * * Features:
 * - Client-Side Image Processing: Utilizes the HTML5 Canvas API to automatically resize uploaded avatars (maintaining aspect ratio up to a maximum of 400x400 pixels) and compresses them to high-quality base64 strings before saving.
 * - State Management: Integrates directly with `useUserStore` to globally manage and persist the user's `displayName`, `email`, and `avatarUrl`.
 * - Interactive Avatar UI: Features hover overlays for the upload action, a dedicated "remove" button for custom photos, and a decorative edit badge.
 * - Visual Polish: Includes a "Savvy Shopper" tag, glassmorphic styling, and an animated profile setup progress bar powered by `framer-motion`.
 * * @returns {JSX.Element} The rendered profile header component.
 */
export default function ProfileHeaderSection() {
  const { displayName, email, avatarUrl, setAvatarUrl } = useUserStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  /**
   * Handles the selection and processing of a new profile image.
   * Reads the file, paints it onto a hidden canvas to constrain its dimensions, 
   * and updates the global store with the new base64 image data.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - The file input change event.
   */
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_SIZE = 400;
        
        let width = img.width;
        let height = img.height;
        // Maintain aspect ratio while scaling down to MAX_SIZE
        if (width > height) {
          if (width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          const highQualityBase64 = canvas.toDataURL('image/jpeg', 0.95);
          setAvatarUrl(highQualityBase64);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };
/**
   * Removes the custom uploaded photo and resets the avatar to the default SVG.
   * 
   * @param {React.MouseEvent} e - The mouse click event.
   */
  const handleRemovePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAvatarUrl("/user.svg");
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex flex-col gap-6 z-10">
      <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 md:gap-8 relative">
        
        <div className="relative group shrink-0 w-[110px] h-[110px]">
          <div 
            className="absolute inset-0 p-[3px] rounded-full bg-gradient-to-br from-brand-orange via-brand-orange/30 to-transparent shadow-[0_0_30px_rgba(236,88,0,0.25)] cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="relative flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-[rgba(30,26,30,0.8)] overflow-hidden">
               <img 
                 src={avatarUrl} 
                 alt={displayName} 
                 className={`transition-opacity duration-300 group-hover:opacity-30 ${
                   avatarUrl === "/user.svg" 
                     ? "w-[50px] h-[50px] object-contain opacity-40 dark:opacity-80" 
                     : "h-full w-full object-cover opacity-90"
                 }`} 
               />
               <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-text-main dark:text-white"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
               </div>
            </div>
            <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={handleImageUpload} />
          </div>

          {avatarUrl !== "/user.svg" && (
            <button
              onClick={handleRemovePhoto}
              title="Remove photo"
              className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-transform hover:scale-110 active:scale-95 z-20 border-2 border-bg-main"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          )}

          <div className="absolute bottom-0 right-0 pointer-events-none flex h-8 w-8 items-center justify-center rounded-full bg-brand-orange text-white shadow-lg transition-transform group-hover:scale-110 z-10 border-2 border-bg-main">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
          </div>
        </div>
        
        <div className="flex flex-col gap-2.5 w-full items-center md:items-start">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <h2 className="text-[32px] sm:text-[36px] font-bold tracking-[1px] text-text-main leading-none font-serif drop-shadow-sm">
              {displayName}
            </h2>
            <span className="flex items-center gap-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/30 px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[1px] text-brand-orange backdrop-blur-md shadow-[0_0_15px_rgba(236,88,0,0.1)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M12 15l-2 5l9-5l-9-5l2 5Z"/><circle cx="12" cy="12" r="10"/></svg>
              Savvy Shopper
            </span>
          </div>
          <p className="text-[15px] sm:text-[16px] font-medium text-text-muted tracking-wide cursor-default select-none">{email}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 max-w-md mt-2">
        <div className="flex justify-between items-end">
          <span className="text-[12px] font-bold uppercase tracking-[1px] text-text-muted">Profile Setup</span>
          <span className="text-[13px] font-bold text-brand-orange">100%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-black/10 dark:bg-white/10 overflow-hidden shadow-inner border border-black/5 dark:border-white/5">
          <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.5, ease: "easeOut" }} className="h-full bg-gradient-to-r from-brand-orange to-orange-400 rounded-full shadow-[0_0_10px_rgba(236,88,0,0.5)]" />
        </div>
        <span className="text-[11px] text-text-muted opacity-80 cursor-default select-none">
          Your profile is fully optimized!
        </span>
      </div>
    </div>
  );
}