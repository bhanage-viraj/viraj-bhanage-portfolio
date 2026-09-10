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
        paper: "#F7F7F5",
        ink: "#111111",
        "ink-muted": "#6E6E73",
        line: "#E4E4E0",
        signal: "#5E6AD2",
        surface: "#F1F1EE",
        coral: "#FF6B4A",
      },
      fontFamily: {
        display: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "Segoe UI",
          "sans-serif",
        ],
        body: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Text",
          "Segoe UI",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      fontSize: {
        hero: [
          "clamp(2.75rem, 8vw, 5.25rem)",
          { lineHeight: "0.98", letterSpacing: "-0.045em" },
        ],
        section: [
          "clamp(2rem, 4vw, 3.25rem)",
          { lineHeight: "1.08", letterSpacing: "-0.038em" },
        ],
        study: [
          "clamp(1.75rem, 3vw, 2.75rem)",
          { lineHeight: "1.12", letterSpacing: "-0.032em" },
        ],
        card: [
          "1.375rem",
          { lineHeight: "1.3", letterSpacing: "-0.024em" },
        ],
        body: ["1.125rem", { lineHeight: "1.65" }],
        data: [
          "0.8125rem",
          { lineHeight: "1.4", letterSpacing: "0.08em" },
        ],
      },
      maxWidth: {
        page: "1120px",
        prose: "64ch",
        study: "40rem",
      },
      borderRadius: {
        card: "1.75rem",
      },
      spacing: {
        section: "8rem",
        "section-sm": "5.5rem",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(4%, -3%, 0) scale(1.06)" },
        },
      },
      animation: {
        "fade-in": "fade-in 500ms ease-out both",
        drift: "drift 22s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
