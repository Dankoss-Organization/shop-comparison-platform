/**
 * @file chain_components.tsx
 * @description Presentational UI components for building visually connected node sequences (e.g., linked toolbars or breadcrumbs).
 * @pattern Compound Components: `ChainIcon` and `Connection` are designed to be composed together to form a continuous visual chain.
 * @pattern Presentational Component: Purely visual, relying on props to handle interactions and content.
 */
"use client";

import Image from "next/image";

/**
 * An interactive, circular container for icons or small elements.
 * Features glassmorphic styling, interactive hover/active states, and a standardized hit area.
 *
 * @param {Object} props - The component properties.
 * @param {React.ReactNode} props.children - The internal icon or element to display inside the container.
 * @param {() => void} [props.onClick] - Optional callback function triggered when the button is clicked.
 * @returns {JSX.Element} The styled interactive button.
 */

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
      className="group relative z-10 flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-[#5A505A]/70 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#EC5800] hover:shadow-[0_8px_20px_rgba(236,88,0,0.4)] active:scale-90 active:translate-y-0"
    >
      <span className="transition-transform duration-300 group-hover:scale-110 flex items-center justify-center">
        {children}
      </span>
    </button>
  );
}

/**
 * A purely visual connector element used to link `ChainIcon` components together.
 * Renders a stylized SVG link that natively sits horizontally, with support for vertical rotation.
 *
 * @param {Object} props - The component properties.
 * @param {boolean} [props.vertical=false] - If true, rotates the connector 90 degrees and adjusts spacing for vertical layouts.
 * @returns {JSX.Element} The styled visual connector.
 */

export function Connection({ vertical = false }: { vertical?: boolean }) {
  return (
    <div
      className={`
        relative z-0 shrink-0 flex items-center justify-center
        ${vertical ? "h-[36px] w-[45px]" : "mx-[-4px]"}
        transition-opacity duration-500 hover:opacity-70
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