/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,css,js}"],
  theme: {
    extend: {},
    fontFamily: {
      code: ['Courier New', 'Courier', 'monospace']
    }
  },
  plugins: [require("daisyui")],
};
