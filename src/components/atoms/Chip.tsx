import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

interface ChipProps {
  children: React.ReactNode;
  onPress: () => void;
}

export function Chip({ children, onPress }: ChipProps) {
  const accessibilityOutput = () => `${children}`;

  return (
    <TouchableOpacity
      accessibilityHint={accessibilityOutput()}
      className="h-10 flex mr-4 px-4 rounded-[25px] bg-primary justify-center align-items-center"
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityOutput()}
      testID="Chip"
    >
      <Text className="text-lg font-generalSansSemi text-invertedPrimary">
        {children}
      </Text>
    </TouchableOpacity>
  );
}
