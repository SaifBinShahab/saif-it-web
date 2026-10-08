/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";

export default {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#12181B",       // Deep Ink - primary/base
        emerald: "#2F4F44",   // Muted Emerald - secondary
        brass: "#B08D57",     // Warm Brass - accent, sparingly
        paper: "#F4F1EA",     // Warm Off-White - light bg
        slate: "#6B7580",     // Cool Slate Grey - secondary text
        teal: "#3E6E6E",      // Muted Teal - technical-callout signal
      },
      fontFamily: {
        heading: ["Fraunces", "Playfair Display", "serif"],
        body: ["Inter", "IBM Plex Sans", "sans-serif"],
        mono: ["JetBrains Mono", "IBM Plex Mono", "monospace"],
        "heading-bn": ["Tiro Bangla", "serif"],
        "body-bn": ["Hind Siliguri", "sans-serif"],
        arabic: ["Amiri", "serif"],
        "arabic-ui": ["Noto Sans Arabic", "Cairo", "sans-serif"],
      },
      maxWidth: {
        content: "72rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(12px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "pill-pulse": {
          "0%, 100%": { opacity: 0.85 },
          "50%": { opacity: 1 },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
      // Use as `prose prose-brand`. Bound to our own CSS variables (which
      // already flip with [data-theme]), so one variant works for both
      // themes — no need for a separate prose-invert toggle.
      typography: {
        brand: {
          css: {
            "--tw-prose-body": "var(--text-muted)",
            "--tw-prose-headings": "var(--text)",
            "--tw-prose-lead": "var(--text-muted)",
            "--tw-prose-links": "var(--accent)",
            "--tw-prose-bold": "var(--text)",
            "--tw-prose-counters": "var(--accent)",
            "--tw-prose-bullets": "var(--accent)",
            "--tw-prose-hr": "var(--border)",
            "--tw-prose-quotes": "var(--text)",
            "--tw-prose-quote-borders": "var(--accent)",
            "--tw-prose-captions": "var(--text-muted)",
            "--tw-prose-code": "var(--signal)",
            "--tw-prose-pre-code": "var(--text)",
            "--tw-prose-pre-bg": "var(--bg)",
            "--tw-prose-th-borders": "var(--border)",
            "--tw-prose-td-borders": "var(--border)",
            maxWidth: "none",
            code: { fontWeight: "500" },
            "code::before": { content: "none" },
            "code::after": { content: "none" },
            pre: { border: "1px solid var(--border)" },
          },
        },
      },
    },
  },
  plugins: [typography],
};
