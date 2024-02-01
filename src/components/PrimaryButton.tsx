import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
}
function PrimaryButton({ children, onPress, disabled }: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      className="bg-green-800 hover:bg-green-950 h-20 flex justify-center font-bold py-2 px-4 rounded"
      onPress={onPress}
      disabled={disabled}
    >
      <Text className="text-white text-center text-lg">{children}</Text>
    </TouchableOpacity>
  );
}

export default PrimaryButton;
