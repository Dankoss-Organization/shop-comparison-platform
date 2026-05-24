"use client";

import { motion, Variants } from "framer-motion";
import ProfileGlassCard from "@/app/profile/_components/ui/profile_glass_card";

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
        
        {glowClassName && (
          <div
            className={`
              absolute pointer-events-none rounded-full blur-[60px]
              ${glowClassName}
            `}
          />
        )}

        <div className={`flex flex-col gap-4 sm:gap-5 relative z-10 h-full ${contentClassName}`}>
          
          <div className="flex items-center gap-3 sm:gap-4">
            
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

          {children}
        </div>
      </ProfileGlassCard>
    </motion.div>
  );
}