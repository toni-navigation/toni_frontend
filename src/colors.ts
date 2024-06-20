import { vars } from 'nativewind';

export const themes = {
  light: vars({
    '--color-primary': '#0A585C',
    '--color-inverted-primary': '#DAFBDE',
    '--color-accent': '#fc7d22',
    '--color-background': '#fff',
    '--color-text-color': '#000',
    '--color-white': '#fff',
    '--color-black': '#000',
  }),
  dark: vars({
    '--color-primary': '#DAFBDE',
    '--color-inverted-primary': '#0A585C',
    '--color-accent': '#fc7d22',
    '--color-background': '#172621',
    '--color-text-color': '#fff',
    '--color-white': '#fff',
    '--color-black': '#000',
  }),
  external: {
    '--light-mode-primary': '#0A585C',
    '--light-mode-primary-inverted': '#DAFBDE',
    '--dark-mode-primary': '#DAFBDE',
    '--dark-mode-primary-inverted': '#0A585C',
    '--accent': '#fc7d22',
    '--pure-white': '#fff',
    '--light-mode-background': '#fff',
    '--light-mode-text-color': '#000',
    '--dark-mode-background': '#172621',
    '--dark-mode-text-color': '#fff',
  },
};
