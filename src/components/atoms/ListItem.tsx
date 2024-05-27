import React from 'react';
import { Text, TouchableOpacity, useColorScheme, View } from 'react-native';

interface ListItemProps {
  children: React.ReactNode;
  classes?: string;
  onPress?: () => void;
}

// TODO: Add accessibilityLabel and accessibilityRole
export function ListItem({ children, onPress, classes }: ListItemProps) {
  const colorscheme = useColorScheme();
  if (onPress) {
    return (
      <TouchableOpacity
        testID="listbutton"
        accessibilityRole="button"
        onPress={onPress}
        className={`py-3 px-2 ${classes}`}
      >
        <Text className="font-atkinsonRegular">{children}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View className={`py-3 px-2 ${classes}`} testID="listitem">
      <Text
        className={`text-2xl font-atkinsonRegular ${colorscheme === 'light' ? 'text-text-color-light' : 'text-text-color-dark'}`}
      >
        {children}
      </Text>
    </View>
  );
}
