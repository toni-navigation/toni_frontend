import React from 'react';
import { Text, TouchableOpacity, useColorScheme, View } from 'react-native';

interface TabBarProps {
  setPage: (page: number) => void;
  activePage: number;
}
export function TabBar({ setPage, activePage }: TabBarProps) {
  const colorscheme = useColorScheme();
  const activeButton =
    colorscheme === 'light'
      ? 'h-20 flex justify-center py-2 px-4 rounded bg-primary-color-dark flex-1'
      : 'h-20 flex justify-center py-2 px-4 rounded bg-primary-color-light flex-1';
  const inactiveButton =
    colorscheme === 'light'
      ? 'h-20 flex justify-center py-2 px-4 rounded bg-primary-color-light flex-1'
      : 'h-20 flex justify-center py-2 px-4 rounded bg-primary-color-dark flex-1';
  const activeText = 'text-center text-base text-primary-color-light';
  const inactiveText = 'text-center text-base text-primary-color-dark';

  // TODO: insert fontFamily via Nativewind
  return (
    <View className="flex-row">
      <TouchableOpacity
        accessibilityRole="button"
        onPress={() => setPage(0)}
        className={activePage === 0 ? activeButton : inactiveButton}
      >
        <Text
          style={{ fontFamily: 'generalSansSemi' }}
          className={activePage === 0 ? activeText : inactiveText}
        >
          Überblick
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityRole="button"
        onPress={() => setPage(1)}
        className={activePage === 1 ? activeButton : inactiveButton}
      >
        <Text
          style={{ fontFamily: 'generalSansSemi' }}
          className={activePage === 1 ? activeText : inactiveText}
        >
          Aktuelles Maneuver
        </Text>
      </TouchableOpacity>
    </View>
  );
}
