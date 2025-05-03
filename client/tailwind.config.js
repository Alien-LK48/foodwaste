/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dancing: ['"Dancing Script"', 'cursive'],
        knewave: ['Knewave', 'cursive'],
        robotoCondensed: ['"Roboto Condensed"', 'sans-serif'],
        parkinsans: ['Parkinsans', 'sans-serif'],
        arbutus: ['"Arbutus Slab"', 'serif'],
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}