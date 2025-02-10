const { transform } = require('typescript');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "375px",
      sm: "640px",
      md: "1000px",
      lg: "1200px",
      xl: "1280px",
      "2xl": "1536px",
    },
    fontFamily: {
      sans: ["sans-serif", "system-ui"],
      roboto: ["Roboto", "sans-serif"],
      "funnel-sans": ["Funnel Sans", "sans-serif"],
      "poppins": ["Poppins", "sans-serif"],
    },
    extend: {
      fontSize: {
        "label-text": ["1.05rem"],
        "sub-heading": "calc(1.26rem + 0.12vw)",
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      colors: {
        "text-primary": "#3F4254",
        "sub-heading": "#181C32",
        "order-primary": "#009EF7",
        "progress-step": "#009EF7",
        "card-background": "#F1FAFF ",
        "price-info": "#F1416C",
        "order-button": "#50CD89",
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
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: 0, transform: "-translateY(10px)"
          },
          "100%": {
            opacity: 1, transform: "translateY(0)"
          },
        },
        fadeOut: {
          "0%": {
            opacity: 1, transform: "translateY(0)"
          },
          "100%": {
            opacity: 0, transform: "-translateY(10px)"
          },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        fadeOut: 'fadeOut 0.5s ease-in-out'
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
