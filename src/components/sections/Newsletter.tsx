export default function Newsletter() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="grid gap-8 rounded-[2rem] border border-white/10 bg-[#342e34] p-8 shadow-soft lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-orangeSoft">
            Contact us
          </p>
          <h2 className="mt-4 text-3xl font-black text-white">
            Bring DANKOSS into your retail or product ecosystem.
          </h2>
          <p className="mt-4 text-sm leading-7 text-white/60">
            Use this block for partnerships, integrations, new store feeds, or conversations about making discount discovery more useful for shoppers.
          </p>
          <div className="mt-8 space-y-3 text-sm text-white/55">
            <p>hello@dankoss.com</p>
            <p>+380 44 555 0199</p>
            <p>Kyiv, Ukraine</p>
          </div>
        </div>

        <form className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <input type="text" placeholder="Your name" className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-brand-orange" />
            <input type="email" placeholder="Your email" className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-brand-orange" />
          </div>
          <input type="text" placeholder="Subject" className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-brand-orange" />
          <textarea placeholder="Tell us about your project, offer feed, or partnership idea" rows={5} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-brand-orange" />
          <button type="submit" className="w-fit rounded-full bg-brand-orange px-6 py-3 font-semibold text-white transition hover:bg-brand-orangeSoft hover:text-brand-night">
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}
