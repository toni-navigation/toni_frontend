import { useColorScheme } from 'nativewind';
import React, { createContext } from 'react';
import { View } from 'react-native';

import { themes } from '@/colors';

interface ThemeProviderProps {
  children: React.ReactNode;
}
export const ThemeContext = createContext<{
  theme: 'light' | 'dark';
}>({
  theme: 'light',
});
export function ThemeProvider({ children }: ThemeProviderProps) {
  const { colorScheme } = useColorScheme();

  return (
    <ThemeContext.Provider value={{ theme: colorScheme || 'light' }}>
      <View style={themes[colorScheme || 'light']} className="flex-1">
        {children}
      </View>
    </ThemeContext.Provider>
  );
}
