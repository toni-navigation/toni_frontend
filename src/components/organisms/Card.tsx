import React from 'react';
import { Text, View } from 'react-native';

interface CardProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
}

// TODO: Add accessibilityLabel and accessibilityRole
export function Card({ icon, children }: CardProps) {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="font-generalSansSemi text-4xl pb-8 text-center text-primary">
        {children}
      </Text>
      {icon && icon}
    </View>
  );
}
