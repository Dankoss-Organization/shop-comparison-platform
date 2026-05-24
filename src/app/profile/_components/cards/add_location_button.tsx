"use client";

interface AddLocationButtonProps {
  onClick?: () => void;
}

export default function AddLocationButton({ onClick }: AddLocationButtonProps) {
  return (
    <button 
      onClick={onClick} 
      className="group flex h-full min-h-[160px] sm:min-h-[220px] w-full flex-col items-center justify-center gap-3 sm:gap-4 rounded-[24px] sm:rounded-[32px] border-2 border-dashed border-black/10 dark:border-[#FFDEBA]/10 bg-white/30 dark:bg-[rgba(30,26,30,0.1)] transition-all duration-500 hover:-translate-y-1 hover:border-brand-orange/40 hover:bg-brand-orange/5 hover:shadow-sm dark:hover:shadow-[0_15px_30px_rgba(236,88,0,0.1)]"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/5 dark:bg-[rgba(45,40,45,0.6)] shadow-sm dark:shadow-[2px_2px_1px_rgba(255,222,186,0.1)] text-text-main/50 dark:text-text-primary/70 transition-all duration-300 group-hover:bg-brand-orange group-hover:text-white dark:group-hover:shadow-[2px_2px_1px_rgba(236,88,0,0.4)] group-hover:scale-110">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </div>
      <span className="text-[15px] font-bold uppercase tracking-[1px] text-text-muted dark:text-text-primary/60 transition-colors duration-300 group-hover:text-brand-orange dark:group-hover:text-text-primary">Add New Address</span>
    </button>
  );
}