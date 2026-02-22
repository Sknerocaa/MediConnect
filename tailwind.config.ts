import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Users requested Blue (#0A5C9E) and Teal (#2AA9A1)
        brand: {
          50:  "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0A5C9E", // Primary Blue
          600: "#084a7e",
          700: "#063d68",
          800: "#053152",
          900: "#042843",
        },
        teal: {
          50:  "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#2AA9A1", // Secondary Teal
          600: "#228781",
          700: "#1b6b66",
          800: "#15534f",
          900: "#10403d",
        },
        surface: {
          DEFAULT: "#F9FAFB", // User requested light gray background
          white: "#ffffff",
          muted: "#6b7280",
          border: "#f3f4f6",
        },
      },
      spacing: {
        section: "80px",
        mobile: "48px",
        card: "24px",
        gap: "32px",
      },
      maxWidth: {
        container: "1280px",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"], // Keeping it clean and uniform
      },
      lineHeight: {
        tight: "1.2",
        relaxed: "1.6",
      },
    },
  },
  plugins: [],
};

export default config;
