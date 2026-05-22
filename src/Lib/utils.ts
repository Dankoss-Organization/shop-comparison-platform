/**
 * @file utils.ts
 * @description Core utility functions for the Dankoss application.
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  amount: number | null | undefined,
  currency: string = "UAH",
  options?: { fractionDigits?: number },
) {
  if (amount == null || !Number.isFinite(amount)) {
    return "N/A";
  }

  const fractionDigits = options?.fractionDigits ?? 2;
  const symbol = currency === "UAH" ? "\u20B4" : "$";
  return `${symbol}${amount.toFixed(fractionDigits)}`;
}

export function parseQuantity(quantity: string) {
  const lower = quantity.toLowerCase().replace(",", ".");
  const match = lower.match(/^([\d.]+)\s*(.*)$/);
  let value = 1;
  let unit = "pcs";
  let isWeight = false;

  if (match) {
    const num = Number.parseFloat(match[1]);
    if (Number.isFinite(num)) value = num;
    const rawUnit = match[2]?.trim() || "";

    if (["kg", "кг"].includes(rawUnit)) {
      unit = "kg";
      isWeight = true;
    } else if (["g", "г"].includes(rawUnit)) {
      unit = "g";
      isWeight = true;
    } else if (rawUnit) {
      unit = rawUnit;
    }
  }

  return { baseValue: value, baseUnit: unit, isWeight };
}