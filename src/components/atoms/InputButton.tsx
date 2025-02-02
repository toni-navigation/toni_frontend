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

    return `${children}`;
  };

  return (
    <View className="flex flex-col mb-4">
      <Text className={`${icon ? 'pl-16' : 'pl-4'} mb-3 text-textColor`}>{label}</Text>
      <View className="flex flex-row items-center">
        <View className="pe-2">{icon && icon}</View>
        <TouchableOpacity
          accessibilityHint={accessibilityOutput()}
          className={`flex-row items-center border-2 border-primary rounded-[25px] flex-1 h-12 pb-0 ${classes}`}
          onPress={onPress}
          accessibilityRole="button"
          accessibilityLabel={accessibilityOutput()}
          disabled={disabled}
          testID="InputButton"
        >
          <Text className="font-atkinsonRegular text-textColor pb-0 pl-3">
            {children}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
