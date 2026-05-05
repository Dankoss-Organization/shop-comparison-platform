import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", 
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        
        brand: {
          night: "rgb(var(--brand-night) / <alpha-value>)",
          orange: "rgb(var(--brand-orange) / <alpha-value>)",
          orangeSoft: "rgb(var(--brand-orangeSoft) / <alpha-value>)",
        },
        glass: "rgb(var(--glass-bg) / <alpha-value>)",
      },
      boxShadow: {
        soft: "0 24px 70px rgba(0, 0, 0, 0.28)",
      },
    },
  },
  plugins: [],
};

export default config;