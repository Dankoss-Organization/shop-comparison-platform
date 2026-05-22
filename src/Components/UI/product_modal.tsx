/**
 * @file product_modal.tsx
 * @description Product modal using the same product structure as the full product page.
 */
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import type { DealCard, StoreOffer } from "@/Data/home_data";
import SmartImage from "./smart_image";
import { useFavoritesStore } from "@/Store/use_favourite_store";
import { useCartStore } from "@/Store/use_cart_store";
import { cn, formatCurrency } from "@/Lib/utils";

interface ProductModalContextType {
  item: DealCard;
  onClose: () => void;
}

const ProductModalContext = createContext<ProductModalContextType | undefined>(undefined);

function useProductModal() {
  const ctx = useContext(ProductModalContext);
  if (!ctx) {
    throw new Error("ProductModal components must be used within <ProductModal>");
  }
  return ctx;
}

function getBestOffer(item: DealCard): StoreOffer | null {
  if (!item.offers?.length) return null;
  return [...item.offers].sort((a, b) => a.pricing.current_price - b.pricing.current_price)[0];
}

function getDescriptionSections(item: DealCard) {
  return item.descriptionSections?.length ? item.descriptionSections : [item.description];
}

export function ProductModal({
  item,
  onClose,
  children,
}: {
  item: DealCard;
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return <ProductModalContext.Provider value={{ item, onClose }}>{children}</ProductModalContext.Provider>;
}

ProductModal.Window = function Window({ children }: { children: ReactNode }) {
  const { item, onClose } = useProductModal();
  const router = useRouter();

  return (
    <div
      className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto bg-bg-deepest/80 p-4 pb-12 pt-14 backdrop-blur-md transition-opacity"
      onClick={onClose}
      aria-label="Close"
    >
      <div
        className="relative mb-12 min-h-[500px] w-[90vw] max-w-[1240px] overflow-hidden rounded-[2.5rem] border border-glass/10 bg-bg-surface text-text-primary shadow-[0_36px_90px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in-95 duration-300 lg:h-[86vh]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="absolute right-6 top-6 z-30 rounded-full border border-glass/10 bg-glass/10 px-3 py-2.5 shadow-[0_12px_24px_rgba(0,0,0,0.15)] backdrop-blur-md">
          <div className="flex items-center gap-3">
            <ActionIconButton
              label="Open product page"
              onClick={() => {
                onClose();
                router.push(`/product/${encodeURIComponent(item.id)}`);
              }}
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 17L17 7M17 7H9M17 7V15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
            <ActionIconButton
              label="Close"
              onClick={onClose}
              icon={<span className="text-xl leading-none">×</span>}
            />
          </div>
        </div>

        <div className="grid h-full overflow-hidden lg:grid-cols-[0.92fr_1.08fr]">{children}</div>
      </div>
    </div>
  );
};

ProductModal.LeftColumn = function LeftColumn({ children }: { children: ReactNode }) {
  return (
    <div className="custom-scrollbar h-full overflow-y-auto border-r border-glass/5 px-5 pb-6 pt-6 lg:px-6 lg:pb-8 lg:pt-8">
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
};

ProductModal.RightColumn = function RightColumn({ children }: { children: ReactNode }) {
  return (
    <div className="custom-scrollbar h-full overflow-y-auto px-5 pb-6 pt-6 lg:px-8 lg:pb-8 lg:pt-8">
      <div className="max-w-[580px]">{children}</div>
    </div>
  );
};

ProductModal.ImageGallery = function ImageGallery() {
  const { item } = useProductModal();
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavoriteGlobal = useFavoritesStore((state) => state.isFavorite(item.id));
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const favourite = isMounted ? isFavoriteGlobal : false;
  const bestOffer = getBestOffer(item);
  const currency = item.currency ?? "UAH";

  return (
    <div className="relative overflow-hidden rounded-[1.7rem] border border-glass/10 bg-gradient-to-b from-bg-elevated to-bg-darker p-5 shadow-[0_20px_36px_rgba(0,0,0,0.15)]">
      <div className="absolute left-5 top-5 z-10 flex flex-wrap items-center gap-2">
        {bestOffer && (
          <span className="rounded-full bg-bg-deepest/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-text-primary">
            {bestOffer.store_name}
            {bestOffer.store_city ? ` · ${bestOffer.store_city}` : ""}
          </span>
        )}
        {bestOffer && bestOffer.pricing.discount_percent > 0 && (
          <span className="rounded-full bg-brand-orange px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
            -{bestOffer.pricing.discount_percent}%
          </span>
        )}
        {item.availabilityStatus === "in_stock" && (
          <span className="rounded-full bg-green-500/20 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-green-400">
            In Stock
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={() => toggleFavorite(item.id)}
        className={cn(
          "absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 active:scale-75",
          favourite
            ? "border border-brand-orange bg-brand-orange text-white shadow-[0_4px_15px_rgb(var(--brand-orange)_/_0.5)]"
            : "border border-glass/20 bg-bg-deepest/40 text-text-main/90 backdrop-blur-md hover:bg-bg-deepest/60",
        )}
      >
        <HeartBadge filled={favourite} />
      </button>

      <div className="mx-auto mt-10 flex h-[44vh] max-w-full aspect-[4/4.8] items-center justify-center overflow-hidden rounded-[1rem]">
        <SmartImage src={item.image || "/placeholder.jpg"} alt={item.title} />
      </div>

      {item.stats && (item.stats.minPrice30d != null || item.stats.maxPrice30d != null) && (
        <div className="mt-4 flex items-center justify-between rounded-xl border border-glass/10 bg-bg-deepest/60 px-4 py-2.5 text-[11px] backdrop-blur-sm">
          <span className="font-semibold uppercase tracking-[0.15em] text-text-primary/60">
            {item.stats.priceTrend === "up"
              ? "Price rising"
              : item.stats.priceTrend === "down"
                ? "Price dropping"
                : "Price stable"}
          </span>
          {item.stats.minPrice30d != null && item.stats.maxPrice30d != null && (
            <span className="text-text-primary/50">
              30d: {formatCurrency(item.stats.minPrice30d, currency)} - {formatCurrency(item.stats.maxPrice30d, currency)}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

ProductModal.Reviews = function Reviews() {
  const { item } = useProductModal();
  const [open, setOpen] = useState(true);
  const bestOffer = getBestOffer(item);
  const discountText =
    (bestOffer?.pricing.discount_percent ?? 0) > 0
      ? `-${bestOffer!.pricing.discount_percent}% discount`
      : "price";

  const reviewCards = useMemo(
    () => [
      {
        author: "Anna M.",
        stars: 5,
        text: `Looks premium and the ${discountText} really feels worth it. Great pick for a quick basket.`,
      },
      {
        author: "Maks K.",
        stars: 4,
        text: "Very solid choice. I like the nutrition block and the pack size makes sense for repeat orders.",
      },
    ],
    [discountText],
  );

  return (
    <>
      <div className="rounded-[1.2rem] border border-glass/5 bg-bg-darker px-4 py-4">
        <div className="rounded-[1.15rem] border border-glass/10 bg-bg-elevated p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-text-primary/50">Rating</p>
              <p className="mt-3 text-[2.7rem] font-black leading-none text-text-primary">
                {item.rating && item.rating !== "0.0" ? item.rating : "-"}
              </p>
            </div>
            <div className="rounded-full bg-brand-orange/10 px-3 py-1.5 text-xs font-semibold text-brand-orange">
              Verified reviews
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-text-primary/60">
            Loved for strong savings, clear nutrition info, and quick basket decisions.
          </p>
        </div>
      </div>

      <AccordionBlock label="Reviews" open={open} onToggle={() => setOpen(!open)}>
        <div className="space-y-3">
          {reviewCards.map((review) => (
            <ReviewCard key={review.author} {...review} />
          ))}
        </div>
      </AccordionBlock>
    </>
  );
};

ProductModal.Header = function Header({ categoryTitle }: { categoryTitle: string }) {
  const { item } = useProductModal();
  const bestOffer = getBestOffer(item);
  const currency = item.currency ?? "UAH";
  const displayCategory = item.category ?? categoryTitle;

  const currentPrice = bestOffer?.pricing.current_price ?? item.pricingSummary?.bestPrice;
  const regularPrice = bestOffer?.pricing.regular_price ?? item.pricingSummary?.oldPrice;
  const hasDiscount = regularPrice != null && currentPrice != null && regularPrice > currentPrice;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-orange">
          {displayCategory}
        </p>
        {item.brand && (
          <>
            <span className="text-text-primary/30">·</span>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-text-primary/50">
              {item.brand}
            </p>
          </>
        )}
      </div>

      <h1 className="mt-3 text-[2rem] font-black leading-[1.02] text-text-primary">{item.title}</h1>

      {item.detailsLine && (
        <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-text-primary/45">
          {item.detailsLine}
        </p>
      )}

      <div className="mt-5 flex flex-wrap items-end gap-x-4 gap-y-2">
        <p className="text-[2rem] font-black text-brand-orange">{formatCurrency(currentPrice, currency)}</p>
        {hasDiscount && (
          <span className="mb-1 text-base text-text-primary/40 line-through">
            {formatCurrency(regularPrice, currency)}
          </span>
        )}
        {(item.pricingSummary?.discountPercent ?? 0) > 0 && (
          <span className="mb-1 rounded-full bg-brand-orange/10 px-3 py-1 text-sm font-bold text-brand-orange">
            -{item.pricingSummary!.discountPercent}%
          </span>
        )}
      </div>
    </div>
  );
};

ProductModal.Actions = function Actions({ categoryTitle: _categoryTitle }: { categoryTitle?: string }) {
  const { item } = useProductModal();
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);

  const currency = item.currency ?? "UAH";
  const sortedOffers = useMemo(
    () => [...(item.offers ?? [])].sort((a, b) => a.pricing.current_price - b.pricing.current_price),
    [item.offers],
  );
  const activeOffer = sortedOffers.find((offer) => offer.store_id === selectedStoreId) ?? sortedOffers[0] ?? null;

  const parsedQuantity = useMemo(() => {
    const q = (item.quantity || "1 pcs").toLowerCase();
    const isWeight = q.includes("g") || q.includes("kg");
    return { isWeight };
  }, [item.quantity]);

  const [amount, setAmount] = useState(parsedQuantity.isWeight ? 100 : 1);
  const handleDecrease = () =>
    setAmount((current) => (parsedQuantity.isWeight ? Math.max(100, current - 100) : Math.max(1, current - 1)));
  const handleIncrease = () =>
    setAmount((current) => (parsedQuantity.isWeight ? current + 100 : current + 1));

  const handleAddToCart = () => {
    const qty = parsedQuantity.isWeight ? Math.max(1, Math.floor(amount / 100)) : amount;
    for (let i = 0; i < qty; i += 1) {
      addItem({ ...item, selectedStoreId: activeOffer?.store_id } as any);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const amountDisplay = parsedQuantity.isWeight
    ? amount >= 1000
      ? `${(amount / 1000).toFixed(2)} kg`
      : `${amount} g`
    : `${amount} ${amount === 1 ? "pack" : "packs"}`;

  return (
    <>
      {sortedOffers.length > 1 && (
        <div className="mt-6">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-text-primary/50">
            Available at {sortedOffers.length} stores
          </p>
          <div className="flex flex-wrap gap-2">
            {sortedOffers.map((offer) => (
              <button
                key={offer.store_id}
                type="button"
                onClick={() => setSelectedStoreId(offer.store_id)}
                className={cn(
                  "flex flex-col items-start rounded-xl border px-3 py-2 text-left transition-all duration-200",
                  activeOffer?.store_id === offer.store_id
                    ? "border-brand-orange/40 bg-brand-orange/10 text-brand-orange"
                    : "border-glass/10 bg-bg-darker text-text-primary/70 hover:border-glass/30",
                )}
              >
                <span className="text-[12px] font-bold">{offer.store_name}</span>
                {offer.store_city && <span className="text-[10px] text-text-primary/40">{offer.store_city}</span>}
                <span className="mt-0.5 text-[13px] font-black">
                  {formatCurrency(offer.pricing.current_price, currency)}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <OptionBlock
          label="Quantity"
          content={
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDecrease}
                  disabled={parsedQuantity.isWeight ? amount <= 100 : amount <= 1}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.9rem] border border-glass/10 bg-bg-darker text-lg font-semibold text-text-primary transition hover:border-brand-orange disabled:cursor-not-allowed disabled:opacity-45"
                >
                  -
                </button>
                <div className="flex h-11 w-full items-center justify-center rounded-[0.9rem] border border-glass/10 bg-bg-darker px-4 text-sm font-semibold text-text-primary">
                  {amountDisplay}
                </div>
                <button
                  type="button"
                  onClick={handleIncrease}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.9rem] border border-glass/10 bg-bg-darker text-lg font-semibold text-text-primary transition hover:border-brand-orange"
                >
                  +
                </button>
              </div>
              {activeOffer && (
                <p className="text-xs font-medium text-text-primary/40">
                  Total: {formatCurrency(activeOffer.pricing.current_price * (parsedQuantity.isWeight ? amount / 100 : amount), currency)}
                </p>
              )}
            </div>
          }
        />
        <OptionBlock
          label="Pack info"
          content={
            <div className="flex flex-wrap gap-2">
              <SoftTag>{item.quantity || "1 pcs"}</SoftTag>
              {item.brand && <SoftTag>{item.brand}</SoftTag>}
              {item.category && <SoftTag>{item.category}</SoftTag>}
            </div>
          }
        />
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={handleAddToCart}
          className={cn(
            "w-full rounded-[1rem] px-5 py-4 text-[16px] font-bold text-white transition-all duration-300 active:scale-[0.98]",
            added
              ? "bg-green-600 shadow-[0_8px_20px_rgba(22,163,74,0.3)]"
              : "bg-brand-orange shadow-[0_8px_20px_rgb(var(--brand-orange)_/_0.3)] hover:-translate-y-0.5 hover:brightness-110",
          )}
        >
          {added ? "Added!" : "Add to cart"}
        </button>
      </div>
    </>
  );
};

ProductModal.Details = function Details({ categoryTitle }: { categoryTitle: string }) {
  const { item } = useProductModal();
  const [expanded, setExpanded] = useState({
    description: true,
    stores: false,
    nutrition: true,
    stats: false,
    details: false,
  });
  const toggle = (key: keyof typeof expanded) => setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  const currency = item.currency ?? "UAH";
  const bestOffer = getBestOffer(item);
  const displayCategory = item.category ?? categoryTitle;
  const descriptionSections = getDescriptionSections(item);

  const hasNutrition =
    !!item.nutrition && Object.values(item.nutrition).some((value) => value !== "N/A" && value !== "-");

  const hasStats =
    !!item.stats &&
    (item.stats.minPrice30d != null || item.stats.maxPrice30d != null || item.stats.avgPrice30d != null);

  return (
    <div className="mt-8 space-y-3">
      <AccordionBlock label="Description" open={expanded.description} onToggle={() => toggle("description")}>
        <div className="space-y-4 text-sm leading-6 text-text-primary/60">
          <div className="space-y-2">
            {descriptionSections.map((section, index) => (
              <p key={`modal-description-${index}`}>{section}</p>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <QuickFact label="Category" value={displayCategory} />
            <QuickFact label="Brand" value={item.brand ?? "-"} />
            <QuickFact label="Pack" value={item.quantity || "N/A"} />
            <QuickFact label="Price" value={formatCurrency(bestOffer?.pricing.current_price, currency)} />
            <QuickFact
              label="Previous price"
              value={
                bestOffer && bestOffer.pricing.regular_price > bestOffer.pricing.current_price
                  ? formatCurrency(bestOffer.pricing.regular_price, currency)
                  : "-"
              }
            />
            <QuickFact label="Currency" value={currency} />
          </div>
        </div>
      </AccordionBlock>

      {item.offers && item.offers.length > 0 && (
        <AccordionBlock label={`Stores (${item.offers.length})`} open={expanded.stores} onToggle={() => toggle("stores")}>
          <div className="flex flex-col gap-2 pt-1">
            {[...item.offers]
              .sort((a, b) => a.pricing.current_price - b.pricing.current_price)
              .map((offer) => (
                <div
                  key={offer.store_id}
                  className="flex items-center justify-between rounded-lg border border-glass/10 bg-bg-elevated px-4 py-3"
                >
                  <div>
                    <p className="text-[13px] font-bold text-text-primary">{offer.store_name}</p>
                    {(offer.store_city || offer.store_address) && (
                      <p className="text-[11px] text-text-primary/40">
                        {[offer.store_city, offer.store_address].filter(Boolean).join(" · ")}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-[15px] font-black text-brand-orange">
                      {formatCurrency(offer.pricing.current_price, currency)}
                    </p>
                    {offer.pricing.discount_percent > 0 && (
                      <p className="text-[11px] text-text-primary/40 line-through">
                        {formatCurrency(offer.pricing.regular_price, currency)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </AccordionBlock>
      )}

      <AccordionBlock label="Nutrition" open={expanded.nutrition} onToggle={() => toggle("nutrition")}>
        {hasNutrition ? (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <NutrientStat label="Calories" value={item.nutrition?.calories || "-"} accent="#EC5800" />
            <NutrientStat label="Carbs" value={item.nutrition?.carbs || "-"} accent="#f6a35a" />
            <NutrientStat label="Fats" value={item.nutrition?.fats || "-"} accent="#d87b34" />
            <NutrientStat label="Protein" value={item.nutrition?.protein || "-"} accent="#FFDEBA" />
            <NutrientStat label="Fiber" value={item.nutrition?.fiber || "-"} accent="#c18d61" />
            <NutrientStat label="Sugar" value={item.nutrition?.sugar || "-"} accent="#ee9656" />
          </div>
        ) : (
          <p className="pt-3 text-sm text-text-primary/40">
            Nutritional information is not available for this product.
          </p>
        )}
      </AccordionBlock>

      {hasStats && (
        <AccordionBlock label="Price history (30 days)" open={expanded.stats} onToggle={() => toggle("stats")}>
          <div className="grid gap-3 pt-1 sm:grid-cols-3">
            <QuickFact label="Min price" value={formatCurrency(item.stats!.minPrice30d, currency)} />
            <QuickFact label="Avg price" value={formatCurrency(item.stats!.avgPrice30d, currency)} />
            <QuickFact label="Max price" value={formatCurrency(item.stats!.maxPrice30d, currency)} />
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-bg-elevated px-3 py-2">
            <span className="text-[13px] font-semibold text-text-primary/60">Trend:</span>
            <span className="text-[13px] font-bold text-text-primary">
              {item.stats!.priceTrend === "up"
                ? "Rising"
                : item.stats!.priceTrend === "down"
                  ? "Dropping"
                  : "Stable"}
            </span>
          </div>
        </AccordionBlock>
      )}

      <AccordionBlock label="Details & allergens" open={expanded.details} onToggle={() => toggle("details")}>
        <div className="space-y-4 text-sm text-text-primary/60">
          <DetailLine
            title="Allergens"
            values={item.allergens?.length ? item.allergens : ["No major allergens listed"]}
          />
          <DetailLine
            title="Notes"
            values={item.notes?.length ? item.notes : ["No extra notes available"]}
          />
        </div>
      </AccordionBlock>
    </div>
  );
};

function OptionBlock({ label, content }: { label: string; content: ReactNode }) {
  return (
    <div className="h-full rounded-[1.2rem] border border-glass/10 bg-bg-darker p-4 shadow-[0_10px_20px_rgba(0,0,0,0.08)]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-primary/50">{label}</p>
      <div className="mt-3">{content}</div>
    </div>
  );
}

function SoftTag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-glass/10 bg-bg-highest px-3 py-1.5 text-sm font-semibold text-text-primary">
      {children}
    </span>
  );
}

function AccordionBlock({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[1.25rem] border border-glass/10 bg-bg-darker shadow-[0_10px_18px_rgba(0,0,0,0.08)]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition hover:bg-glass/5"
      >
        <span className="text-base font-semibold text-text-primary">{label}</span>
        <span className={cn("text-text-primary transition duration-300", open ? "rotate-180 text-brand-orange" : "")}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      {open ? <div className="border-t border-glass/5 px-5 py-4">{children}</div> : null}
    </div>
  );
}

function QuickFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1rem] bg-bg-highest px-4 py-3">
      <p className="text-[10px] uppercase tracking-[0.24em] text-text-primary/50">{label}</p>
      <p className="mt-2 font-semibold text-text-primary">{value}</p>
    </div>
  );
}

function NutrientStat({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="rounded-[1rem] border border-glass/10 bg-bg-elevated p-4">
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.24em] text-text-primary/50">{label}</p>
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: accent }} />
      </div>
      <p className="mt-3 text-xl font-black text-text-primary">{value}</p>
    </div>
  );
}

function DetailLine({ title, values }: { title: string; values: string[] }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-text-primary/50">{title}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {values.map((value) => (
          <span
            key={`${title}-${value}`}
            className="rounded-full border border-brand-orange/20 bg-brand-orange/10 px-3 py-1.5 text-xs font-semibold text-text-primary"
          >
            {value}
          </span>
        ))}
      </div>
    </div>
  );
}

function ReviewCard({ author, stars, text }: { author: string; stars: number; text: string }) {
  return (
    <div className="rounded-[1rem] border border-glass/10 bg-bg-elevated p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-semibold text-text-primary">{author}</p>
          <div className="mt-1 flex items-center gap-1 text-brand-orange">
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={index}>{index < stars ? "\u2605" : "\u2606"}</span>
            ))}
          </div>
        </div>
        <span className="rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-semibold text-brand-orange">
          Verified
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-text-primary/60">{text}</p>
    </div>
  );
}

function ActionIconButton({
  label,
  onClick,
  icon,
}: {
  label: string;
  onClick: () => void;
  icon: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-glass/10 bg-glass/10 text-text-primary transition hover:border-brand-orange hover:bg-glass/20 hover:text-brand-orange"
    >
      {icon}
    </button>
  );
}

function HeartBadge({ filled }: { filled: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 21C11.7 21 11.4 20.9 11.2 20.7C7.8 17.8 5.5 15.7 4 13.9C2.5 12.1 1.75 10.4 1.75 8.45C1.75 6.85 2.28333 5.5 3.35 4.4C4.41667 3.3 5.75 2.75 7.35 2.75C8.25 2.75 9.10833 2.94167 9.925 3.325C10.7417 3.70833 11.4333 4.25 12 4.95C12.5667 4.25 13.2583 3.70833 14.075 3.325C14.8917 2.94167 15.75 2.75 16.65 2.75C18.25 2.75 19.5833 3.3 20.65 4.4C21.7167 5.5 22.25 6.85 22.25 8.45C22.25 10.4 21.5 12.1 20 13.9C18.5 15.7 16.2 17.8 12.8 20.7C12.6 20.9 12.3 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}