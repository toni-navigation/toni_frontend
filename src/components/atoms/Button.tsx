import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
}
function Button({ children, onPress, disabled }: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      className={`h-20 flex justify-center font-bold py-2 px-4 rounded ${!disabled ? 'bg-green-800 hover:bg-green-950' : 'bg-amber-400 hover:bg-green-950'}}`}
      onPress={onPress}
      disabled={disabled}
    >
      <Text className="text-white text-center text-lg">{children}</Text>
    </TouchableOpacity>
  );
}

export default Button;
