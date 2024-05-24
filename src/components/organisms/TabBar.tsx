import React from 'react';
import { Text, TouchableOpacity, useColorScheme, View } from 'react-native';

interface TabBarProps {
  setPage: (page: number) => void;
  activePage: number;
}
export function TabBar({ setPage, activePage }: TabBarProps) {
  const colorscheme = useColorScheme();
  const activeButton =
    'h-12 w-40 justify-center py-2 px-4 rounded-[35px] bg-orange-accent';
  const inactiveButton =
    colorscheme === 'light'
      ? 'h-12 w-40  justify-center py-2 px-4 rounded-[35px] bg-transparent border border-2 border-solid border-primary-color-dark'
      : 'h-12 w-40 justify-center py-2 px-4 rounded-[35px] bg-transparent border border-2 border-solid border-primary-color-light';
  const activeText = 'text-center text-base text-background-light';

  const inactiveText =
    colorscheme === 'light'
      ? 'text-center text-base text-primary-color-dark'
      : 'text-center text-base text-primary-color-light';

  // TODO: insert fontFamily via Nativewind
  return (
    <View className="flex flex-row justify-evenly mt-5">
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Übersicht"
        accessibilityHint="Übersicht über die komplette Route"
        onPress={() => setPage(0)}
        className={activePage === 0 ? activeButton : inactiveButton}
      >
        <Text
          style={{ fontFamily: 'generalSansSemi' }}
          className={activePage === 0 ? activeText : inactiveText}
        >
          Übersicht
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Navigation"
        accessibilityHint="Aktuelles Manöver der Route"
        onPress={() => setPage(1)}
        className={activePage === 1 ? activeButton : inactiveButton}
      >
        <Text
          style={{ fontFamily: 'generalSansSemi' }}
          className={activePage === 1 ? activeText : inactiveText}
        >
          Navigation
        </Text>
      </TouchableOpacity>
    </View>
  );
}
