import React from 'react';
import { Text, TouchableOpacity, useColorScheme } from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  buttonType:
    | 'accent'
    | 'primary'
    | 'primaryOutline'
    | 'secondary'
    | 'secondaryOutline'
    | 'disabled';
}

export function Button({ children, onPress, buttonType }: ButtonProps) {
  const colorscheme = useColorScheme();
  const variant = {
    disabled: { button: 'bg-disabled-color', text: 'text-white' },
    accent: {
      button: colorscheme === 'light' ? 'bg-orange-accent' : 'bg-orange-accent',
      text:
        colorscheme === 'light'
          ? 'text-background-light'
          : 'text-background-light',
    },
    primary: {
      button: colorscheme === 'light' ? 'bg-mint-dark' : 'bg-mint-light',
      text: colorscheme === 'light' ? 'text-mint-light' : 'text-mint-dark',
    },
    primaryOutline: {
      button:
        colorscheme === 'light'
          ? 'bg-transparent border border-2 border-solid border-mint-dark'
          : 'bg-transparent border border-2 border-solid border-mint-light',
      text: colorscheme === 'light' ? 'text-mint-dark' : 'text-mint-light',
    },
    secondary: {
      button:
        colorscheme === 'light' ? 'bg-mint-dark' : 'bg-secondary-color-dark',
      text:
        colorscheme === 'light'
          ? 'text-background-light'
          : 'text-background-dark',
    },
    secondaryOutline: {
      button:
        colorscheme === 'light'
          ? 'bg-transparent border border-2 border-solid border-mint-dark'
          : 'bg-transparent border border-2 border-solid border-secondary-color-dark',
      text:
        colorscheme === 'light'
          ? 'text-mint-dark'
          : 'text-secondary-color-dark',
    },
  };

  return (
    <TouchableOpacity
      className={`h-20 flex justify-center py-2 px-4 rounded-[35px] mt-4 ${variant[buttonType].button}`}
      onPress={onPress}
      accessibilityRole="button"
      disabled={buttonType === 'disabled'}
      accessibilityLabel={
        buttonType === 'disabled' ? `${children} nicht nutzbar` : `${children}`
      }
    >
      <Text
        style={{ fontFamily: 'generalSansSemi' }}
        className={`text-center text-lg font-atkinson ${variant[buttonType].text}`}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}
