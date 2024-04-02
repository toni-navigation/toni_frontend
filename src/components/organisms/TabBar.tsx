import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface TabBarProps {
  setPage: (page: number) => void;
  activePage: number;
}
export function TabBar({ setPage, activePage }: TabBarProps) {
  const activeButton =
    'h-20 flex justify-center py-2 px-4 rounded bg-primary-color-light flex-1 mr-2';
  const inactiveButton =
    'h-20 flex justify-center py-2 px-4 rounded bg-background-light flex-1';
  const activeText = 'text-center text-base text-background-light';
  const inactiveText = 'text-center text-base text-background-dark';

  return (
    <View className="flex-row">
      <TouchableOpacity
        onPress={() => setPage(0)}
        className={activePage === 0 ? activeButton : inactiveButton}
      >
        <Text className={activePage === 0 ? activeText : inactiveText}>
          Überblick
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setPage(1)}
        className={activePage === 1 ? activeButton : inactiveButton}
      >
        <Text className={activePage === 1 ? activeText : inactiveText}>
          Aktuelles Maneuver
        </Text>
      </TouchableOpacity>
    </View>
  );
}
