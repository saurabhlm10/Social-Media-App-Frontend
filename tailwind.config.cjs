/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      display:["Source Sans Pro", "sans-serif"],
      head: ['Open Sans', "sans-serif"]
    },
    extend: {},
  },
  daisyui: {
    themes: false,
  },
  plugins: [require("daisyui")],
};
