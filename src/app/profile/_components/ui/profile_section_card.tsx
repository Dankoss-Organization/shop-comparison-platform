/**
 * @file profile_section_card.tsx
 * @description A flexible, animated wrapper component used to standardize the layout, 
 * typography, and styling of individual sections within the user profile dashboard.
 */
"use client";

import { motion, Variants } from "framer-motion";
import ProfileGlassCard from "@/app/profile/_components/ui/profile_glass_card";
/**
 * Properties for the ProfileSectionCard component.
 *
 * @interface ProfileSectionCardProps
 * @property {string} title - The primary heading text for the section.
 * @property {string} [description] - An optional secondary subtitle or descriptive text displayed below the title.
 * @property {React.ReactNode} icon - The React element (typically an SVG) representing the section's icon.
 * @property {React.ReactNode} children - The main content nested inside the section card.
 * @property {Variants} [variants] - Optional Framer Motion variants to apply entrance animations.
 * @property {string} [className=""] - Optional Tailwind CSS classes applied to the outer `ProfileGlassCard` wrapper.
 * @property {string} [glowClassName=""] - Optional Tailwind CSS classes to define the position, color, and size of the ambient background glow.
 * @property {string} [iconClassName=""] - Optional Tailwind CSS classes applied to the icon's background container for specific color theming.
 * @property {string} [contentClassName=""] - Optional Tailwind CSS classes applied to the inner content flex container.
 */
interface ProfileSectionCardProps {
  title: string;
  description?: string;

  icon: React.ReactNode;

  children: React.ReactNode;

  variants?: Variants;

  className?: string;

  glowClassName?: string;

  iconClassName?: string;

  contentClassName?: string;
}
/**
 * A highly customizable section container built on top of `ProfileGlassCard`.
 * * * Features:
 * - Structured Layout: Enforces a consistent header structure (icon + title + description) across all profile sections.
 * - Animation Ready: Wraps the entire card in a `motion.div`, seamlessly integrating with parent stagger animations using the `variants` prop.
 * - Granular Theming: Exposes multiple `className` overrides (`iconClassName`, `glowClassName`) allowing developers to color-code specific sections (e.g., red for security, orange for preferences).
 * - Ambient Styling: Supports injected background blur nodes (`glowClassName`) to enhance the glassmorphic aesthetic dynamically.
 * * @param {ProfileSectionCardProps} props - The component properties.
 * @returns {JSX.Element} The rendered animated profile section card.
 */
export default function ProfileSectionCard({
  title,
  description,
  icon,
  children,
  variants,
  className = "",
  glowClassName = "",
  iconClassName = "",
  contentClassName = "",
}: ProfileSectionCardProps) {
  return (
    <motion.div variants={variants}>
      
      <ProfileGlassCard
        className={`p-5 sm:p-6 md:p-8 ${className}`}
      >
        {/* Optional Ambient Glow Node */}
        {glowClassName && (
          <div
            className={`
              absolute pointer-events-none rounded-full blur-[60px]
              ${glowClassName}
            `}
          />
        )}
       
        <div className={`flex flex-col gap-4 sm:gap-5 relative z-10 h-full ${contentClassName}`}>
          {/* Section Header */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Icon Container */}
            <div
              className={`
                flex h-10 w-10
                sm:h-12 sm:w-12

                shrink-0
                items-center
                justify-center

                rounded-[14px]
                sm:rounded-[16px]

                ${iconClassName}
              `}
            >
              {icon}
            </div>
            {/* Title and Description */}
            <div className="flex flex-col">
              
              <h2 className="text-[16px] sm:text-[18px] font-bold tracking-[1px] text-text-main dark:text-text-primary uppercase leading-tight">
                {title}
              </h2>

              {description && (
                <p className="text-[12px] sm:text-[13px] tracking-[-0.5px] text-text-muted dark:text-text-primary/50 mt-0.5">
                  {description}
                </p>
              )}
            </div>
          </div>
          {/* Nested Section Content */}
          {children}
        </div>
      </ProfileGlassCard>
    </motion.div>
  );
}