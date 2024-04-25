import React from 'react';
import { Text, useColorScheme } from 'react-native';

interface HeaderProps {
  children: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  const colorscheme = useColorScheme();

  return (
    <Text
      className={`text-4xl font-generalSansSemi h-24 ${colorscheme === 'light' ? 'text-text-color-light' : 'text-background-light'}`}
    >
      {children}
    </Text>
  );
}
