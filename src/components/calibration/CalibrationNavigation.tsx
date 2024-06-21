import { router } from 'expo-router';
import React, { Dispatch, SetStateAction } from 'react';
import { ColorSchemeName, Text, View } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { CalibrationStepsProps } from '@/components/calibration/calibrationSteps';
import { useCalibrationStore } from '@/store/useCalibrationStore';

interface CalibrationNavigationProps {
  setIndex: Dispatch<SetStateAction<number>>;
  calibrationModeButtons: () => React.ReactNode;
  isFromIntro?: boolean;
  currentElement: CalibrationStepsProps;
  isInCalibrationMode: boolean;
  isFirstStep: boolean;
  isLastStep: boolean;
  stepText: string;
  colorscheme: ColorSchemeName;
}
export function CalibrationNavigation({
  setIndex,
  calibrationModeButtons,
  isFromIntro,
  currentElement,
  isFirstStep,
  isInCalibrationMode,
  isLastStep,
  stepText,
  colorscheme,
}: CalibrationNavigationProps) {
  const { shownIntroHandler } = useCalibrationStore((state) => state.actions);
  const { resetCalibrationStore } = useCalibrationStore(
    (state) => state.actions
  );
  const backButtonHandler = () => {
    const skip = isFromIntro && isFirstStep;
    if (skip) {
      shownIntroHandler();

      return;
    }
    if (!isFromIntro && isFirstStep) {
      resetCalibrationStore();

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
      shownIntroHandler();
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
        {stepText}
      </Text>

      <Button
        buttonType="primaryOutline"
        // TODO Last step delete newest calibration
        onPress={backButtonHandler}
        disabled={isInCalibrationMode}
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
          onPress={nextButtonHandler}
        >
          {currentElement.forwardButtonText}
        </Button>
      )}
    </View>
  );
}
