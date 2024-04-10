/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      boxShadow: {
        "5xl": "20px 20px 50px rgba(0, 0, 0, 0.5)",
      },
    },
    fontFamily: {
      dosis: ["Dosis"],
    },
  },
  plugins: [require("flowbite/plugin")],
};
