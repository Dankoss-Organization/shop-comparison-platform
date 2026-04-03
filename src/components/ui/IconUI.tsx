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

export function Connection({ vertical = false }: { vertical?: boolean }) {
  return (
    <div
      className={`
        relative z-0 shrink-0 flex items-center justify-center
        ${vertical ? "h-[36px] w-[45px]" : "mx-[-4px]"}
      `}
    >
      <Image
        src="/connection.svg"
        alt=""
        width={30}
        height={20}
        className={vertical ? "rotate-90" : ""}
        style={{ height: "auto" }}
      />
    </div>
  );
}