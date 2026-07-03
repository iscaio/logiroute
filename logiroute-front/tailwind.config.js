/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        graphite: {
          950: "#0F1216",
          900: "#14171C",
          800: "#1B1F27",
          700: "#232833",
          600: "#2E3440",
          500: "#3D4351",
        },
        paper: {
          100: "#F3EFE6",
          200: "#ECE9E1",
          400: "#C7C2B6",
          600: "#8992A3",
        },
        manifest: {
          DEFAULT: "#FF6A3D",
          dark: "#E0532A",
          light: "#FFB08A",
        },
        route: {
          available: "#34D399",
          transit: "#F5A623",
          idle: "#5B6272",
          danger: "#F0554C",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'IBM Plex Sans'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      backgroundImage: {
        "dash-line":
          "repeating-linear-gradient(90deg, #3D4351 0 10px, transparent 10px 18px)",
      },
      boxShadow: {
        stub: "inset 0 1px 0 0 rgba(255,255,255,0.03)",
      },
    },
  },
  plugins: [],
}
