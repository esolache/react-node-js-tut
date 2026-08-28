/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // TODO: replace with the real brand colors
        brand: {
          primary: "#DC2626", // red accent used across header/buttons
          dark: "#000000", // top utility bar background
        },
      },
    },
  },
  plugins: [],
};
