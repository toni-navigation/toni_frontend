import stylings from '@/stylings';
import { useColorScheme } from 'nativewind';

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
