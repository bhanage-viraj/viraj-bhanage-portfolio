import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FAF9F6",
        ink: "#141414",
        "ink-muted": "#6B6B66",
        line: "#E5E2DA",
        signal: "#0F6E6E",
        surface: "#F3F1EB",
        coral: "#FF6B4A",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        hero: [
          "clamp(3.25rem, 9.2vw, 8rem)",
          { lineHeight: "0.94", letterSpacing: "-0.03em" },
        ],
        section: [
          "clamp(2.5rem, 5.2vw, 4.5rem)",
          { lineHeight: "0.98", letterSpacing: "-0.025em" },
        ],
        study: [
          "clamp(2.5rem, 5.6vw, 5rem)",
          { lineHeight: "0.96", letterSpacing: "-0.025em" },
        ],
        plate: [
          "clamp(1.9rem, 3.2vw, 2.75rem)",
          { lineHeight: "1.02", letterSpacing: "-0.02em" },
        ],
        lead: [
          "clamp(1.5rem, 2.4vw, 2.1rem)",
          { lineHeight: "1.22", letterSpacing: "-0.015em" },
        ],
        card: ["1.375rem", { lineHeight: "1.3", letterSpacing: "-0.02em" }],
        body: ["1.0625rem", { lineHeight: "1.65" }],
        data: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.1em" }],
      },
      maxWidth: {
        page: "1200px",
        wide: "1440px",
        prose: "64ch",
        study: "42rem",
      },
      borderRadius: {
        card: "0.75rem",
        plate: "0.5rem",
      },
      spacing: {
        section: "7.5rem",
        "section-sm": "5rem",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.45", transform: "scale(0.8)" },
        },
      },
      animation: {
        "fade-in": "fade-in 500ms ease-out both",
        pulse: "pulse 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
