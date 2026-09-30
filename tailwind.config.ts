import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        heading: ["var(--font-serif)", "sans-serif"],
      },
      colors: {

        sp: {
          purple: "var(--sp-purple)",
          magenta: "var(--sp-magenta)",
          orange: "var(--sp-orange)",
          yellow: "var(--sp-yellow)",
          blue: "var(--sp-blue)",
          teal: "var(--sp-teal)",
          navy: "var(--sp-navy)",
          slate: "var(--sp-slate)",
          light: "var(--sp-light)",
          white: "var(--sp-white)",
        },

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        gold: {
          hover: "hsl(var(--gold-hover))",
        },
        surface: {
          elevated: "hsl(var(--surface-elevated))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        fade: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeDown: {
          from: { opacity: "0", transform: "translateY(-20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeLeft: {
          from: { opacity: "0", transform: "translateX(20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        fadeRight: {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        scale: {
          from: { opacity: "0", transform: "scale(0.9)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        scaleSoft: {
          from: { opacity: "0", transform: "scale(0.98)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        blurUp: {
          from: { opacity: "0", filter: "blur(8px)", transform: "translateY(10px)" },
          to: { opacity: "1", filter: "blur(0)", transform: "translateY(0)" },
        },
      },
      animation: {
        fade: "fade var(--motion-standard) var(--ease-standard) both",
        "fade-up": "fadeUp var(--motion-standard) var(--ease-standard) both",
        "fade-down": "fadeDown var(--motion-standard) var(--ease-standard) both",
        "fade-left": "fadeLeft var(--motion-standard) var(--ease-standard) both",
        "fade-right": "fadeRight var(--motion-standard) var(--ease-standard) both",
        scale: "scale var(--motion-standard) var(--ease-standard) both",
        "scale-soft": "scaleSoft var(--motion-standard) var(--ease-standard) both",
        "blur-up": "blurUp var(--motion-standard) var(--ease-standard) both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
