/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        moradoLogin: '#853587',
        amarillo: '#FFBF00',
        customPurple: '#7A1F7E',
        cardBackground: '#D9D9D9', // Fondo para la tarjeta
        textBackground: '#003150', // Color del texto en la tarjeta
      },
      fontFamily: {
        sans: ['Work Sans', 'sans-serif'], // Fuente global "Work Sans"
      },
    },
  },
  plugins: [],
}

