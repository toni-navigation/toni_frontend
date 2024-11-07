import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface DestinationProps {
  children: React.ReactNode;
  onPress: () => void;
}

export function Destination({ children, onPress }: DestinationProps) {
  return (
    <TouchableOpacity
      testID="Destination"
      accessibilityRole="button"
      accessibilityHint=""
      accessibilityLabel={`${children}`}
      onPress={onPress}
      className="flex flex-row items-center
            bg-primary rounded-[25px] my-5 py-3 px-2"
    >
      <Text
        testID="DestinationText"
        className="font-atkinsonRegular pl-4 text-lg text-invertedPrimary"
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}
