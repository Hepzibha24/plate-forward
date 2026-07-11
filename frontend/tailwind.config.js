/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          950: "#0a0e14",
          900: "#0d1117",
          800: "#131a24",
          700: "#1b2430",
          600: "#232e3d",
        },
        panel: {
          DEFAULT: "#111826",
          border: "#232d3d",
        },
        accent: {
          cyan: "#22d3ee",
          magenta: "#e879f9",
        },
        severity: {
          critical: "#f87171",
          warning: "#fb923c",
          healthy: "#4ade80",
          info: "#38bdf8",
        },
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "'Space Mono'", "ui-monospace", "monospace"],
        sans: ["'Inter'", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(34,211,238,0.25), 0 0 16px rgba(34,211,238,0.15)",
        "glow-critical": "0 0 0 1px rgba(248,113,113,0.35), 0 0 20px rgba(248,113,113,0.2)",
        "glow-warning": "0 0 0 1px rgba(251,146,60,0.3), 0 0 18px rgba(251,146,60,0.18)",
        "glow-healthy": "0 0 0 1px rgba(74,222,128,0.3), 0 0 16px rgba(74,222,128,0.15)",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.35 },
        },
      },
      animation: {
        "pulse-dot": "pulse-dot 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
