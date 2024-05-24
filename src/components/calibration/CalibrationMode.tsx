import React from 'react';
import { Text, useColorScheme, View } from 'react-native';

import { Icon } from '@/components/atoms/Icon';
import styling from '@/stylings';

interface CalibrationModeProps {
  steps: number;
}
export function CalibrationMode({ steps }: CalibrationModeProps) {
  const colorscheme = useColorScheme();

  return (
    <>
      <Text
        className={`text-lg font-atkinsonRegular mt-4 ${colorscheme === 'light' ? 'text-text-color-light' : 'text-background-light'}`}
      >
        Schritte: {steps}
      </Text>
      <View className="flex-1 items-center pb-6">
        <Icon
          icon="musicNote"
          color={
            colorscheme === 'light'
              ? styling.colors['primary-color-dark']
              : styling.colors['primary-color-light']
          }
          size={83}
        />
      </View>
    </>
  );
}
