import React from 'react';
import { TouchableOpacity, useColorScheme, View } from 'react-native';

import { Icon, IconByKey } from '@/components/atoms/Icon';
import styling from '@/stylings';

interface IconButtonProps {
  icon: IconByKey;
  onPress: () => void;
  disabled?: boolean;
  buttonType: 'accent' | 'accentOutline' | 'primary' | 'primaryOutline';
}
export function IconButton({
  icon,
  disabled,
  onPress,
  buttonType,
}: IconButtonProps) {
  const colorscheme = useColorScheme();
  const variant = {
    accent: {
      button: 'bg-orange-accent',
      fill: 'fill-background-light',
    },
    accentOutline: {
      button:
        'bg-transparent border border-2 border-solid border-orange-accent',
      fill: 'fill-orange-accent',
    },
    primary: {
      button:
        colorscheme === 'light'
          ? 'bg-primary-color-dark'
          : 'bg-primary-color-light',
      fill:
        colorscheme === 'light'
          ? styling.colors['primary-color-light']
          : styling.colors['background-dark'],
    },
    primaryOutline: {
      button:
        colorscheme === 'light'
          ? 'bg-transparent border border-2 border-solid border-primary-color-dark'
          : 'bg-transparent border border-2 border-solid border-primary-color-light',
      fill:
        colorscheme === 'light'
          ? styling.colors['primary-color-dark']
          : styling.colors['primary-color-light'],
    },
  };

  return (
    <View className="flex justify-center items-center mb-4">
      <TouchableOpacity
        accessibilityHint={disabled ? 'Nicht nutzbar' : ''}
        className={`p-3 flex justify-center items-center rounded-[100px]  ${variant[buttonType].button} ${disabled && 'opacity-50'}`}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={disabled ? `${icon} nicht nutzbar` : `${icon}`}
        disabled={disabled}
      >
        <Icon icon={icon} size={40} color={`${variant[buttonType].fill}`} />
      </TouchableOpacity>
    </View>
  );
}
