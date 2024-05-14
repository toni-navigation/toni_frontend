import React from 'react';
import { ColorSchemeName, Text } from 'react-native';

import { getCalibrationValue } from '@/functions/getCalibrationValue';

export interface CalibrationStepsProps {
  text: string;
  forwardButtonText?: string;
  backButtonText?: string;
  calibrationValueNode?: React.ReactNode;
}
export const calibrationSteps = (
  meters?: number[] | undefined,
  colorscheme?: ColorSchemeName
): CalibrationStepsProps[] => [
  {
    forwardButtonText: `${meters ? 'Zurücksetzen' : 'Kalibrieren'}`,
    text: `Deine kalibrierte Schrittlänge beträgt`,
    backButtonText: 'Zurück',
    calibrationValueNode: (
      <Text
        className={`text-4xl font-generalSansSemi pt-4 ${colorscheme === 'light' ? 'text-primary-color-dark' : 'text-primary-color-light'}`}
      >
        {meters ? getCalibrationValue(meters) : 0} m
      </Text>
    ),
  },
  {
    forwardButtonText: 'Weiter',
    text: 'Nun kalibrieren wir gemeinsam deine Schrittlänge, damit wir dich so genau wie möglich an dein Ziel bringen können.',
    backButtonText: 'Zurück',
  },
  {
    forwardButtonText: 'Weiter',
    text: 'Bitte stelle sicher, dass du deine Schritte auf einer möglichst geraden Strecke ohne Hindernisse kalibriert.\nSolltest du dir unsicher sein, bitte eine vertraute Person um Hilfe.',
    backButtonText: 'Zurück',
  },
  {
    forwardButtonText: 'Weiter',
    text: 'Wenn du dir sicher bist deine Schritte konfigurieren zu können, können wir starten!',
    backButtonText: 'Zurück',
  },
  {
    text: 'Wenn du auf Start Kalibrierung klickst, ertönt eine Melodie. Laufe so lange geradeaus, bis die Melodie stoppt.',
    backButtonText: 'Zurück',
  },
  {
    forwardButtonText: 'Fertig',
    text: `Deine kalibrierte Schrittlänge beträgt ${meters ? getCalibrationValue(meters) : 0}m.\nDu kannst deine Schrittlänge jederzeit unter deinen ProfilEinstellungen neu Kalibrieren!`,
    backButtonText: 'Zurück',
  },
];
