import React from 'react';
import { Text, TouchableOpacity, useColorScheme } from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  disabled: true | false;
  buttonType: 'accent' | 'accentOutline' | 'primary' | 'primaryOutline';
}

export function Button({
  children,
  disabled,
  onPress,
  buttonType,
}: ButtonProps) {
  const colorscheme = useColorScheme();
  const variant = {
    accent: {
      button: 'bg-orange-accent',
      text: 'text-background-light',
    },
    accentOutline: {
      button:
        'bg-transparent border border-2 border-solid border-orange-accent',
      text: 'text-orange-accent',
    },
    primary: {
      button:
        colorscheme === 'light'
          ? 'bg-primary-color-dark'
          : 'bg-primary-color-light',
      text:
        colorscheme === 'light'
          ? 'text-primary-color-light'
          : 'text-primary-color-dark',
    },
    primaryOutline: {
      button:
        colorscheme === 'light'
          ? 'bg-transparent border border-2 border-solid border-primary-color-dark'
          : 'bg-transparent border border-2 border-solid border-primary-color-light',
      text:
        colorscheme === 'light'
          ? 'text-primary-color-dark'
          : 'text-primary-color-light',
    },
  };

  return (
    <TouchableOpacity
      accessibilityHint={disabled ? 'Nicht nutzbar' : ''}
      className={`h-20 flex justify-center py-2 px-4 rounded-[35px] mt-4 ${variant[buttonType].button} ${disabled && 'opacity-50'}`}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={
        disabled ? `${children} nicht nutzbar` : `${children}`
      }
      disabled={disabled}
    >
      <Text
        className={`text-center text-lg font-generalSansSemi ${variant[buttonType].text}`}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}
