import React from 'react';
import { Text, useColorScheme, View } from 'react-native';

import { MusicNote } from '@/components/atoms/icons/MusicNote';
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
        <MusicNote
          fill={
            colorscheme === 'light'
              ? styling.colors['primary-color-dark']
              : styling.colors['primary-color-light']
          }
          width={83}
          height={83}
        />
      </View>
    </>
  );
}
