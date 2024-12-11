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
      <Text className={`${icon ? 'pl-14' : 'pl-2'} mb-1`}>{label}</Text>
      <View className="flex flex-row items-center">
        {icon && icon}
        <TouchableOpacity
          accessibilityHint={accessibilityOutput()}
          className={`flex-row items-center border-2 border-primary rounded-[25px] flex-1 text-textColor h-10 pb-0 ${classes}`}
          onPress={onPress}
          accessibilityRole="button"
          accessibilityLabel={accessibilityOutput()}
          disabled={disabled}
          testID="InputButton"
        >
          <Text className="font-atkinsonRegular text pb-0 pl-2">
            {children}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
