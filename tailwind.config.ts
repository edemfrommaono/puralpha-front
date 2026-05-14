import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: {
          900: "#152d4a",
          800: "#1c3553",
          700: "#1e3a5f",
        },
        teal: {
          400: "#52bdc7",
          500: "#4ecdc4",
          100: "#cdfcff",
          50: "#e8f7f8",
        },
        gold: {
          500: "#f2c94c",
          600: "#b8930a",
        },
        gray: {
          50: "#f0f4f8",
          100: "#ecf4f6",
          200: "#f3f4f6",
          500: "#718096",
          600: "#6b7280",
          700: "#4a5568",
          800: "#2d3748",
        }
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        arial: ["Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
