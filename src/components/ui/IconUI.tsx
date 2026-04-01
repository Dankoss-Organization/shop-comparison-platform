"use client";

import Image from "next/image";

export function ChainIcon({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="group relative z-10 flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-[#5A505A]/70 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-[#EC5800] active:scale-95 shadow-md"
    >
      {children}
    </button>
  );
}

export function Connection() {
  return (
    <div className="relative z-0 -mx-[4px] shrink-0">
      <Image src="/connection.svg" alt="" width={30} height={20} style={{ height: "auto" }} />
    </div>
  );
}
