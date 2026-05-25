"use client";

import BaseSortDropdown, { SortOption } from "@/Components/UI/base_sort_dropdown";

type StoreSortValue = "updated" | "price_asc" | "discount";

interface StoreSortDropdownProps {
  value: StoreSortValue;
  onChange: (value: StoreSortValue) => void;
}

const STORE_SORT_OPTIONS: SortOption[] = [
  { value: "updated", label: "Newest Updates" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "discount", label: "Biggest Discounts" },
];

export default function StoreSortDropdown({ value, onChange }: StoreSortDropdownProps) {
  return (
    <BaseSortDropdown 
      options={STORE_SORT_OPTIONS} 
      value={value} 
      onChange={(val) => onChange(val as StoreSortValue)} 
    />
  );
}