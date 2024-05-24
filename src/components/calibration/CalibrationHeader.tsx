import React from 'react';
import { Text, useColorScheme, View } from 'react-native';

import { Header } from '@/components/atoms/Header';
import { Logo } from '@/components/atoms/Logo';
import { CalibrationStepsProps } from '@/components/calibration/calibrationSteps';

interface CalibrationHeaderProps {
  currentStep: CalibrationStepsProps;
}
export function CalibrationHeader({ currentStep }: CalibrationHeaderProps) {
  const colorscheme = useColorScheme();
  const { calibrationValueNode } = currentStep;

  return (
    <>
      <View className="flex items-center pb-6">
        <Logo
          icon={`${colorscheme === 'light' ? 'logoLight' : 'logoDark'}`}
          size={85}
        />
      </View>
      <Header
        classes={`${colorscheme === 'light' ? 'text-text-color-light' : 'text-background-light'}`}
      >
        Schrittlänge konfigurieren
      </Header>
      <View>
        <Text
          className={`text-2xl font-atkinsonRegular ${colorscheme === 'light' ? 'text-text-color-light' : 'text-background-light'}`}
        >
          {currentStep.text}
        </Text>
        {calibrationValueNode && calibrationValueNode}
      </View>
    </>
  );
}
