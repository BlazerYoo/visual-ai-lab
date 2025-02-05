/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,css,js}"],
  theme: {
    extend: {
      colors: {
        'dark-orange': '#b53502',
      }
    },
    fontFamily: {
      code: ['Courier New', 'Courier', 'monospace'],
      sans:	['ui-sans-serif', 'system-ui', 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
      serif: ['ui-serif', 'Georgia', 'Cambria', "Times New Roman", 'Times', 'serif'],
      mono:	['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', "Liberation Mono", "Courier New", 'monospace'],
      typewriter: ['American Typewriter', 'serif']
    }
  },
  plugins: [require("daisyui")],
};
