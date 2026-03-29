import Image from "next/image";

export function ChainIcon({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="group w-[42px] h-[42px] shrink-0 rounded-full 
           bg-[#5A505A]/70 backdrop-blur-sm 
           flex items-center justify-center relative z-10 
           transition-all duration-300 
           hover:bg-[#FF7A00] 
           hover:scale-110
           shadow-md active:scale-95"
    >
      {children}
    </button>
  );
}

export function Connection() {
  return (
    <div className="shrink-0 relative z-0 -mx-[4px]">
      <Image src="/Connection.svg" alt="" width={30} height={20} style={{ height: 'auto' }} />
    </div>
  );
}