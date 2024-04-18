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
      ? 'h-20 flex justify-center py-2 px-4 rounded bg-mint-dark flex-1'
      : 'h-20 flex justify-center py-2 px-4 rounded bg-mint-light flex-1';
  const inactiveButton =
    colorscheme === 'light'
      ? 'h-20 flex justify-center py-2 px-4 rounded bg-mint-light flex-1'
      : 'h-20 flex justify-center py-2 px-4 rounded bg-mint-dark flex-1';
  const activeText = 'text-center text-base text-mint-light';
  const inactiveText = 'text-center text-base text-mint-dark';

  return (
    <View className="flex-row">
      <TouchableOpacity
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
