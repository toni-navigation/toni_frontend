export type Theme = {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    text: string;
    orangeAccent: string;
    card: string;
    border: string;
    notification: string;
  };
};

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: '#0A585C',
    background: '#172621',
    text: '#fff',
    orangeAccent: '#fc7d22',
    // TODO
    card: '#0A585C',
    border: '#fff',
    notification: '#fc7d22',
  },
};
export const DefaultTheme: Theme = {
  dark: false,
  colors: {
    primary: '#DAFBDE',
    background: '#fff',
    text: '#000',
    orangeAccent: '#fc7d22',
    // TODO
    card: '#0A585C',
    border: '#fff',
    notification: '#fc7d22',
  },
};

export const Colors = {
  light: {
    primary: DefaultTheme.colors.primary,
    text: DefaultTheme.colors.text,
    background: DefaultTheme.colors.background,
    accent: DefaultTheme.colors.orangeAccent,
  },
  dark: {
    primary: DarkTheme.colors.primary,

    text: DarkTheme.colors.text,
    background: DarkTheme.colors.background,
    accent: DefaultTheme.colors.orangeAccent,
  },
};
