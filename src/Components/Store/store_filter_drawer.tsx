"use client";

import { 
  BaseFilterDrawer, 
  FilterPriceCap, 
  FilterRating, 
  FilterDiscount 
} from "@/Components/UI/base_filter_drawer";

export interface StoreFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  maxPrice: number;
  setMaxPrice: (val: number) => void;
  priceBounds: { min: number; max: number };
  minRating: number;
  setMinRating: (val: number) => void;
  minDiscount: number;
  setMinDiscount: (val: number) => void;
  onReset: () => void;
}

export default function StoreFilterDrawer(props: StoreFilterDrawerProps) {
  return (
    <BaseFilterDrawer 
      isOpen={props.isOpen} 
      onClose={props.onClose} 
      onReset={props.onReset}
      title="Refine store deals"
    >
      <FilterPriceCap maxPrice={props.maxPrice} setMaxPrice={props.setMaxPrice} priceBounds={props.priceBounds} />
      <FilterRating minRating={props.minRating} setMinRating={props.setMinRating} />
      <FilterDiscount minDiscount={props.minDiscount} setMinDiscount={props.setMinDiscount} hasBorder={false} />
    </BaseFilterDrawer>
  );
}