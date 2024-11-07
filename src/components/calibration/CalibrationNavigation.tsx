import React from 'react';
import { View } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { CalibrationStepsProps } from '@/components/calibration/calibrationSteps';

interface CalibrationNavigationProps {
  index: number;
  calibrationModeButtons: () => React.ReactNode;
  currentElement: CalibrationStepsProps;
  isInCalibrationMode: boolean;
}
export function CalibrationNavigation({
  index,
  calibrationModeButtons,
  currentElement,
  isInCalibrationMode,
}: CalibrationNavigationProps) {
  return (
    <View className="flex flex-row mx-8 mb-3">
      <View className="pe-2 w-1/2">
        <Button
          width="full"
          buttonType="primaryOutline"
          onPress={currentElement.backButtonHandler}
          disabled={isInCalibrationMode}
        >
          {currentElement.backButtonText}
        </Button>
      </View>
      <View className="ps-2 w-1/2">
        {currentElement.forwardButtonText === undefined ? (
          calibrationModeButtons()
        ) : (
          <Button
            width="full"
            buttonType={index === 0 ? 'accent' : 'primary'}
            onPress={currentElement.forwardButtonHandler}
          >
            {currentElement.forwardButtonText}
          </Button>
        )}
      </View>
    </View>
  );
}
