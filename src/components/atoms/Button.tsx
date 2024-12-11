import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
  buttonType: 'accent' | 'accentOutline' | 'primary' | 'primaryOutline';
  isLoading?: boolean;
  width: 'full' | 'half' | 'third';
}

export function Button({
  children,
  disabled,
  onPress,
  buttonType,
  isLoading,
  width,
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
  const specificWidth = {
    full: {
      width: 'w-full',
    },
    half: {
      width: 'w-1/2',
    },
    third: {
      width: 'w-2/3',
    },
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
      className={`h-12 ${specificWidth[width].width}  flex justify-center py-2 px-4 rounded-[30px] ${variant[buttonType].button} ${disabled && 'opacity-30'} items-center`}
      onPress={(event) => {
        event.persist();
        onPress();
      }}
      accessibilityRole="button"
      accessibilityLabel={accessibilityOutput()}
      disabled={disabled}
      testID={`Button-${buttonType}`}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color="white"
          testID="ActivityIndicator"
        />
      ) : (
        <Text
          className={`text-button font-generalSansSemi ${variant[buttonType].text}`}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
}
