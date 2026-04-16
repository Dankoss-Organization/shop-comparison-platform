/**
 * @file utils.ts
 * @description Core utility functions for the Dankoss application.
 * @pattern Decorator (Wrapper): The `cn` function acts as a decorator for CSS classes. 
 * It dynamically merges and conditionally applies Tailwind CSS classes to components 
 * at runtime, extending their visual behavior without modifying their underlying structure.
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Parses a quantity string to extract the numeric value, unit, and weight status.
 * Acts as a pure utility algorithm for data normalization.
 * * @param {string} quantity - The raw quantity string (e.g., "1.5 kg", "500 g", "2 packs").
 * @returns {{baseValue: number, baseUnit: string, isWeight: boolean}} An object containing the parsed value, standardized unit, and a boolean indicating if it's a weight measurement.
 */

export function parseQuantity(quantity: string) {
  const lower = quantity.toLowerCase().replace(',', '.');
  const match = lower.match(/^([\d\.]+)\s*(.*)$/);
  let value = 1, unit = "pcs", isWeight = false;
  
  if (match) {
    const num = Number.parseFloat(match[1]);
    if (Number.isFinite(num)) value = num;
    const rawUnit = match[2]?.trim() || "";
    
    if (["kg", "кг"].includes(rawUnit)) { 
      unit = "kg"; 
      isWeight = true; 
    }
    else if (["g", "г"].includes(rawUnit)) { 
      unit = "g"; 
      isWeight = true; 
    }
    else if (rawUnit) {
      unit = rawUnit;
    }
  }
  return { baseValue: value, baseUnit: unit, isWeight };
}