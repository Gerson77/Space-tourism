/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // ajuste conforme sua estrutura de pastas
  ],
  theme: {
    extend: {
      fontFamily: {
        barlow: ['Barlow', 'sans-serif'],
        'barlow-condensed': ['Barlow Condensed', 'sans-serif'],
        bellefair: ['Bellefair', 'serif'],
      },
      colors: {
        'blue-300': '#D0D6F9',
        'black-900': '#0B0D17',
        'white': '#FFFFFF',
      },
      spacing: {
        '96': '24rem',   // 384px
        '128': '32rem',   // 512px
      },
      borderRadius: {
        'full': '9999px',
      },
      fontSize: {
        '10xl': '10rem', // Tamanho grande para "Space"
      },
      backdropBlur: {
        '3xl': '36px',
      },
      backgroundImage: {
        'banner-home': "url('./assets/home/background-home-desktop.jpg')",
      }
    },
  },
  plugins: [],
}