import { useColorScheme } from 'nativewind';
import React, { createContext, useMemo } from 'react';
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

  const value = useMemo(
    () => ({ theme: colorScheme ?? 'light' }),
    [colorScheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      <View style={themes[colorScheme ?? 'light']} className="flex-1">
        {children}
      </View>
    </ThemeContext.Provider>
  );
}
