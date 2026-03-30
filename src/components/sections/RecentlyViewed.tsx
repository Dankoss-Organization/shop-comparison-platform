export default function RecentlyViewed({
  items,
}: {
  items: { title: string; type: string; detail: string }[];
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-orange/70">
            History
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-black text-white md:text-4xl">
            Recently viewed discounts and recipies
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-white/62">
          A compact row keeps browsing momentum going by bringing shoppers back to the discounts and recipes they opened most recently.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <article
            key={`${item.type}-${item.title}`}
            className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 shadow-soft"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-orangeSoft">
              {item.type}
            </p>
            <h3 className="mt-8 text-2xl font-black text-white">{item.title}</h3>
            <p className="mt-3 text-sm text-white/55">{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
