import { router } from 'expo-router';
import { ReactElement } from 'react';

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
  id: number,
  fromIntro: boolean
): CalibrationStepsProps[] => [
  {
    forwardButtonText: 'Weiter',
    forwardButtonHandler: () => {
      // router.push(`../calibration/${id + 1}`);
    },
    text:
      'Nun kalibrieren wir gemeinsam deine Schrittlänge, damit wir dich so genau wie möglich an dein Ziel bringen können.\n\n' +
      'Stelle dazu sicher, dass du deine Schritte auf einer geraden Strecke ohne Hindernisse kalibrierst.\n\n' +
      'Solltest du dir unsicher sein, bitte eine vertraute Person um Hilfe.',
    backButtonText: fromIntro ? 'Überspringen' : 'Zurück',
    backButtonHandler: () => {
      if (fromIntro) {
        router.dismissAll();
        // router.replace('/home');

        return;
      }
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
      // if (fromIntro) {
      router.replace('/home');
      // }
      // router.push('./profile');
    },
    text:
      'Geschafft! Es werden nun alle Anweisungen speziell auf deine Schrittlänge angepasst! \n\n' +
      'Du kannst deine Schrittlänge jederzeit unter deinen Profileinstellungen neu kalibrieren.',
    backButtonText: 'Erneut',
    backButtonHandler: () => {
      router.back();
    },
  },
];
