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
  let buttonLook;
  switch (buttonType) {
    case 'primary':
      buttonLook =
        colorscheme === 'light'
          ? 'bg-primary-color-light'
          : 'bg-primary-color-dark';
      break;
    case 'secondary':
      buttonLook =
        colorscheme === 'light'
          ? 'bg-secondary-color-light'
          : 'bg-secondary-color-dark';
      break;
    case 'primaryOutline':
      buttonLook =
        colorscheme === 'light'
          ? 'bg-transparent border border-2 border-solid border-primary-color-light'
          : 'bg-transparent border border-2 border-solid border-primary-color-dark';
      break;
    case 'secondaryOutline':
      buttonLook =
        colorscheme === 'light'
          ? 'bg-transparent border border-2 border-solid border-secondary-color-light'
          : 'bg-transparent border border-2 border-solid border-secondary-color-dark';
      break;
    default:
      buttonLook = 'bg-primary-color-light';
      break;
  }
  return (
    <TouchableOpacity
      className={`h-20 flex justify-center py-2 px-4 rounded ${disabled ? 'bg-disabled-color' : buttonLook}`}
      onPress={onPress}
      disabled={disabled}
    >
      <Text className="text-center text-lg text-buttonfontcolor-light">
        {children}
      </Text>
    </TouchableOpacity>
  );
}

export default Button;
