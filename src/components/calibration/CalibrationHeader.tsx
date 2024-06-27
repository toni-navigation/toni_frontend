import React from 'react';
import { Text, View } from 'react-native';

import { Header } from '@/components/atoms/Header';
import { Logo } from '@/components/atoms/icons/Logo';
import { CalibrationStepsProps } from '@/components/calibration/calibrationSteps';

interface CalibrationHeaderProps {
  currentStep: CalibrationStepsProps;
}
export function CalibrationHeader({ currentStep }: CalibrationHeaderProps) {
  const { calibrationValueNode } = currentStep;

  return (
    <>
      <View className="flex items-center pb-6">
        <Logo width={85} height={85} />
      </View>
      <Header classes="text-textColor">Schrittlänge konfigurieren</Header>
      <View>
        <Text className="text-2xl font-atkinsonRegular text-textColor">
          {currentStep.text}
        </Text>
        {calibrationValueNode && calibrationValueNode}
      </View>
    </>
  );
}
