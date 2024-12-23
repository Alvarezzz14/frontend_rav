import flowbitePlugin from 'flowbite/plugin';

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
      boxShadow: {
        custom: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },
      colors: {
        amarillo: '#FDC300',
        grisInput: '#F2F3F3',
        customPurple: '#71277A',
        cardBackground: '#D9D9D9',
        textBackground: '#003150',
        azulHeaderFooter: '#3366CC',
        moradoSecundario: '#5F2A68',
        GrisIconosDash: '#D9D9D9',
        naranjagrafica: '#FDC300',
      },
      fontFamily: {
        sans: ['Work Sans', 'sans-serif'],
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(180deg, #D160DE 0%, #71277A 100%)',
      },
      transitionProperty: {
        all: 'all',
        colors: 'color, background-color, border-color, fill, stroke',
        transform: 'transform',
      },
      transitionDuration: {
        300: '300ms',
        500: '500ms',
      },
      transitionTimingFunction: {
        'ease-in-out': 'ease-in-out',
      },
    },
  },
  plugins: [
    flowbitePlugin,
  ],
}
