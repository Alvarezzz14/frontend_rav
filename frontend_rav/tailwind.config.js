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
        menu: "0 10px 24px rgba(0, 93, 202, 0.18)",
        card: "0 6px 12px rgba(0, 0, 0, 0.08)",
      },
      colors: {
        // Paleta base
        backgroundApp: '#EEF5FF',
        blanco: '#FFFFFF',
        gris: '#D9D9D9',
        grisInput: '#F2F3F3',
        amarillo: '#FDC300',
        azulApe: '#005DCA',
        azul2Ape: '#002C4D',
        rojoApe: '#D80F16',
        verdeApe: '#00D000',
        // Alias heredados (mantener compatibilidad con clases existentes)
        customPurple: '#005DCA',
        moradoSecundario: '#090c0fff',
        fondoVioleta: '#002C4D',
        cardBackground: '#D9D9D9',
        textBackground: '#003150',
        azulHeaderFooter: '#3366CC',
      },
      borderRadius: {
        card: '1.25rem', // 20px
        menu: '1.875rem', // 30px
      },
      fontFamily: {
        sans: ['Work Sans', 'sans-serif'],
        'work-sans': ['Work Sans', 'sans-serif'],
      },
      backgroundImage: {
        // Gradientes nuevos
        'azul-gradian': 'linear-gradient(90deg, #005DCA 0%, #003B8A 88.46%, #003B8A 98.08%)',
        'amarillo-gradian': 'linear-gradient(90deg, #FEC905 0%, #D1A500 100%)',
        'rojo-gradian': 'linear-gradient(180deg, #D80F16 0%, #72080C 100%)',
        'verde-gradient': 'linear-gradient(90deg, #00D000 0%, #00A000 88.46%, #009000 98.08%)',
        // Alias heredados apuntando al nuevo tema azul
        'custom-gradient': 'linear-gradient(90deg, #005DCA 0%, #003B8A 88.46%, #003B8A 98.08%)',
        'violet-gradient': 'linear-gradient(90deg, #005DCA 0%, #003B8A 88.46%, #003B8A 98.08%)',
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
