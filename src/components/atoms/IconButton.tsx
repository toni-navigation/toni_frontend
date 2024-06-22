import React, { useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
import { SwitchArrow } from '@/components/atoms/icons/SwitchArrow';

interface IconButtonProps {
  icon: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
  classes?: string;
  buttonType: 'accent' | 'accentOutline' | 'primary' | 'primaryOutline';
}
export function IconButton({
  icon,
  disabled,
  onPress,
  classes,
  buttonType,
}: IconButtonProps) {
  const { theme } = useContext(ThemeContext);

  const variant = {
    accent: {
      fill: themes.external['--pure-white'],
      button: 'bg-accent border border-4 border-orange-accent',
    },
    accentOutline: {
      button:
        'bg-transparent border border-2 border-solid border-accent',
      fill: themes.external['--accent'],
    },
    primary: {
      button: 'bg-primary border border-4 border-primary',
      fill: themes.external[`--${theme}-mode-primary-inverted`],
    },
    primaryOutline: {
      button: 'bg-transparent border border-4 border-solid border-primary',
      fill: themes.external[`--${theme}-mode-primary`],
    },
  };

  return (
    <View className={`flex justify-center items-center ${classes}`}>
      <TouchableOpacity
        accessibilityHint={disabled ? 'Nicht nutzbar' : ''}
        className={`p-5 flex justify-center items-center rounded-[35px]  ${variant[buttonType].button} ${disabled && 'opacity-50'}`}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={disabled ? `${icon} nicht nutzbar` : `${icon}`}
        disabled={disabled}
      >
        <View>{icon}</View>
      </TouchableOpacity>
    </View>
  );
}
