/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#38b6ff",
        primary_light: "#6cc9ff",
        secondary: "#0F172A",
        secondary_two: "#1F2937",
        border_color: "#E5E7EB",
        soft_black: "#111827",
        background: "#F8FAFC",
      },
    },
    keyframes: {
      ripple: {
        "0%": { boxShadow: "0 0 0 0 rgba(249, 155, 36, 0.6)" },
        "70%": { boxShadow: "0 0 0 30px rgba(249, 155, 36, 0)" },
        "100%": { boxShadow: "0 0 0 0 rgba(249, 155, 36, 0)" },
      },
    },
    animation: {
      ripple: "ripple 2s infinite",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
