import React from 'react';
import { Text, View } from 'react-native';

import { Header } from '@/components/atoms/Header';

interface CalibrationHeaderProps {
  children?: React.ReactNode;
}
export function CalibrationHeader({ children }: CalibrationHeaderProps) {
  return (
    <>
      <Header classes="text-textColor text-large">
        Schrittlänge konfigurieren
      </Header>
      {children && (
        <View className="my-8">
          <Text className="text-small font-atkinsonRegular text-textColor">
            {children}
          </Text>
        </View>
      )}
    </>
  );
}
