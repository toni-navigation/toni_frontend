import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ListItemProps {
  children: React.ReactNode;
  classes?: string;
  onPress?: () => void;
}

// TODO: Add accessibilityLabel and accessibilityRole
export function ListItem({ children, onPress, classes }: ListItemProps) {
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
      <Text className="text-2xl font-atkinsonRegular text-textColor">
        {children}
      </Text>
    </View>
  );
}
