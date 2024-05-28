import React from 'react';
import { Text, useColorScheme, View } from 'react-native';

interface CardProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
}

// TODO: Add accessibilityLabel and accessibilityRole
export function Card({ icon, children }: CardProps) {
  const colorscheme = useColorScheme();

  return (
    <View className="flex-1 justify-center items-center">
      {icon && icon}

      <Text
        className={`font-atkinsonRegular text-center ${colorscheme === 'light' ? 'text-primary-color-dark' : 'text-primary-color-light'}`}
      >
        {children}
      </Text>
    </View>
  );
}
