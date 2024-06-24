import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
  buttonType: 'accent' | 'accentOutline' | 'primary' | 'primaryOutline';
  isLoading?: boolean;
}

export function Button({
  children,
  disabled,
  onPress,
  buttonType,
  isLoading,
}: ButtonProps) {
  const variant = {
    accent: {
      button: 'bg-accent',
      text: 'text-white',
    },
    accentOutline: {
      button: 'bg-transparent border border-2 border-solid border-accent',
      text: 'text-accent',
    },
    primary: {
      button: 'bg-primary',
      text: 'text-invertedPrimary',
    },
    primaryOutline: {
      button: 'bg-transparent border border-2 border-solid border-primary',
      text: 'text-primary',
    },
  };
  const handlePress = () => {
    if (!disabled) {
      onPress();
    }
  };

  const accessibilityOutput = () => {
    if (disabled && isLoading) {
      return `${children} nicht nutzbar, wird geladen`;
    }
    if (disabled) {
      return `${children} nicht nutzbar`;
    }

    return `${children}`;
  };

  return (
    <TouchableOpacity
      accessibilityHint={accessibilityOutput()}
      className={`h-20 flex justify-center py-2 px-4 rounded-[35px] mt-4 ${variant[buttonType].button} ${disabled && 'opacity-30'} items-center`}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityOutput()}
      disabled={disabled}
      testID={`Button-${buttonType}`}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color="textColor"
          testID="ActivityIndicator"
        />
      ) : (
        <Text
          className={`text-2xl font-generalSansSemi ${variant[buttonType].text}`}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
}
