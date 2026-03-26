import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        creme: {
          50: "#FDFAF4",
          100: "#FDF8F0",
          200: "#F5ECD8",
          300: "#E8D5B7",
          400: "#D4B896",
        },
        marrom: {
          50: "#F5EDE8",
          100: "#E8D0C4",
          200: "#C4A08A",
          300: "#8B6348",
          400: "#5C3D2E",
          500: "#3D2B1F",
          600: "#2A1D14",
          700: "#1A110C",
        },
        terracota: {
          100: "#F2D9C8",
          200: "#E5B49A",
          300: "#D4896A",
          400: "#C4713C",
          500: "#A85C2A",
          600: "#8B4A1F",
        },
        sage: {
          100: "#E8EDE6",
          200: "#C8D5C4",
          300: "#9DB595",
          400: "#6E8E65",
          500: "#4A6B42",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        caderno: "8px 12px 32px rgba(61, 43, 31, 0.18), 2px 4px 12px rgba(61, 43, 31, 0.1)",
        "caderno-hover": "12px 16px 40px rgba(61, 43, 31, 0.24), 4px 6px 16px rgba(61, 43, 31, 0.14)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
