const styling = require('./src/stylings');

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
    extend: {
      fontFamily: {
        atkinsonRegular: ['atkinsonRegular'],
        generalSansSemi: ['generalSansSemi'],
      },
    },
    screens: {
      tablet: '640px',
      laptop: '1024px',
      desktop: '1280px',
    },
  },
  plugins: [],
};
