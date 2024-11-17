import React from 'react';
import { Text, View } from 'react-native';

import { Header } from '@/components/atoms/Header';

interface CalibrationHeaderProps {
  pedometerIsAvailable?: boolean;
}
export function CalibrationHeader({
  pedometerIsAvailable,
}: CalibrationHeaderProps) {
  return (
    <>
      <Header classes="text-textColor text-large">
        Schrittlänge konfigurieren
      </Header>

      <View className="my-8">
        <Text className="text-small font-atkinsonRegular text-textColor">
          Wenn du auf Start Kalibrierung klickst, ertönt eine Melodie.
          {pedometerIsAvailable
            ? ' Laufe so lange geradeaus, bis die Melodie stoppt.'
            : ' Laufe 30 Schritte und klicke dann auf Stopp.'}
        </Text>
      </View>
    </>
  );
}
