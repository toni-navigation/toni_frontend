import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { NavigationState } from 'react-native-tab-view';

interface TabBarProps {
  jumpTo: (key: string) => void;
  navigationState: NavigationState<{ key: string; title: string }>;
}
function TabBar({ jumpTo, navigationState }: TabBarProps) {
  const activeButton =
    'h-20 flex justify-center py-2 px-4 rounded bg-primary-color-light flex-1 mr-2';
  const inactiveButton =
    'h-20 flex justify-center py-2 px-4 rounded bg-background-light flex-1';
  const activeText = 'text-center text-base text-background-light';
  const inactiveText = 'text-center text-base text-background-dark';

  return (
    <View className="flex-row">
      {navigationState.routes.map((route, index) => (
        <TouchableOpacity
          className={
            index === navigationState.index ? activeButton : inactiveButton
          }
          key={route.key}
          onPress={() => jumpTo(route.key)}
        >
          <Text
            className={
              index === navigationState.index ? activeText : inactiveText
            }
          >
            {route.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default TabBar;
