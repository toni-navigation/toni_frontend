export default {
  important: true,
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'media',
  theme: {
    colors: {
      primary: 'var(--color-primary)',
      invertedPrimary: 'var(--color-inverted-primary)',
      accent: 'var(--color-accent)',
      background: 'var(--color-background)',
      textColor: 'var(--color-text-color)',
      white: 'var(--color-white)',
      black: 'var(--color-black)',
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
  presets: [require('nativewind/preset')],
};
