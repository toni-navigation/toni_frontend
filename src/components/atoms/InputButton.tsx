import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface InputButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  label: string;
  disabled?: boolean;
  classes?: string;
  icon?: React.ReactNode;
}

export function InputButton({
  children,
  disabled,
  classes,
  onPress,
  label,
  icon,
}: InputButtonProps) {
  const accessibilityOutput = () => {
    if (disabled) {
      return `${children} nicht nutzbar`;
    }
    if (children === 'undefined' || children === null) {
      return `${label} eingeben`;
    }

    return `${children}`;
  };

  return (
    <View className="flex flex-col mb-4">
      <Text
        className={`${icon ? 'ps-16' : 'ps-3'} mb-2 text-primary text-xsmall`}
      >
        {label}
      </Text>
      <View className="flex flex-row items-center">
        <View className={`${icon ? 'pe-2' : ''}`}>{icon && icon}</View>
        <TouchableOpacity
          accessibilityHint={accessibilityOutput()}
          className={`flex-row bg-background items-center border-2 border-primary rounded-[25px] flex-1 h-12 pb-0 ${classes}`}
          onPress={onPress}
          accessibilityRole="button"
          accessibilityLabel={label}
          disabled={disabled}
          testID="InputButton"
        >
          <Text className="font-atkinsonRegular text-textColor pb-0 ps-3">
            {children}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
