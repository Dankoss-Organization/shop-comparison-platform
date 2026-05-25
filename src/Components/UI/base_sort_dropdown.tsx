"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/Lib/utils";

export interface SortOption {
  value: string;
  label: string;
}

interface BaseSortDropdownProps {
  options: SortOption[];
  value: string;
  onChange: (value: string) => void;
  fallbackLabel?: string;
}

export default function BaseSortDropdown({ 
  options, 
  value, 
  onChange,
  fallbackLabel = "Sort by" 
}: BaseSortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  const activeLabel = options.find((opt) => opt.value === value)?.label ?? fallbackLabel;

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "group inline-flex items-center justify-between gap-4 rounded-[1rem] px-4 py-2.5 text-left text-text-primary transition-all duration-300 min-w-[200px] border border-glass/10 shadow-sm",
          isOpen
            ? "bg-bg-elevated border-brand-orange/40"
            : "bg-bg-surface hover:bg-bg-elevated hover:text-text-main"
        )}
      >
        <span className="text-sm font-semibold">{activeLabel}</span>
        <span
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-full bg-bg-elevated text-text-primary/65 transition-all duration-300 group-hover:text-brand-orange",
            isOpen ? "rotate-180 text-brand-orange" : ""
          )}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      <div
        className={cn(
          "absolute right-0 top-full z-30 mt-3 w-full origin-top rounded-[1.2rem] bg-bg-surface p-1.5 shadow-xl border border-glass/10 transition-all duration-200",
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        )}
      >
        <div className="grid gap-1">
          {options.map((option) => {
            const isActive = value === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex items-center justify-between rounded-[0.9rem] px-3.5 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-brand-orange text-white shadow-md"
                    : "text-text-primary hover:bg-bg-elevated hover:text-text-main"
                )}
              >
                <span>{option.label}</span>
                <span className={cn("text-sm transition-opacity duration-200", isActive ? "opacity-100" : "opacity-0")}>
                  ✓
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}