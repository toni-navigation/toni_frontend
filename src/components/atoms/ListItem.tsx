import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ListItemProps {
  value: string;
  onPress?: () => void;
  touchable: boolean;
}

function ListItem({ value, onPress, touchable }: ListItemProps) {
  if (touchable) {
    return (
      <TouchableOpacity
        onPress={onPress}
        className="
            border-b-[1px] py-3 px-2 last:border-none"
      >
        <Text>{value}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <View
        className="
            border-b-[1px] py-3 px-2 bg-repeat last:border-none"
      >
        <Text>{value}</Text>
      </View>
    );
  }
}

export default ListItem;
