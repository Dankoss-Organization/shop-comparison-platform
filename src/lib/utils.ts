import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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