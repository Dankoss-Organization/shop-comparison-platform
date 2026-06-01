/**
 * @file profile_input.tsx
 * @description A highly customizable, reusable input field component tailored for profile forms,
 * featuring built-in support for validation states, inline elements, and custom label slots.
 */
"use client";

import React from "react";
/**
 * Properties for the ProfileInput component.
 * Inherits all standard HTML input attributes.
 *
 * @interface ProfileInputProps
 * @extends {React.InputHTMLAttributes<HTMLInputElement>}
 * @property {string} label - The primary text label displayed above the input field.
 * @property {boolean} [error] - Flag indicating whether the input is in a validation error state, triggering semantic danger styling.
 * @property {string} [errorText] - The validation message displayed next to the label when `error` is true.
 * @property {React.ReactNode} [labelRightNode] - An optional React element injected to the right of the label (e.g., status badges, tooltips).
 * @property {React.ReactNode} [rightElement] - An optional React element rendered inside the right edge of the input box (e.g., dropdown chevrons, search icons).
 * @property {string} [labelClassName] - Optional Tailwind CSS classes to override the default label typography and layout.
 */
interface ProfileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  errorText?: string;
  labelRightNode?: React.ReactNode;
  rightElement?: React.ReactNode;
  labelClassName?: string;
}
/**
 * A styled, accessible input field component designed for consistent form layouts.
 * * * Features:
 * - Slot Architecture: Exposes `labelRightNode` and `rightElement` props to easily inject secondary UI elements without breaking the base layout.
 * - Validation Feedback: Conditionally renders pulsing error text and shifts focus rings to red (`text-red-500`, `ring-red-500/50`) when an error is present.
 * - Theme Adaptive: Seamlessly switches between light and dark mode styles, applying context-aware background opacities, backdrop blurs, and structural shadows.
 * - Responsive Dimensions: Automatically scales inner padding, typography, and border radii to ensure touch-friendly sizes on mobile (`sm:` breakpoints).
 * * @param {ProfileInputProps} props - The component properties.
 * @returns {JSX.Element} The rendered input field with its associated label and decorators.
 */
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
      {/* Label and Upper UI Slot Area */}
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
      {/* Input Field Area */}
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
        {/* Inner Right Decorative/Functional Element */}
        {rightElement && (
          <div className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted/40">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}