/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "var(--background, #0b0d12)",
          secondary: "var(--background-secondary, #121620)",
        },
        surface: {
          DEFAULT: "var(--surface, #181d29)",
          elevated: "var(--surface-elevated, #222938)",
        },
        card: "var(--card, #151a24)",
        overlay: "var(--overlay, rgba(11, 13, 18, 0.85))",
        foreground: {
          DEFAULT: "var(--foreground, #f8fafc)",
          secondary: "var(--foreground-secondary, #94a3b8)",
          muted: "var(--foreground-muted, #64748b)",
        },
        border: {
          DEFAULT: "var(--border, #1e293b)",
          subtle: "var(--border-subtle, #111827)",
        },
        primary: {
          DEFAULT: "var(--primary, #e50914)",
          hover: "var(--primary-hover, #f40612)",
          active: "var(--primary-active, #b80710)",
        },
        rating: "var(--rating, #fbbf24)",
        success: "var(--success, #10b981)",
        warning: "var(--warning, #f59e0b)",
        error: "var(--error, #ef4444)",
        info: "var(--info, #3b82f6)",
      },
      boxShadow: {
        subtle: "0 2px 8px rgba(0, 0, 0, 0.3)",
        elevated: "0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 8px 10px -6px rgba(0, 0, 0, 0.5)",
        modal: "0 25px 50px -12px rgba(0, 0, 0, 0.85)",
        glow: "0 0 20px rgba(229, 9, 20, 0.35)",
      },
      borderRadius: {
        sm: "0.375rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        pill: "9999px",
      },
      transitionDuration: {
        fast: "150ms",
        normal: "250ms",
        smooth: "300ms",
        hero: "500ms",
      },
      maxWidth: {
        container: "1440px",
      },
    },
  },
  plugins: [],
};
