import React from 'react';
import { Text, TouchableOpacity, useColorScheme, View } from 'react-native';

interface IconButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  buttonType: 'primary' | 'disabled';
}
export function IconButton({ children, onPress, buttonType }: IconButtonProps) {
  const colorscheme = useColorScheme();
  const variant = {
    disabled: { button: 'bg-disabled-color', text: 'text-white' },
    primary: {
      button:
        colorscheme === 'light'
          ? 'bg-primary-color-light'
          : 'bg-primary-color-dark',
      text: colorscheme === 'light' ? 'text-white' : 'text-background-dark',
    },
    secondary: {
      button:
        colorscheme === 'light'
          ? 'bg-secondary-color-light'
          : 'bg-secondary-color-dark',
      text: colorscheme === 'light' ? 'text-white' : 'text-background-dark',
    },
    primaryOutline: {
      button:
        colorscheme === 'light'
          ? 'bg-transparent border border-2 border-solid border-primary-color-light'
          : 'bg-transparent border border-2 border-solid border-primary-color-dark',
      text:
        colorscheme === 'light'
          ? 'text-primary-color-light'
          : 'text-primary-color-dark',
    },
    secondaryOutline: {
      button:
        colorscheme === 'light'
          ? 'bg-transparent border border-2 border-solid border-secondary-color-light'
          : 'bg-transparent border border-2 border-solid border-secondary-color-dark',
      text:
        colorscheme === 'light'
          ? 'text-secondary-color-light'
          : 'text-secondary-color-dark',
    },
  };

  return (
    <View className="flex justify-end items-end mb-4">
      <TouchableOpacity
        accessibilityHint={buttonType === 'disabled' ? 'Nicht nutzbar' : ''}
        className={`h-10 w-10 flex justify-center items-center rounded-[5px]  ${variant[buttonType].button}`}
        onPress={onPress}
        accessibilityRole="button"
        disabled={buttonType === 'disabled'}
        accessibilityLabel={
          buttonType === 'disabled'
            ? `${children} nicht nutzbar`
            : `${children}`
        }
      >
        <Text className={`text-center text-lg ${variant[buttonType].text}`}>
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
