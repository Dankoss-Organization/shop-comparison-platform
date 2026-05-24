/**
 * @file locations_map.tsx
 * * Provides the interactive store locator interface. 
 * Combines React-Leaflet map rendering, mock store data, and a responsive 
 * filtering sidebar to browse and view specific store locations.
 */

"use client";

import { useState, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { useLocationsStore } from "@/Store/use_locations_store";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export type Store = {
  id: string;
  latitude: number;
  longitude: number;
  address: string;
  openingHour: string;
  closingHour: string;
  city: string;
  brandId: string;
  phone?: string;
};

const MOCK_STORES: Store[] = [
  { id: "s_silpo_gulliver",     latitude: 50.4385, longitude: 30.5222, address: "Спортивна площа, 1a (ТРЦ Gulliver)",          openingHour: "08:00", closingHour: "23:00", city: "Київ", brandId: "brand_silpo",  phone: "+380 44 000 0001" },
  { id: "s_silpo_rivermall",    latitude: 50.4048, longitude: 30.6143, address: "Дніпровська набережна, 12 (ТРЦ River Mall)",   openingHour: "08:00", closingHour: "23:00", city: "Київ", brandId: "brand_silpo",  phone: "+380 44 000 0002" },
  { id: "f_fora_shota",         latitude: 50.4363, longitude: 30.5186, address: "вул. Шота Руставелі, 24",                      openingHour: "08:00", closingHour: "23:00", city: "Київ", brandId: "brand_fora",   phone: "+380 44 000 0003" },
  { id: "f_fora_saksaganskogo", latitude: 50.4420, longitude: 30.4950, address: "вул. Саксаганського, 105",                    openingHour: "08:00", closingHour: "23:00", city: "Київ", brandId: "brand_fora",   phone: "+380 44 000 0004" },
  { id: "a_atb_obolon",         latitude: 50.5089, longitude: 30.4979, address: "просп. Оболонський, 22",                      openingHour: "07:00", closingHour: "23:00", city: "Київ", brandId: "brand_atb",    phone: "+380 44 000 0005" },
  { id: "z_novus_poznyaky",     latitude: 50.3934, longitude: 30.6197, address: "вул. Позняківська, 4",                        openingHour: "08:00", closingHour: "22:00", city: "Київ", brandId: "brand_novus",  phone: "+380 44 000 0006" },
  { id: "z_auchan_lavina",      latitude: 50.5012, longitude: 30.3648, address: "просп. Берестейський, 139 (ТРЦ Lavina Mall)", openingHour: "09:00", closingHour: "22:00", city: "Київ", brandId: "brand_auchan", phone: "+380 44 000 0007" },
];

const BRANDS: Record<string, { name: string; color: string }> = {
  brand_silpo:  { name: "Silpo",  color: "#e63946" },
  brand_fora:   { name: "Fora",   color: "#2a9d8f" },
  brand_atb:    { name: "ATB",    color: "#e9c46a" },
  brand_novus:  { name: "Novus",  color: "#457b9d" },
  brand_auchan: { name: "Auchan", color: "#e76f51" },
  brand_varus:  { name: "Varus",  color: "#8338ec" },
  brand_metro:  { name: "Metro",  color: "#06d6a0" },
};

const brandName  = (id: string) => BRANDS[id]?.name  ?? id.replace("brand_", "");
const brandColor = (id: string) => BRANDS[id]?.color ?? "#EC5800";
const storeSlug  = (id: string) => brandName(id).toLowerCase();

function isOpenNow(o: string, c: string) {
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const [oh, om] = o.split(":").map(Number);
  const [ch, cm] = c.split(":").map(Number);
  return nowMin >= oh * 60 + om && nowMin <= ch * 60 + cm;
}

function directionsUrl(address: string, city: string) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address + ", " + city)}`;
}

function MapFlyTo({ store }: { store: Store | null }) {
  const map = useMap();
  useEffect(() => {
    if (store) map.flyTo([store.latitude, store.longitude], 15, { duration: 1 });
  }, [store, map]);
  return null;
}

function coloredIcon(color: string, selected: boolean) {
  const size = selected ? 40 : 32;
  const svg = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="14" fill="${color}" stroke="white" stroke-width="${selected ? 3.5 : 2.5}"/>
      <circle cx="16" cy="16" r="5" fill="white"/>
    </svg>
  `);
  return new L.Icon({
    iconUrl: `data:image/svg+xml,${svg}`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
}

function FilterLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-text-primary/30">
      {children}
    </p>
  );
}

function StoreCard({ store, selected, onClick }: { store: Store; selected: boolean; onClick: () => void }) {
  const open = isOpenNow(store.openingHour, store.closingHour);
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-full w-full flex-col items-start rounded-2xl border p-3 text-left transition-all duration-200 ${
        selected
          ? "border-brand-orange bg-brand-orange/10 shadow-[0_0_12px_rgb(var(--brand-orange)/_0.15)]"
          : "border-glass/10 bg-bg-elevated hover:border-brand-orange/30 hover:bg-brand-orange/5"
      }`}
    >
      <div className="flex w-full items-center justify-between gap-2">
        <span className="font-bold" style={{ color: brandColor(store.brandId) }}>
          {brandName(store.brandId)}
        </span>
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${open ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"}`}>
          {open ? "Open" : "Closed"}
        </span>
      </div>
      <span className="mt-1 line-clamp-1 text-[11px] text-text-primary/50">{store.address}</span>
      <span className="mt-0.5 text-[11px] text-text-primary/35">{store.openingHour} – {store.closingHour}</span>
    </button>
  );
}

function StoreDetail({ store, onClose }: { store: Store; onClose: () => void }) {
  const open = isOpenNow(store.openingHour, store.closingHour);
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-brand-orange/20 bg-bg-elevated p-4 shadow-[0_0_20px_rgb(var(--brand-orange)/_0.08)]">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-lg font-black" style={{ color: brandColor(store.brandId) }}>
            {brandName(store.brandId)}
          </span>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${open ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"}`}>
            {open ? "Open now" : "Closed"}
          </span>
        </div>
        <button onClick={onClose} className="ml-2 shrink-0 text-text-primary/30 hover:text-text-primary transition-colors text-lg leading-none">✕</button>
      </div>

      <div className="flex flex-col gap-1.5 rounded-xl bg-bg-surface p-3 text-sm text-text-primary/60">
        <span className="flex items-center gap-2"><span className="text-base">📍</span>{store.address}, {store.city}</span>
        <span className="flex items-center gap-2"><span className="text-base">🕐</span>{store.openingHour} – {store.closingHour}</span>
        {store.phone && <span className="flex items-center gap-2"><span className="text-base">📞</span>{store.phone}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <Link href={`/store/${storeSlug(store.brandId)}`}
          className="flex h-9 items-center justify-center rounded-xl bg-brand-orange text-sm font-bold text-white transition hover:brightness-110 active:scale-95">
          View Store Page
        </Link>
        <Link href={`/catalog?store=${store.id}`}
          className="flex h-9 items-center justify-center rounded-xl border border-brand-orange/40 text-sm font-semibold text-brand-orange transition hover:bg-brand-orange/10 active:scale-95">
          All Products Here
        </Link>
        <a href={directionsUrl(store.address, store.city)} target="_blank" rel="noopener noreferrer"
          className="flex h-9 items-center justify-center gap-1.5 rounded-xl border border-glass/10 bg-bg-surface text-sm font-semibold text-text-primary/60 transition hover:border-brand-orange/20 hover:text-text-primary active:scale-95">
          Get Directions <span className="text-[11px]">↗</span>
        </a>
      </div>
    </div>
  );
}

export default function LocationsMap() {
  const [stores] = useState<Store[]>(MOCK_STORES);

  const {
    filterBrand, setFilterBrand,
    filterOpenNow, setFilterOpenNow,
    filterCity, setFilterCity,
    selectedStoreId, setSelectedStoreId,
  } = useLocationsStore();

  const selected = stores.find(s => s.id === selectedStoreId) ?? null;
  const setSelected = (store: Store | null) => setSelectedStoreId(store?.id ?? null);

  const cities = useMemo(() => [...new Set(stores.map(s => s.city))], [stores]);
  const brands = useMemo(() => [...new Set(stores.map(s => s.brandId))], [stores]);
  const hasFilters = !!(filterBrand || filterOpenNow || filterCity);

  const filteredStores = useMemo(() => stores.filter(s => {
    if (filterBrand && s.brandId !== filterBrand) return false;
    if (filterOpenNow && !isOpenNow(s.openingHour, s.closingHour)) return false;
    if (filterCity && s.city !== filterCity) return false;
    return true;
  }), [stores, filterBrand, filterOpenNow, filterCity]);

  function resetFilters() {
    setFilterBrand(null);
    setFilterOpenNow(false);
    setFilterCity(null);
  }

  return (
    <div className="relative flex h-[100dvh] w-full flex-col-reverse overflow-hidden bg-bg-surface lg:flex-row">

      <div className="relative z-10 flex flex-1 flex-col gap-4 overflow-y-auto p-4 md:gap-5 md:p-6 lg:h-full lg:w-[340px] lg:flex-none lg:border-r lg:border-glass/10 lg:p-5">

        <div className="flex items-center justify-between">
          <h1 className="text-xl font-black text-text-primary">Store Locations</h1>
          {hasFilters && (
            <button onClick={resetFilters}
              className="text-[11px] font-semibold text-brand-orange transition hover:underline">
              Reset filters
            </button>
          )}
        </div>

        <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-5 lg:flex lg:flex-col lg:gap-4">
          <div>
            <FilterLabel>Brand</FilterLabel>
            <div className="flex flex-wrap gap-1.5">
              <button onClick={() => setFilterBrand(null)}
                className={`rounded-full px-3 py-1 text-[11px] font-bold transition ${!filterBrand ? "bg-brand-orange text-white" : "bg-bg-elevated text-text-primary/60 hover:bg-brand-orange/10"}`}>
                All
              </button>
              {brands.map(b => (
                <button key={b} onClick={() => setFilterBrand(filterBrand === b ? null : b)}
                  className={`rounded-full px-3 py-1 text-[11px] font-bold transition ${filterBrand === b ? "text-white" : "bg-bg-elevated text-text-primary/60 hover:bg-brand-orange/10"}`}
                  style={filterBrand === b ? { backgroundColor: brandColor(b) } : {}}>
                  {brandName(b)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:justify-between lg:flex-col lg:justify-start">
            <div>
              <FilterLabel>Status</FilterLabel>
              <button onClick={() => setFilterOpenNow(!filterOpenNow)}
                className={`flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold transition ${filterOpenNow ? "bg-green-500/20 text-green-400" : "bg-bg-elevated text-text-primary/60 hover:bg-green-500/10"}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${filterOpenNow ? "bg-green-400" : "bg-text-primary/30"}`} />
                Open Now
              </button>
            </div>

            {cities.length > 1 && (
              <div>
                <FilterLabel>City</FilterLabel>
                <div className="flex flex-wrap gap-1.5">
                  {cities.map(city => (
                    <button key={city} onClick={() => setFilterCity(filterCity === city ? null : city)}
                      className={`rounded-full px-3 py-1 text-[11px] font-bold transition ${filterCity === city ? "bg-brand-orange text-white" : "bg-bg-elevated text-text-primary/60 hover:bg-brand-orange/10"}`}>
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="mt-1 text-[11px] text-text-primary/30">
          {filteredStores.length} store{filteredStores.length !== 1 ? "s" : ""} found
        </p>

        <div className="hidden lg:block">
          {selected && <StoreDetail store={selected} onClose={() => setSelected(null)} />}
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-1 lg:gap-3">
          {filteredStores.map(store => (
            <StoreCard key={store.id} store={store} selected={selected?.id === store.id} onClick={() => setSelected(store)} />
          ))}
          {filteredStores.length === 0 && (
            <p className="col-span-full py-8 text-center text-sm text-text-primary/30">No stores match your filters</p>
          )}
        </div>
      </div>

      <div className="relative z-0 h-[45vh] w-full shrink-0 border-b border-glass/10 md:h-[50vh] lg:h-full lg:flex-1 lg:border-none">
        <MapContainer center={[50.4501, 30.5234]} zoom={12} className="h-full w-full z-0">
          <TileLayer
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapFlyTo store={selected} />
          {filteredStores.map(store => (
            <Marker
              key={store.id}
              position={[store.latitude, store.longitude]}
              icon={coloredIcon(brandColor(store.brandId), selected?.id === store.id)}
              eventHandlers={{ click: () => setSelected(store) }}
            >
              <Popup>
                <strong>{brandName(store.brandId)}</strong><br />
                {store.address}<br />
                {store.openingHour} – {store.closingHour}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {selected && (
        <div className="absolute bottom-0 left-0 right-0 z-[1000] max-h-[90dvh] overflow-y-auto rounded-t-3xl bg-bg-surface p-5 shadow-[0_-10px_40px_rgba(0,0,0,0.4)] transition-transform md:p-8 lg:hidden">
          <StoreDetail store={selected} onClose={() => setSelected(null)} />
        </div>
      )}
    </div>
  );
}