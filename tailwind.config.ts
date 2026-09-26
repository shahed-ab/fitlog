import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        page: "#0f1115",
        surface: "#161922",
        "surface-border": "#232732",
        lime: {
          DEFAULT: "#ccff00",
          accent: "#ccff00",
          hover: "#b8e600",
          muted: "rgba(204, 255, 0, 0.12)",
          active: "#242c16",
        },
        "text-primary": "#f5f5f5",
        "text-muted": "#8b8f98",
      },
      fontFamily: {
        display: ["var(--font-oswald)", "Oswald", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.5)",
        lime: "0 0 25px rgba(204, 255, 0, 0.25)",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        fitlog: {
          "primary": "#ccff00",
          "primary-content": "#0f1115",
          "secondary": "#232732",
          "secondary-content": "#f5f5f5",
          "accent": "#ccff00",
          "accent-content": "#0f1115",
          "neutral": "#161922",
          "neutral-content": "#f5f5f5",
          "base-100": "#0f1115",
          "base-200": "#161922",
          "base-300": "#232732",
          "base-content": "#f5f5f5",
          "info": "#3abff8",
          "success": "#ccff00",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      },
    ],
    defaultTheme: "fitlog",
    base: true,
    styled: true,
    utils: true,
  },
};

export default config;
