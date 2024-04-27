import { router } from 'expo-router';
import React, { Dispatch, SetStateAction } from 'react';
import { Text, useColorScheme, View } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { calibrationTexts } from '@/components/calibration/calibrationTexts';

export function Navigation({
  index,
  setIndex,
  calibrationModeButtons,
}: {
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  calibrationModeButtons: () => React.ReactNode;
}) {
  const colorscheme = useColorScheme();
  const isLastStep = calibrationTexts().length - 1 === index;
  const isFirstStep = index === 0;
  const navigationButton = (pageIndex: number) => {
    if (pageIndex === 4) {
      return calibrationModeButtons();
    }
    let buttonText = 'Weiter';
    if (pageIndex === 0) {
      buttonText = 'Kalibrieren';
    }
    if (pageIndex === 3) {
      buttonText = 'Los gehts';
    }
    if (pageIndex === 6) {
      buttonText = 'Fertig';
    }

    return (
      <Button
        buttonType={isFirstStep ? 'accent' : 'primary'}
        disabled={false}
        onPress={isLastStep ? () => router.back() : () => setIndex(index + 1)}
      >
        {buttonText}
      </Button>
    );
  };

  return (
    <View className="mx-8 mb-3">
      <Text
        className={`mx-auto font-atkinsonRegular text-xl ${colorscheme === 'light' ? 'text-text-color-light' : 'text-background-light'}`}
      >
        Schritt {index + 1} / {calibrationTexts().length}
      </Text>

      <Button
        buttonType="primaryOutline"
        disabled={false}
        // TODO Last step delete newest calibration
        onPress={isFirstStep ? () => router.back() : () => setIndex(index - 1)}
      >
        {index === 5 ? 'Wiederholen' : 'Zurück'}
      </Button>
      {navigationButton(index)}
    </View>
  );
}
