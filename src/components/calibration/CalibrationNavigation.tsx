import { router } from 'expo-router';
import React, { Dispatch, SetStateAction } from 'react';
import { Text, useColorScheme, View } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { calibrationSteps } from '@/components/calibration/calibrationSteps';
import { useCalibrationStore } from '@/store/useCalibrationStore';

interface CalibrationNavigationProps {
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  calibrationModeButtons: () => React.ReactNode;
  isFromIntro?: boolean;
}
export function CalibrationNavigation({
  index,
  setIndex,
  calibrationModeButtons,
  isFromIntro,
}: CalibrationNavigationProps) {
  const { toggleSkipped } = useCalibrationStore((state) => state.actions);
  const colorscheme = useColorScheme();
  const isLastStep = calibrationSteps().length - 1 === index;
  const isFirstStep = index === 0;
  const currentElement = calibrationSteps()[index];

  const backButtonHandler = () => {
    const skip = isFromIntro && isFirstStep;
    if (skip) {
      toggleSkipped();

      return;
    }
    if (isFirstStep) {
      router.back();

      return;
    }

    setIndex((prevIndex) => prevIndex - 1);
  };

  const nextButtonHandler = () => {
    if (isFromIntro && isLastStep) {
      router.setParams({});
      router.replace({ pathname: '/home/' });

      return;
    }
    if (isLastStep) {
      router.back();

      return;
    }

    setIndex((prevIndex) => prevIndex + 1);
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
        onPress={backButtonHandler}
      >
        {isFromIntro && isFirstStep
          ? 'Überspringen'
          : currentElement.backButtonText}
      </Button>
      {currentElement.forwardButtonText === undefined ? (
        calibrationModeButtons()
      ) : (
        <Button
          buttonType={isFirstStep ? 'accent' : 'primary'}
          disabled={false}
          onPress={nextButtonHandler}
        >
          {currentElement.forwardButtonText}
        </Button>
      )}
    </View>
  );
}
