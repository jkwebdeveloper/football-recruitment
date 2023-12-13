/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary_color: "#004D7F",
      },
      dropShadow: {
        "2xl": "0 2px 9px rgb(255, 255, 255)",
      },
      boxShadow: {
        "2xl":
          "14px 14px 20px 0px rgba(0, 0, 0, 0.14), 14px 14px 10px 0px rgba(0, 0, 0, 0.15) inset",
        "3xl": "10px 10px 40px 0px rgba(0, 77, 127, 0.12)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
