import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface TabButtonProps {
  index: number;
  activePage: number;
  accessibilityLabel: string;
  accessibilityHint: string;
  onPress: () => void;
}
export function TabButton({
  index,
  activePage,
  accessibilityLabel,
  accessibilityHint,
  onPress,
}: TabButtonProps) {
  const activeButton = 'h-12 justify-center py-2 px-4 rounded-[35px] bg-accent';
  const inactiveButton =
    'h-12 justify-center py-2 px-4 rounded-[35px] bg-transparent border border-2 border-solid border-primary';
  const activeText = 'text-center text-base text-white';
  const inactiveText = 'text-center text-base text-invertedPrimary';

  return (
    <TouchableOpacity
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      onPress={onPress}
      className={`${activePage === index ? activeButton : inactiveButton} w-1/2`}
      disabled={activePage === index}
    >
      <Text
        style={{ fontFamily: 'generalSansSemi' }}
        className={`${activePage === index ? activeText : inactiveText}`}
      >
        {accessibilityLabel}
      </Text>
    </TouchableOpacity>
  );
}
