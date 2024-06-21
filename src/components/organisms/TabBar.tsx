import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface TabBarProps {
  setPage: (page: number) => void;
  activePage: number;
}
export function TabBar({ setPage, activePage }: TabBarProps) {
  const activeButton =
    'h-12 w-40 justify-center py-2 px-4 rounded-[35px] bg-accent';
  const inactiveButton =
    'h-12 w-40  justify-center py-2 px-4 rounded-[35px] bg-transparent border border-2 border-solid border-primary';
  const activeText = 'text-center text-base text-white';

  const inactiveText = 'text-center text-base text-primary';

  return (
    <View className="flex flex-row justify-evenly mt-5">
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Übersicht"
        accessibilityHint="Übersicht über die komplette Route"
        onPress={() => setPage(0)}
        className={activePage === 0 ? activeButton : inactiveButton}
        disabled={activePage === 0}
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
        disabled={activePage === 1}
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
