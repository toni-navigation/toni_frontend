import React from 'react';
import { TouchableOpacity, useColorScheme, View } from 'react-native';

interface IconButtonProps {
  icon: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
  classes?: string;
  buttonType: 'accent' | 'accentOutline' | 'primary' | 'primaryOutline';
}
export function IconButton({
  icon,
  disabled,
  onPress,
  classes,
  buttonType,
}: IconButtonProps) {
  const colorscheme = useColorScheme();
  const variant = {
    accent: {
      button: 'bg-orange-accent border border-4 border-orange-accent',
    },
    accentOutline: {
      button:
        'bg-transparent border border-4 border-solid border-orange-accent',
    },
    primary: {
      button:
        colorscheme === 'light'
          ? 'bg-primary-color-dark border border-4 border-primary-color-dark'
          : 'bg-primary-color-light border border-4 border-primary-color-light',
    },
    primaryOutline: {
      button:
        colorscheme === 'light'
          ? 'bg-transparent border border-solid border-primary-color-dark border-4'
          : 'bg-transparent border border-5 border-solid border-primary-color-light',
    },
  };

  return (
    <View className={`flex justify-center items-center ${classes}`}>
      <TouchableOpacity
        accessibilityHint={disabled ? 'Nicht nutzbar' : ''}
        className={`p-5 flex justify-center items-center rounded-[35px]  ${variant[buttonType].button} ${disabled && 'opacity-50'}`}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={disabled ? `${icon} nicht nutzbar` : `${icon}`}
        disabled={disabled}
      >
        <View>{icon}</View>
      </TouchableOpacity>
    </View>
  );
}
