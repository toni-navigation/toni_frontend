import React, { useContext } from 'react';
import { Text, View } from 'react-native';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
import { MusicNote } from '@/components/atoms/icons/MusicNote';

interface CalibrationModeProps {
  steps: number;
}
export function CalibrationMode({ steps }: CalibrationModeProps) {
  const { theme } = useContext(ThemeContext);

  const iconColor = themes.external[`--${theme}-mode-primary`];

  return (
    <>
      <Text
        testID="Mode"
        className="text-lg font-atkinsonRegular mt-4 text-textColor"
      >
        Schritte: {steps}
      </Text>
      <View className="flex-1 items-center pb-6">
        <MusicNote fill={iconColor} width={83} height={83} />
      </View>
    </>
  );
}
