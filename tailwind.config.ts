import type {Config} from 'tailwindcss';
import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        'ogc-blue': '#0580da',
        'ogc-dark-blue': '#071F51',
        'ogc-light-blue': '#00B1FF',
      },
    },
    fontFamily: {
      sans: ['Noto Sans', ...defaultTheme.fontFamily.sans],
    }
  },
}
