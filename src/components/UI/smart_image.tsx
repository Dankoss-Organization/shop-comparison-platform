/**
 * @file smart_image.tsx
 * @description A reusable, performant image component that provides native lazy loading, an empty-state background placeholder, and standardized hover animations.
 * @pattern Presentational Component: Encapsulates image rendering and visual styling (like `group-hover` scaling) to keep parent layout components clean and consistent.
 */

"use client";

/**
 * Renders an image with a dark placeholder background that shows while the image is loading.
 * Automatically applies a subtle zoom effect when a parent element with the `group` class is hovered.
 * * @param {Object} props - The component properties.
 * @param {string} props.src - The URL source of the image.
 * @param {string} props.alt - The alternative text for the image, crucial for accessibility and SEO.
 * @param {string} [props.className] - Optional custom CSS classes appended to the outer wrapper `div`.
 * @returns {JSX.Element} The styled image component.
 */
export default function SmartImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative h-full w-full overflow-hidden bg-[#2a242a] ${className || ""}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-[1.05]"
      />
    </div>
  );
}