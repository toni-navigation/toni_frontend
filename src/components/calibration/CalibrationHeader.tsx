import React from 'react';
import { Text, View } from 'react-native';

import { Header } from '@/components/atoms/Header';
import { CalibrationStepsProps } from '@/components/calibration/calibrationSteps';

interface CalibrationHeaderProps {
  currentStep: CalibrationStepsProps;
}
export function CalibrationHeader({ currentStep }: CalibrationHeaderProps) {
  return (
    <>
      <Header classes="text-textColor text-large">
        Schrittlänge konfigurieren
      </Header>
      <View className="my-8">
        <Text className="text-small font-atkinsonRegular text-textColor">
          {currentStep.text}
        </Text>
      </View>
    </>
  );
}
