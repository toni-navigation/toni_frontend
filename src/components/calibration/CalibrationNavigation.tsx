import React from 'react';
import { Text, View } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { CalibrationStepsProps } from '@/components/calibration/calibrationSteps';

interface CalibrationNavigationProps {
  index: number;
  calibrationModeButtons: () => React.ReactNode;
  currentElement: CalibrationStepsProps;
  isInCalibrationMode: boolean;
  stepText: string;
}
export function CalibrationNavigation({
  index,
  calibrationModeButtons,
  currentElement,
  isInCalibrationMode,
  stepText,
}: CalibrationNavigationProps) {
  return (
    <View className="mx-8 mb-3">
      <Text className="mx-auto font-atkinsonRegular text-xl text-textColor">
        {stepText}
      </Text>

      <Button
        buttonType="primaryOutline"
        onPress={currentElement.backButtonHandler}
        disabled={isInCalibrationMode}
      >
        {currentElement.backButtonText}
      </Button>
      {currentElement.forwardButtonText === undefined ? (
        calibrationModeButtons()
      ) : (
        <Button
          buttonType={index === 0 ? 'accent' : 'primary'}
          onPress={currentElement.forwardButtonHandler}
        >
          {currentElement.forwardButtonText}
        </Button>
      )}
    </View>
  );
}
