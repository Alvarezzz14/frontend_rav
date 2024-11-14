/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}',
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {  
        amarillo: '#FFBF00',
        grisFondo:'#C0C1C133',// Fondo de contenido 
        amarillo: '#FDC300',
        grisInput: '#F2F3F3',
        negro: '#000000',
        cardBackground: '#D9D9D9', // Fondo para la tarjeta
        textBackground: '#003150', // Color del texto en la tarjeta
        azulHeaderFooter: '#3366CC', //Azul del header y el fotter
        azulBarraApe:"#000B77", // azul para la barra de menu ape rav
        azulSelectorApe: "#010958",// azul para seleccionar el dash board
      },
      fontFamily: {
        sans: ['Work Sans', 'sans-serif'], // Fuente global "Work Sans"
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
