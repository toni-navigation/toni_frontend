import React from 'react';
import { Text, TouchableOpacity, useColorScheme } from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  buttonType: 'primary' | 'secondary' | 'primaryOutline' | 'secondaryOutline';
  disabled?: boolean | false;
}
function Button({ children, onPress, buttonType, disabled }: ButtonProps) {
  const colorscheme = useColorScheme();
  const variant = {
    default: 'bg-primary-color-light',
    primary:
      colorscheme === 'light'
        ? 'bg-primary-color-light'
        : 'bg-primary-color-dark',
    secondary:
      colorscheme === 'light'
        ? 'bg-secondary-color-light'
        : 'bg-secondary-color-dark',
    primaryOutline:
      colorscheme === 'light'
        ? 'bg-transparent border border-2 border-solid border-primary-color-light'
        : 'bg-transparent border border-2 border-solid border-primary-color-dark',
    secondaryOutline:
      colorscheme === 'light'
        ? 'bg-transparent border border-2 border-solid border-secondary-color-light'
        : 'bg-transparent border border-2 border-solid border-secondary-color-dark',
  };
  return (
    <TouchableOpacity
      className={`h-20 flex justify-center py-2 px-4 rounded ${disabled ? 'bg-disabled-color' : variant[buttonType]}`}
      onPress={onPress}
      disabled={disabled}
    >
      <Text className="text-center text-lg text-background-light">
        {children}
      </Text>
    </TouchableOpacity>
  );
}

export default Button;
