import React from 'react';
import { Text, useColorScheme, View } from 'react-native';

import { themes } from '@/colors';
import { MusicNote } from '@/components/atoms/icons/MusicNote';

interface CalibrationModeProps {
  steps: number;
}
export function CalibrationMode({ steps }: CalibrationModeProps) {
  const colorscheme = useColorScheme();
  const iconColor =
    colorscheme === 'light'
      ? themes.light['--color-primary']
      : themes.dark['--color-primary'];

  return (
    <>
      <Text className="text-lg font-atkinsonRegular mt-4 text-textColor">
        Schritte: {steps}
      </Text>
      <View className="flex-1 items-center pb-6">
        <MusicNote fill={iconColor} width={83} height={83} />
      </View>
    </>
  );
}
