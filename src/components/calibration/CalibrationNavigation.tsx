import { router } from 'expo-router';
import React, { Dispatch, SetStateAction } from 'react';
import { Text, useColorScheme, View } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { calibrationSteps } from '@/components/calibration/calibrationSteps';

export function CalibrationNavigation({
  index,
  setIndex,
  calibrationModeButtons,
}: {
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  calibrationModeButtons: () => React.ReactNode;
}) {
  const colorscheme = useColorScheme();
  const isLastStep = calibrationSteps().length - 1 === index;
  const isFirstStep = index === 0;
  const currentElement = calibrationSteps()[index];
  const navigationButton = () => {
    if (!currentElement.forwardButtonText) {
      return calibrationModeButtons();
    }

    return (
      <Button
        buttonType={isFirstStep ? 'accent' : 'primary'}
        disabled={false}
        onPress={
          isLastStep
            ? () => router.back()
            : () => setIndex((prevIndex) => prevIndex + 1)
        }
      >
        {currentElement.forwardButtonText}
      </Button>
    );
  };

  return (
    <View className="mx-8 mb-3">
      <Text
        className={`mx-auto font-atkinsonRegular text-xl ${colorscheme === 'light' ? 'text-text-color-light' : 'text-background-light'}`}
      >
        Schritt {index + 1} / {calibrationSteps().length}
      </Text>

      <Button
        buttonType="primaryOutline"
        disabled={false}
        // TODO Last step delete newest calibration
        onPress={
          isFirstStep
            ? () => router.back()
            : () => setIndex((prevIndex) => prevIndex - 1)
        }
      >
        {currentElement.backButtonText}
      </Button>
      {navigationButton()}
    </View>
  );
}
