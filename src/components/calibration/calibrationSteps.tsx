import { router } from 'expo-router';
import { ReactElement } from 'react';

import { getCalibrationValue } from '@/functions/getCalibrationValue';

export interface CalibrationStepsProps {
  text: string;
  forwardButtonText?: string;
  forwardButtonHandler: () => void;
  backButtonText?: string | false;
  backButtonHandler: () => void;
  calibrationValueNode?: ReactElement;
  testID?: string;
}

export const calibrationSteps = (
  factors: number[] | undefined,
  resetCalibrationStore: () => void,
  shownIntroHandler: () => void,
  id: number,
  fromIntro: boolean
): CalibrationStepsProps[] => [
  {
    forwardButtonText: 'Weiter',
    forwardButtonHandler: () => {
      router.push(`../calibration/${id + 1}`);
    },
    text: 'Nun kalibrieren wir gemeinsam deine Schrittlänge, damit wir dich so genau wie möglich an dein Ziel bringen können.',
    backButtonText: fromIntro ? 'Überspringen' : 'Zurück',
    backButtonHandler: () => {
      if (fromIntro) {
        router.dismissAll();
        router.replace('/home');

        return;
      }
      router.back();
      // router.replace('/profile');
    },
  },
  {
    forwardButtonHandler: () => {},
    text: 'Wenn du auf Start Kalibrierung klickst, ertönt eine Melodie. Laufe so lange geradeaus, bis die Melodie stoppt.',
    backButtonText: 'Zurück',
    backButtonHandler: () => {
      router.back();
    },
  },
  {
    forwardButtonText: 'Fertig',
    forwardButtonHandler: () => {
      router.replace('/home/');
    },
    text: `Deine kalibrierte Schrittlänge beträgt ${
      factors && getCalibrationValue(factors)
        ? `${getCalibrationValue(factors)} m`
        : '-'
    }.\nDu kannst deine Schrittlänge jederzeit unter deinen Profileinstellungen neu Kalibrieren!`,
    backButtonText: 'Zurück',
    backButtonHandler: () => {
      router.back();
    },
  },
];
