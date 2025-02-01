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
      gray: 'var(--color-gray)',
    },
    extend: {
      fontFamily: {
        atkinsonRegular: ['atkinsonRegular'],
        generalSansSemi: ['generalSansSemi'],
      },
      fontSize: {
        xsmall: '12px',
        small: '16px',
        medium: '20px',
        large: '24px',
        button: '18px',
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
