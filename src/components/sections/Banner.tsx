/**
 * @file Banner.tsx
 * @description Reusable promotional banner component with call-to-action.
 */

/**
 * @description Renders a promotional banner to highlight specific marketing campaigns or actions.
 * @param {Object} props - Component properties.
 * @param {string} props.eyebrow - Small over-title text displayed above the main heading.
 * @param {string} props.title - Main banner heading displaying the core message.
 * @param {string} props.cta - Call to action button text.
 * @param {string} props.href - Call to action URL destination.
 * @param {boolean} [props.dark=false] - Toggles dark mode styling for the banner background.
 * @returns {JSX.Element} The rendered banner section containing the titles and CTA button.
 */
export default function Banner({
  eyebrow,
  title,
  cta,
  href,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  cta: string;
  href: string;
  dark?: boolean;
}) {
  return (
    <section className="mx-auto w-full px-6 py-10 lg:px-8">
      <div
        className={`rounded-[2rem] border border-white/8 px-8 py-10 shadow-soft ${
          dark
            ? "bg-[#342e34]"
            : "bg-[linear-gradient(135deg,rgba(236,88,0,0.22),rgba(255,255,255,0.04))]"
        }`}
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-orangeSoft">
              {eyebrow}
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black text-white md:text-4xl">{title}</h2>
          </div>
          <a
            href={href}
            className="group relative flex h-14 w-[200px] shrink-0 items-center justify-center overflow-hidden rounded-full font-bold text-white transition-all hover:shadow-[0_0_20px_rgba(236,88,0,0.4)]"
          >
            <div className="absolute inset-0 bg-brand-orange transition-transform duration-300 group-hover:scale-105" />
            <span className="relative z-10 flex items-center gap-2">
              {cta}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}