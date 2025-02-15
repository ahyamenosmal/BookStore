/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}", "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lathusca: ["awesome lathusca", "sans-serif"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
