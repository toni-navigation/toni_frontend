import React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
  buttonType: 'accent' | 'accentOutline' | 'primary' | 'primaryOutline';
  isLoading?: boolean;

}

export function Button({
  children,
  disabled,
  onPress,
  buttonType,
  isLoading,
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
          : 'text-background-dark',
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
  const handlePress = () => {
    if (!disabled) {
      onPress();
    }
  };

  const accessibilityOutput = () => {
    if (disabled && isLoading) {
      return `${children} nicht nutzbar, wird geladen`;
    }
    if (disabled) {
      return `${children} nicht nutzbar`;
    }

    return `${children}`;
  };

  return (
    <TouchableOpacity
      accessibilityHint={accessibilityOutput()}
      className={`h-20 flex justify-center py-2 px-4 rounded-[35px] mt-4 ${variant[buttonType].button} ${disabled && 'opacity-50'} items-center`}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityOutput()}
      disabled={disabled}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={colorscheme === 'light' ? 'black' : 'white'}
        />
      ) : (
        <Text
          className={`text-2xl font-generalSansSemi ${variant[buttonType].text}`}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
}
