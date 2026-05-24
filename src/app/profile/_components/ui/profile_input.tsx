"use client";

import React from "react";

interface ProfileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  errorText?: string;
  labelRightNode?: React.ReactNode;
  rightElement?: React.ReactNode;
  labelClassName?: string;
}

export default function ProfileInput({
  label,
  error,
  errorText,
  labelRightNode,
  rightElement,
  labelClassName = "text-[12px] sm:text-[13px] font-medium text-text-muted dark:text-text-primary/60 pl-1 sm:pl-2",
  className = "",
  ...props
}: ProfileInputProps) {
  return (
    <div className="flex flex-col gap-1.5 sm:gap-2 w-full">
      
      <div className="flex justify-between items-end pr-2">
        <label className={labelClassName}>
          {label}
        </label>

        <div className="flex items-center gap-2">
          {labelRightNode}
          {error && errorText && (
            <span className="text-[9px] sm:text-[10px] font-bold text-red-500 dark:text-red-400 uppercase tracking-wider animate-pulse">
              {errorText}
            </span>
          )}
        </div>
      </div>

      <div className="relative w-full">
        <input
          className={`
            w-full rounded-[14px] sm:rounded-[16px]
            border border-text-main/5 dark:border-transparent
            px-4 sm:px-5 py-3 sm:py-3.5
            text-[14px] sm:text-[15px]
            text-text-main dark:text-text-primary
            outline-none transition-all
            placeholder:text-text-muted/50
            dark:placeholder:text-text-primary/30
            focus:ring-2
            bg-black/5 dark:bg-[rgba(54,46,54,0.6)]
            backdrop-blur-[5px]
            ${
              error
                ? "focus:ring-red-500/50 dark:shadow-[2px_2px_1px_rgb(var(--semantic-danger))]"
                : "focus:ring-brand-orange/50 dark:shadow-[2px_2px_1px_rgb(var(--brand-orange))]"
            }
            ${rightElement ? "pr-10 sm:pr-12" : ""}
            ${className}
          `}
          {...props}
        />
        
        {rightElement && (
          <div className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted/40">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}