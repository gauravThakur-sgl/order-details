const { transform } = require('typescript');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "text-danger"
  ],
  theme: {
    screens: {
      xs: "375px",
      sm: "640px",
      tablet: "768px",
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
      spacing: {
        15: "60px",
        18: "72px",
        stepNumber: "2px",
      },
      fontSize: {
        "label-text": ["1.05rem"],
        "sub-heading": "calc(1.26rem + 0.12vw)",
        "accordion-title": [".875rem"],
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      colors: {
        "franchise-primary": "#1f499e",
        "franchise-sectionp": "#040404",
        "franchise-sections": "#647082",
        "franchise-textp": "#0A0A0A",
        "franchise-button-text": "#F8FAFC",
        "franchise-consignor-text": "#A1A9B5",
        "franchise-error": "#DD1717",
        "franchise-tag-bg": "#FFF6E4",
        "franchise-tag-text": "#E35F5F",
        "franchise-weight-bg": "#FFF7ED",
        "franchise-weight-text": "#F59300",
        "franchise-select-bg": "#F4F7FA",
        "franchise-totalPrice": "#FFEAD2",
        "danger": "#DD1717",
        "franchise-success": "#17AD6F",

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
