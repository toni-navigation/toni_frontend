import React from 'react';
import { Text, useColorScheme, View } from 'react-native';

import { getCalibrationValue } from '@/functions/getCalibrationValue';
import { useCalibrationStore } from '@/store/useCalibrationStore';

interface CalibrationTextProps {
  index: number;
}

export function CalibrationText({ index }: CalibrationTextProps) {
  const colorscheme = useColorScheme();
  const calibration = useCalibrationStore((state) => state.calibration);

  if (index === 0) {
    return (
      <View>
        <Text
          className={`text-2xl font-atkinsonRegular ${colorscheme === 'light' ? 'text-text-color-light' : 'text-background-light'}`}
        >
          Nun Kalibrieren wir gemeinsam deine Schrittlänge, damit wir dich so
          genau wie möglich an dein Ziel bringen können.
        </Text>
      </View>
    );
  }

  if (index === 1) {
    return (
      <View>
        <Text
          className={`text-2xl font-atkinsonRegular ${colorscheme === 'light' ? 'text-text-color-light' : 'text-background-light'}`}
        >
          Bitte stelle sicher, dass du deine Schritte auf einer möglichst
          geraden Strecke ohne Hindernisse kalibriert.
        </Text>
        <Text
          className={`text-2xl font-atkinsonRegular ${colorscheme === 'light' ? 'text-text-color-light' : 'text-background-light'}`}
        >
          Solltest du dir unsicher sein, bitte eine vertraute Person um Hilfe.
        </Text>
      </View>
    );
  }

  if (index === 2) {
    return (
      <View>
        <Text
          className={`text-2xl font-atkinsonRegular ${colorscheme === 'light' ? 'text-text-color-light' : 'text-background-light'}`}
        >
          Wenn du dir sicher bist deine Schritte konfigurieren zu können, können
          wir starten!
        </Text>
      </View>
    );
  }

  if (index === 3) {
    return (
      <View>
        <Text
          className={`text-2xl font-atkinsonRegular ${colorscheme === 'light' ? 'text-text-color-light' : 'text-background-light'}`}
        >
          Wenn du auf Start Kalibrierung klickst, ertönt eine Melodie. Laufe so
          lange geradeaus, bis die Melodie stoppt.
        </Text>
      </View>
    );
  }

  if (index === 4) {
    return (
      <View>
        <Text
          className={`text-2xl font-atkinsonRegular ${colorscheme === 'light' ? 'text-text-color-light' : 'text-background-light'}`}
        >
          Deine kalibrierte Schrittlänge beträgt
        </Text>
        <Text
          className={`text-4xl font-generalSansSemi pt-4 ${colorscheme === 'light' ? 'text-primary-color-dark' : 'text-primary-color-light'}`}
        >
          {getCalibrationValue(calibration.meters)} m
        </Text>
        <Text
          className={`text-2xl pt-4 font-atkinsonRegular ${colorscheme === 'light' ? 'text-text-color-light' : 'text-background-light'}`}
        >
          Du kannst deine Schrittlänge jederzeit unter deinen Profil
          Einstellungen neu Kalibrieren!
        </Text>
      </View>
    );
  }
}
