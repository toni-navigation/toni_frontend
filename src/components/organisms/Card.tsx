import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface CardProps {
  children: React.ReactNode;
}

// TODO: Add accessibilityLabel and accessibilityRole
export function Card({ children }: CardProps) {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-primary-color-light font-atkinsonRegular">
        {children}
      </Text>
    </View>
  );
}
