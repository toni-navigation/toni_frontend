import { useColorScheme } from 'nativewind';

import stylings from '@/stylings';

export function useTheme() {
  const { colorScheme } = useColorScheme();

  return {
    light: {
      primary: stylings.colors['primary-color-light'],
    },
    dark: {
      primary: stylings.colors['primary-color-dark'],
    },
  }[colorScheme || 'light'];
}
