/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      height: {
        chatHeight: "calc(100vh - 90px)",
      },
    },
  },
  plugins: [],
};
