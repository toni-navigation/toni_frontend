import React from 'react';
import { Text, useColorScheme, View } from 'react-native';

import { Header } from '@/components/atoms/Header';
import { Logo } from '@/components/atoms/Logo';
import { calibrationTexts } from '@/components/calibration/calibrationTexts';
import { getCalibrationValue } from '@/functions/getCalibrationValue';
import { useCalibrationStore } from '@/store/useCalibrationStore';

interface CalibrationHeaderProps {
  index: number;
}
export function CalibrationHeader({ index }: CalibrationHeaderProps) {
  const colorscheme = useColorScheme();
  const calibration = useCalibrationStore((state) => state.calibration);
  console.log(calibration);

  return (
    <>
      <View className="flex items-center pb-6">
        <Logo
          icon={`${colorscheme === 'light' ? 'logoLight' : 'logoDark'}`}
          size={85}
        />
      </View>
      <Header>Schrittlänge konfigurieren</Header>
      <View>
        <Text
          className={`text-2xl font-atkinsonRegular ${colorscheme === 'light' ? 'text-text-color-light' : 'text-background-light'}`}
        >
          {calibrationTexts(calibration.meters)[index]}
        </Text>
        {index === 0 && (
          <Text
            className={`text-4xl font-generalSansSemi pt-4 ${colorscheme === 'light' ? 'text-primary-color-dark' : 'text-primary-color-light'}`}
          >
            {getCalibrationValue(calibration.meters)} m
          </Text>
        )}
      </View>
    </>
  );
}
