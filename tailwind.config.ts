import type {Config} from 'tailwindcss';
import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        'ogc-blue': '#0476C8',
        'ogc-dark-blue': '#071F51',
      },
    },
    fontFamily: {
      sans: ['Mont', ...defaultTheme.fontFamily.sans],
    }
  },
}
