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
        bg: {
          main: "rgb(var(--bg-main) / <alpha-value>)",
          surface: "rgb(var(--bg-surface) / <alpha-value>)",
          elevated: "rgb(var(--bg-elevated) / <alpha-value>)",
          highest: "rgb(var(--bg-highest) / <alpha-value>)",
          darker: "rgb(var(--bg-darker) / <alpha-value>)",
          deep: "rgb(var(--bg-deep) / <alpha-value>)",
          deepest: "rgb(var(--bg-deepest) / <alpha-value>)",
        },
        text: {
          main: "rgb(var(--text-main) / <alpha-value>)",
          primary: "rgb(var(--text-primary) / <alpha-value>)",
        },
        brand: {
          orange: "rgb(var(--brand-orange) / <alpha-value>)",
          orangeDark: "rgb(var(--brand-orange-dark) / <alpha-value>)",
          store: "rgb(var(--store-accent) / <alpha-value>)",
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