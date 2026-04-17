/**
 * @file Newsletter.tsx
 * @description Newsletter subscription form with integrated Telegram bot link.
 */

"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";

const telegramIconStyle = {
  filter:
    "brightness(0) saturate(100%) invert(12%) sepia(10%) saturate(1080%) hue-rotate(255deg) brightness(83%) contrast(97%)",
};

const cardClassName =
  "relative overflow-visible rounded-[1.75rem] bg-[linear-gradient(180deg,#191517_0%,#120f12_100%)] px-5 pb-2 pt-10 shadow-[0px_-3px_8px_#ec580057,0_24px_40px_#00000038] sm:px-7 sm:pb-3 sm:pt-12 lg:max-w-[1400px] lg:px-10 lg:pb-3 lg:pt-12";

const glowLayerClassName =
  "pointer-events-none absolute inset-0 rounded-[1.75rem] bg-[radial-gradient(circle_at_16%_78%,#ec580085,transparent_24%),radial-gradient(circle_at_84%_26%,#ec580066,transparent_22%),radial-gradient(circle_at_62%_88%,#ec580057,transparent_20%),radial-gradient(circle_at_top_center,#f6d7b00d,transparent_18%)]";

const badgeClassName =
  "absolute left-1/2 top-0 z-20 h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[linear-gradient(180deg,#EC5800_0%,#8c3412_100%)] p-[3px] shadow-[0_10px_20px_#5e1f0047] sm:h-[68px] sm:w-[68px]";

const badgeInnerClassName =
  "flex h-full w-full items-center justify-center rounded-full bg-[#311714] shadow-[inset_0_0_0_2px_#f6d7b038]";

const formSurfaceStyle = {
  background: "#2D282D66",
  boxShadow: "2px 2px 1px #EC5800",
  backdropFilter: "blur(5px)",
  WebkitBackdropFilter: "blur(5px)",
};

const submitBtnClassName =
  "group relative flex h-[46px] w-[140px] shrink-0 items-center justify-center overflow-hidden rounded-[24px] border border-transparent text-[15px] font-bold text-[#FFDEBA] shadow-[2px_2px_1px_#EC5800] transition-all duration-300 hover:-translate-y-[2px] hover:border-[#EC5800]/50 hover:shadow-[0_0_20px_rgba(236,88,0,0.6)] hover:text-white focus:border-[#EC5800] focus:outline-none active:scale-95 disabled:pointer-events-none disabled:opacity-70";

const shineClassName =
  "h-full w-[40px] -skew-x-[30deg] bg-gradient-to-r from-transparent via-[#f6d7b040] to-transparent";

/**
 * @description Renders a stylized Telegram subscription button.
 * @param {Object} props - Component properties.
 * @param {boolean} props.centered - Determines if the button text should be centered or aligned left with an icon.
 * @returns {JSX.Element} The interactive Telegram button link.
 */
function TelegramButton({ centered }: { centered: boolean }) {
  return (
    <a
      href="https://t.me/your_bot"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-full w-full items-center justify-center overflow-hidden rounded-[24px] border border-transparent text-[15px] font-bold text-[#FFDEBA] shadow-[2px_2px_1px_#EC5800] transition-all duration-300 hover:-translate-y-[2px] hover:border-[#EC5800]/50 hover:shadow-[0_0_20px_rgba(236,88,0,0.6)] hover:text-white focus:border-[#EC5800] focus:outline-none active:scale-95"
      style={formSurfaceStyle}
    >
      <span
        className={`relative z-10 flex items-center transition-transform duration-300 group-hover:scale-105 ${
          centered ? "justify-center gap-2" : "w-full justify-start pl-[1.1rem]"
        }`}
      >
        <Image
          src="/telegram.svg"
          alt="Telegram"
          width={18}
          height={18}
          className="transition-transform duration-300 group-hover:rotate-12"
          style={telegramIconStyle}
        />
        <span className={centered ? "" : "ml-2"}>Go to Bot</span>
      </span>
      <span className="absolute -left-[150%] top-0 z-0 flex h-full w-full justify-center transition-all duration-700 ease-out group-hover:left-[150%]">
        <span className={shineClassName} />
      </span>
    </a>
  );
}

/**
 * @description Main Newsletter subscription component.
 * Provides an email input form with client-side validation, success/error state handling, 
 * and an alternative Telegram bot subscription option.
 * @returns {JSX.Element} The rendered newsletter subscription card.
 */
export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    window.setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setEmail("");
    }, 500);
  };

  return (
    <section id="contact" className="mx-auto max-w-[1200px] px-4 pb-20 pt-16 sm:px-6 lg:px-8">
      <div className={cardClassName}>
        <div className={glowLayerClassName} />

        <div className={badgeClassName}>
          <div className={badgeInnerClassName}>
            {isMounted && (
              <Image src="/orange_logo.svg" alt="Dankoss Logo" width={38} height={38} priority />
            )}
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center pt-8 sm:pt-10">
          <h2 className="mb-3 text-center text-[1.65rem] font-bold uppercase leading-tight tracking-[0.1em] text-[#FFDEBA] sm:text-[2rem]">
            Get <span className="text-[#EC5800]">Weekly</span> Hits
          </h2>
          <p className="mb-8 max-w-[500px] text-center text-[0.95rem] font-medium leading-relaxed tracking-wide text-[#FFDEBA8A] sm:text-[1.05rem]">
            Drop your email below, and we'll send you the absolute best deals, wildest discounts, and freshest seasonal recipes every week.
          </p>

          <form onSubmit={handleSubmit} className="w-full max-w-[620px]">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-stretch sm:justify-center">
              
              <div
                className="flex h-[46px] w-full max-w-[340px] items-center rounded-[24px] px-1 sm:max-w-none sm:flex-1"
                style={formSurfaceStyle}
              >
                <div className="flex h-full items-center pl-4 pr-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EC5800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
                    <path d="Mm22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="h-full w-full bg-transparent px-2 text-[15px] font-medium text-[#FFDEBA] placeholder-[#FFDEBA]/40 outline-none transition-all placeholder:font-normal focus:bg-transparent"
                  disabled={isSubmitting || submitted}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || submitted}
                className={submitBtnClassName}
                style={formSurfaceStyle}
              >
                <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">
                  {isSubmitting ? "Sending..." : "Subscribe"}
                </span>
                <span className="absolute -left-[150%] top-0 z-0 flex h-full w-full justify-center transition-all duration-700 ease-out group-hover:left-[150%]">
                  <span className={shineClassName} />
                </span>
              </button>

              <div className="relative hidden h-[46px] w-[196px] shrink-0 overflow-visible lg:block">
                <TelegramButton centered={false} />
              </div>
            </div>

            <div className="mt-0.5 flex w-full justify-center lg:hidden">
              <div className="relative h-[46px] w-[184px] overflow-visible">
                <TelegramButton centered />
              </div>
            </div>

            <div className="mt-0.5 flex min-h-[34px] flex-col items-center justify-start">
              {error ? (
                <p className="text-[0.82rem] text-[#ffb37a] sm:text-[0.88rem]">
                  {error}
                </p>
              ) : null}

              {submitted ? (
                <p className="text-[0.82rem] text-[#FFDEBA] sm:text-[0.88rem]">
                  Thank you! You've subscribed successfully.
                </p>
              ) : null}

              {!error && !submitted ? (
                <p className="text-[0.82rem] text-[#FFDEBA8A] sm:text-[0.88rem]">
                  We respect your inbox. No spam, ever.
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}