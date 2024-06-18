export default {
  important: true,
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'media',
  theme: {
    colors: {
      primary: 'var(--color-primary)',
      accent: 'var(--color-accent)',
      background: 'var(--color-background)',
      text: 'var(--color-text)',
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
