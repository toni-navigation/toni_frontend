import React from 'react';
import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

interface ListItemProps {
  value: string;
  customKey?: string;
  onPress?: () => void;
  touchable: boolean;
}

function ListItem({ value, customKey, onPress, touchable }: ListItemProps) {
  const colorscheme = useColorScheme();

  if (touchable) {
    console.log('listItem', customKey);
    return (
      <TouchableOpacity
        key={customKey}
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
        key={customKey}
        className="
            border-b-[1px] py-3 px-2 bg-repeat last:border-none"
      >
        <Text>{value}</Text>
      </View>
    );
  }
}

export default ListItem;
