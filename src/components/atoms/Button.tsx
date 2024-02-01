import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  buttonType: 'primary' | 'secondary' | 'primaryOutline' | 'secondaryOutline';
  disabled?: boolean;
}
function Button({ children, onPress, buttonType, disabled }: ButtonProps) {
  let buttonLook;
  switch (buttonType) {
    case 'primary':
      buttonLook = 'bg-green-800 hover:bg-green-950';
      break;
    case 'secondary':
      buttonLook = 'bg-yellow-800 hover:bg-yellow-950';
      break;
    case 'primaryOutline':
      buttonLook =
        'bg-green-200 hover:bg-green-950 border border-solid border-black-600';
      break;
    case 'secondaryOutline':
      buttonLook =
        'bg-yellow-200 hover:bg-green-950 border border-solid border-black-600';
      break;
    default:
      buttonLook = 'bg-gray-500 hover:bg-gray-700';
      break;
  }

  return (
    <TouchableOpacity
      className={`h-20 flex justify-center font-bold py-2 px-4 rounded ${!disabled ? buttonLook : 'bg-amber-400 hover:bg-amber-950'}}`}
      onPress={onPress}
      disabled={disabled}
    >
      <Text className="text-white text-center text-lg">{children}</Text>
    </TouchableOpacity>
  );
}

export default Button;
