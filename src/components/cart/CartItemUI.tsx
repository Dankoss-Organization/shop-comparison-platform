/**
 * @file CartItemUI.tsx
 * @description Presentation component for an individual cart item, handling its display and emitting quantity/removal actions.
 */
import Image from "next/image";

/**
 * @description Displays a single item within the cart drawer, rendering its thumbnail, title, price, and quantity controls.
 * * @param {Object} props - The component props.
 * @param {any} props.item - The data object representing the item in the cart.
 * @param {() => void} props.onIncrease - Callback triggered when the increment button is clicked.
 * @param {() => void} props.onDecrease - Callback triggered when the decrement button is clicked.
 * @param {() => void} props.onRemove - Callback triggered when the removal (X) button is clicked.
 * @param {() => void} props.onClick - Callback triggered when the item's main area is clicked (e.g., to view details).
 * * @returns {JSX.Element} The rendered list item UI.
 */
export function CartItemUI({ 
  item, 
  onIncrease, 
  onDecrease, 
  onRemove,
  onClick
}: { 
  item: any; 
  onIncrease: () => void; 
  onDecrease: () => void; 
  onRemove: () => void;
  onClick: () => void;
  
}) {
  return (
    <div className="flex gap-4 border-b border-white/5 py-5 last:border-0">
      <div 
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-[#1f1a1f] border border-white/5 shadow-inner cursor-pointer transition-transform hover:scale-105"
        onClick={onClick}
      >
        <Image src={item.image} alt={item.title} fill className="object-cover" />
      </div>
      
      <div className="flex flex-1 flex-col justify-between py-0.5">
        <div className="flex justify-between items-start">
          <div className="cursor-pointer group" onClick={onClick}>
            <h4 className="font-bold text-[#FFDEBA] leading-tight transition-colors group-hover:text-[#EC5800]">{item.title}</h4>
            <p className="text-[10px] uppercase tracking-wider text-[#FFDEBA66] mt-1">{item.market}</p>
          </div>
          <button onClick={onRemove} className="text-[#FFDEBA33 hover:text-[#EC5800] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <p className="font-black text-[#EC5800] text-lg">{item.price}</p>
          <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/20 p-1">
            <button onClick={onDecrease} className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1f1a1f] text-[#FFDEBA66] hover:text-[#FFDEBA] transition">-</button>
            <span className="w-6 text-center text-xs font-black text-[#FFDEBA]">{item.cartQuantity}</span>
            <button onClick={onIncrease} className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1f1a1f] text-[#FFDEBA66] hover:text-[#FFDEBA] transition">+</button>
          </div>
        </div>
      </div>
    </div>
  );
}