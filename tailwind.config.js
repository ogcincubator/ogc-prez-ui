import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        'ogc-blue': '#0580da',
        'ogc-dark-blue': '#071F51',
        'ogc-light-blue': '#00B1FF',
        'primary': '#0580da',
        'ring': '#0580da',
        'link': '#0580da',
      },
    },
    fontFamily: {
      sans: ['Noto Sans', ...defaultTheme.fontFamily.sans],
    },
  },
}