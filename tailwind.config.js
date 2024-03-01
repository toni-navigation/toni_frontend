// eslint-disable-next-line import/no-import-module-exports,@typescript-eslint/no-var-requires
const styling = require('./stylings');

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/**/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './app/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'media',
  theme: {
    colors: styling.colors,
    screens: {
      tablet: '640px',
      laptop: '1024px',
      desktop: '1280px',
    },
    fontFamily: styling.fonts,
    extends: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
    },
  },
  plugins: [],
};
