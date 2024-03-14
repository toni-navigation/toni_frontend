import React from 'react';
import { Text, TouchableOpacity, useColorScheme } from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  buttonType:
    | 'primary'
    | 'secondary'
    | 'primaryOutline'
    | 'secondaryOutline'
    | 'disabled';
}
export function Button({ children, onPress, buttonType }: ButtonProps) {
  const colorscheme = useColorScheme();
  const variant = {
    disabled: { button: 'bg-disabled-color', text: 'text-white' },
    primary: {
      button:
        colorscheme === 'light'
          ? 'bg-primary-color-light'
          : 'bg-primary-color-dark',
      text:
        colorscheme === 'light'
          ? 'text-background-light'
          : 'text-background-dark',
    },
    secondary: {
      button:
        colorscheme === 'light'
          ? 'bg-secondary-color-light'
          : 'bg-secondary-color-dark',
      text:
        colorscheme === 'light'
          ? 'text-background-light'
          : 'text-background-dark',
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
    <TouchableOpacity
      className={`h-20 flex justify-center py-2 px-4 rounded-[50px] mt-4 ${variant[buttonType].button}`}
      onPress={onPress}
      accessibilityRole="button"
      disabled={buttonType === 'disabled'}
      accessibilityLabel={
        buttonType === 'disabled' ? `${children} nicht nutzbar` : `${children}`
      }
    >
      <Text className={`text-center text-lg ${variant[buttonType].text}`}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}
