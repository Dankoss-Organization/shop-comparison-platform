/**
 * @file Banner.tsx
 * @brief Reusable promotional banner component with call-to-action.
 */

/**
 * @brief Renders a promotional banner.
 * @param {Object} props Component properties.
 * @param {string} props.eyebrow Small over-title text.
 * @param {string} props.title Main banner heading.
 * @param {string} props.cta Call to action button text.
 * @param {string} props.href Call to action URL.
 * @param {boolean} [props.dark=false] Toggles dark mode styling.
 * @returns {JSX.Element} The rendered banner.
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
            className={`inline-flex rounded-full px-6 py-3 font-semibold transition ${
              dark
                ? "border border-brand-orange/40 text-brand-orangeSoft hover:bg-brand-orange hover:text-white"
                : "bg-white text-brand-night hover:bg-brand-orange hover:text-white"
            }`}
          >
            {cta}
          </a>
        </div>
      </div>
    </section>
  );
}