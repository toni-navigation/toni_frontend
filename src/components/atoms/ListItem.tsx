import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ListItemProps {
  children: React.ReactNode;
  onPress?: () => void;
}

// TODO: Add accessibilityLabel and accessibilityRole
function ListItem({ children, onPress }: ListItemProps) {
  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        className="
            border-b-[1px] py-3 px-2 last:border-none"
      >
        <Text>{children}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <View
      className="
            border-b-[1px] py-3 px-2 bg-repeat last:border-none"
    >
      <Text>{children}</Text>
    </View>
  );
}

export default ListItem;
