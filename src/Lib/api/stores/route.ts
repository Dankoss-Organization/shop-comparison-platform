/**
 * @file route.ts
 * * Next.js API route endpoint that serves mock store location data.
 * Returns a JSON array of stores containing coordinates, addresses, and hours.
 */

import { NextResponse } from "next/server";

const stores = [
  { id: "s_silpo_gulliver", lng: 30.5222, lat: 50.4385, address: "Спортивна площа, 1a (ТРЦ Gulliver)", open: "08:00", close: "23:00", city: "Київ", brand: "brand_silpo" },
  { id: "s_silpo_rivermall", lng: 30.6143, lat: 50.4048, address: "Дніпровська набережна, 12 (ТРЦ River Mall)", open: "08:00", close: "23:00", city: "Київ", brand: "brand_silpo" },
  { id: "f_fora_shota", lng: 30.5186, lat: 50.4363, address: "вул. Шота Руставелі, 24", open: "08:00", close: "23:00", city: "Київ", brand: "brand_fora" },
  { id: "f_fora_saksaganskogo", lng: 30.495, lat: 50.442, address: "вул. Саксаганського, 105", open: "08:00", close: "23:00", city: "Київ", brand: "brand_fora" },
];

export async function GET() {
  return NextResponse.json(stores);
}