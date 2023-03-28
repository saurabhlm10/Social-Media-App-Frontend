/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{html,js}",
  ],
  theme: {
    fontFamily: {
      head: ['Open Sans', "sans-serif"],
      display:["Source Sans Pro", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
