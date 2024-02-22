/* eslint-disable no-undef */

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Kanit", "sans-serif"],
    },
    extend: {
      boxShadow: {
        "3xl": "0 35px 18px -15px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
