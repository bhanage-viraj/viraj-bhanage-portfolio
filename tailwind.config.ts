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
        paper: "#FAFAF8",
        ink: "#14181A",
        "ink-muted": "#5C6366",
        line: "#E3E0D9",
        signal: "#0E6B6B",
        coral: "#FF6B4A",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        hero: [
          "clamp(2.5rem, 5.4vw, 3.75rem)",
          { lineHeight: "1.08", letterSpacing: "-0.035em" },
        ],
        section: [
          "clamp(1.625rem, 2.4vw, 2.125rem)",
          { lineHeight: "1.15", letterSpacing: "-0.03em" },
        ],
        study: [
          "clamp(1.5rem, 2.2vw, 1.875rem)",
          { lineHeight: "1.2", letterSpacing: "-0.028em" },
        ],
        card: [
          "1.25rem",
          { lineHeight: "1.28", letterSpacing: "-0.022em" },
        ],
        body: ["1.0625rem", { lineHeight: "1.7" }],
        data: [
          "0.6875rem",
          { lineHeight: "1.4", letterSpacing: "0.12em" },
        ],
      },
      maxWidth: {
        page: "1080px",
        prose: "62ch",
        study: "38rem",
      },
      spacing: {
        section: "7rem",
        "section-sm": "5rem",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 280ms ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
