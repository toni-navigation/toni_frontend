export default {
  important: true,
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'media',
  theme: {
    colors: {
      primary: {
        DEFAULT: 'var(--color-primary-default)',
        light: 'var(--color-primary-light)',
      },
      'orange-accent': '#fc7d22',
      'primary-color-light': '#DAFBDE',
      'primary-color-dark': '#0A585C',
      'background-light': '#fff',
      'background-dark': '#172621',
      'text-color-light': '#000',
      'text-color-dark': '#fff',
    },
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
