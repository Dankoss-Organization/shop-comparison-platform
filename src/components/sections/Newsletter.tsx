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

const subscribeButtonClassName =
  "group relative inline-flex min-h-[46px] w-auto self-center items-center justify-center overflow-hidden rounded-[1rem] bg-[#EC5800] px-11 text-[0.94rem] font-bold text-[#2D282D] shadow-[0_10px_16px_#5e1f002e,0_0_12px_#ec580024] transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_16px_#ec580042,0_14px_18px_#5e1f0038] active:scale-95 sm:min-w-[244px] lg:min-w-[188px] lg:px-7 lg:text-[1rem]";

const shineClassName =
  "h-full w-[36px] -skew-x-[30deg] bg-gradient-to-r from-transparent via-[#fff5ed3d] to-transparent";

const telegramButtonClassName =
  "group absolute top-0 inline-flex h-[46px] w-[46px] items-center justify-start overflow-hidden rounded-full bg-[#EC5800] px-0 shadow-[0_10px_16px_#5e1f002e,0_0_12px_#ec580024] transition-all duration-400 hover:w-[196px] active:scale-95";

function TelegramButton({ centered }: { centered: boolean }) {
  return (
    <a
      href="#"
      className={`${telegramButtonClassName} ${centered ? "left-1/2 -translate-x-1/2" : "left-0"}`}
    >
      <span className="flex h-[46px] w-[46px] shrink-0 items-center justify-center text-[#2D282D]">
        <Image
          src="/telegram.svg"
          alt="Telegram"
          width={40}
          height={40}
          style={telegramIconStyle}
        />
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap pr-3 text-center text-[0.74rem] font-bold uppercase tracking-[0.08em] text-[#2D282D] opacity-0 transition-all duration-300 group-hover:ml-1 group-hover:max-w-[144px] group-hover:opacity-100">
        Telegram bot
      </span>
    </a>
  );
}

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!submitted) {
      return;
    }

    const timer = window.setTimeout(() => {
      setSubmitted(false);
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [submitted]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

    if (!isValidEmail) {
      setSubmitted(false);
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
    <section id="contact" className="mx-auto max-w-[1220px] px-3 py-8 sm:px-4 lg:px-6">
      <div className={cardClassName}>
        <div className={glowLayerClassName} />

        <div className={badgeClassName}>
          <div className={badgeInnerClassName}>
            <Image src="/newsletter.svg" alt="Newsletter" width={40} height={40} />
          </div>
        </div>

        <div className="relative z-10 mx-auto flex max-w-[980px] flex-col items-center text-center">
          <h2 className="mt-1 max-w-[760px] text-[1.45rem] font-black leading-[0.96] tracking-[-0.05em] text-[#FFDEBA] sm:text-[1.75rem] lg:text-[2.15rem]">
            Subscribe Newsletter
          </h2>

          <p className="mt-3 max-w-[860px] text-[0.78rem] leading-[1.3] text-[#FFDEBAD1] sm:text-[0.86rem] lg:whitespace-nowrap lg:text-[0.94rem]">
            You will never miss our updates, best discounts and product picks.
            We keep it useful, light and worth opening.
          </p>

          <form className="mt-5 flex w-full max-w-[980px] flex-col items-center gap-3.5" onSubmit={handleSubmit}>
            <div className="flex w-full flex-col items-stretch gap-3 overflow-visible lg:flex-row lg:items-center lg:justify-center">
              <div aria-hidden="true" className="hidden lg:block lg:w-[138px] lg:shrink-0" />

              <div className="flex w-full overflow-hidden rounded-[1rem] lg:max-w-[640px]" style={formSurfaceStyle}>
                <label className="flex min-h-[46px] flex-1 items-center px-4 sm:px-5">
                  <input
                    type="email"
                    placeholder="user@gmail.com"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (error) {
                        setError("");
                      }
                    }}
                    disabled={isSubmitting}
                    aria-invalid={error ? "true" : "false"}
                    className="w-full bg-transparent text-[0.9rem] text-[#FFDEBA] outline-none placeholder:text-[#FFDEBA80] lg:text-[0.96rem]"
                  />
                </label>
              </div>

              <button type="submit" disabled={isSubmitting} className={subscribeButtonClassName}>
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
                  We promise not to spam you!
                </p>
              ) : null}
            </div>
          </form>
        </div>

      </div>
    </section>
  );
}