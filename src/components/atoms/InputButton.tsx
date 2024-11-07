import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface InputButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
  classes?: string;
}

export function InputButton({
  children,
  disabled,
  classes,
  onPress,
}: InputButtonProps) {
  const handlePress = () => {
    if (!disabled) {
      onPress();
    }
  };

  const accessibilityOutput = () => {
    if (disabled) {
      return `${children} nicht nutzbar`;
    }

    return `${children}`;
  };

  return (
    <TouchableOpacity
      accessibilityHint={accessibilityOutput()}
      className={`border-2 border-primary rounded-[25px] text-textColor p-4 ${classes}`}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityOutput()}
      disabled={disabled}
      testID="InputButton"
    >
      <Text className="font-atkinsonRegular text">{children}</Text>
    </TouchableOpacity>
  );
}
