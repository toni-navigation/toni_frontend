import React from 'react';
import { Text, useColorScheme, View } from 'react-native';

import { Header } from '@/components/atoms/Header';
import { Logo } from '@/components/atoms/Logo';
import { calibrationSteps } from '@/components/calibration/calibrationSteps';
import { useCalibrationStore } from '@/store/useCalibrationStore';

interface CalibrationHeaderProps {
  index: number;
}
export function CalibrationHeader({ index }: CalibrationHeaderProps) {
  const colorscheme = useColorScheme();
  const calibration = useCalibrationStore((state) => state.calibration);
  const { calibrationValueNode } = calibrationSteps(
    calibration.meters,
    colorscheme
  )[index];

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
          {calibrationSteps(calibration.meters)[index].text}
        </Text>
        {calibrationValueNode && calibrationValueNode}
      </View>
    </>
  );
}
