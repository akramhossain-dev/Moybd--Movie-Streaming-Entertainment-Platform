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
          DEFAULT: "var(--background, #090710)",
          secondary: "var(--background-secondary, #0f0b1c)",
        },
        surface: {
          DEFAULT: "var(--surface, #17122b)",
          elevated: "var(--surface-elevated, #221a3f)",
        },
        card: "var(--card, #140f26)",
        overlay: "var(--overlay, rgba(9, 7, 16, 0.88))",
        foreground: {
          DEFAULT: "var(--foreground, #ede9fe)",
          secondary: "var(--foreground-secondary, #c4b5fd)",
          muted: "var(--foreground-muted, #94a3b8)",
        },
        border: {
          DEFAULT: "var(--border, #2a204d)",
          subtle: "var(--border-subtle, #191238)",
        },
        primary: {
          DEFAULT: "var(--primary, #7c3aed)",
          hover: "var(--primary-hover, #8b5cf6)",
          active: "var(--primary-active, #6d28d9)",
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
        glow: "0 0 24px rgba(124, 58, 237, 0.45)",
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
