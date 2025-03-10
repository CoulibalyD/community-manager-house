/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff6600", // Orange
        secondary: "#000000", // Noir
        accent: "#ffffff", // Blanc
      },
    },
  },
  plugins: [],
};
