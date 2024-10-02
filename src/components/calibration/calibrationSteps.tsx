import { router } from 'expo-router';
import React, { ReactElement } from 'react';
import { Text } from 'react-native';

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
  id: number
): CalibrationStepsProps[] => [
  {
    forwardButtonText: 'Kalibrieren',
    forwardButtonHandler: () => {
      router.push(`/profile/calibration/${id + 1}`);
    },
    text: `Deine kalibrierte Schrittlänge beträgt`,
    backButtonText: 'Zurücksetzen',
    backButtonHandler: () => {
      resetCalibrationStore();
    },
    calibrationValueNode: (
      <Text
        className="text-4xl font-generalSansSemi pt-4 text-primary"
        testID="calibrationValue"
      >
        {factors && getCalibrationValue(factors)
          ? `${getCalibrationValue(factors)} m`
          : '-'}
      </Text>
    ),
  },
  {
    forwardButtonText: 'Weiter',
    forwardButtonHandler: () => {
      router.push(`/profile/calibration/${id + 1}`);
    },
    text: 'Nun kalibrieren wir gemeinsam deine Schrittlänge, damit wir dich so genau wie möglich an dein Ziel bringen können.',
    backButtonText:
      factors && getCalibrationValue(factors) ? 'Zurück' : 'Überspringen',
    backButtonHandler: () => {
      if (factors && getCalibrationValue(factors)) {
        router.back();

        return;
      }
      // shownIntroHandler();
      router.replace('/home');
    },
  },
  {
    forwardButtonText: 'Weiter',
    forwardButtonHandler: () => {
      router.push(`/profile/calibration/${id + 1}`);
    },
    text: 'Bitte stelle sicher, dass du deine Schritte auf einer möglichst geraden Strecke ohne Hindernisse kalibriert.\nSolltest du dir unsicher sein, bitte eine vertraute Person um Hilfe.',
    backButtonText: 'Zurück',
    backButtonHandler: () => {
      router.back();
    },
  },
  {
    forwardButtonText: 'Weiter',
    forwardButtonHandler: () => {
      router.push(`/profile/calibration/${id + 1}`);
    },
    text: 'Wenn du dir sicher bist deine Schritte konfigurieren zu können, können wir starten!',
    backButtonText: 'Zurück',
    backButtonHandler: () => {
      router.back();
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
