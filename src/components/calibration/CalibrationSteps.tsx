import React from 'react';
import { Text, View } from 'react-native';

interface CalibrationHeaderProps {
  steps: number;
}
export function CalibrationSteps({ steps }: CalibrationHeaderProps) {
  return (
    <View>
      <Text
        testID="Mode"
        className="text-small font-atkinsonRegular mt-8 mb-2 text-textColor text-center"
      >
        Gelaufene Schritte:
      </Text>
      <Text className="text-large font-generalSansSemi text-primary text-center">
        {steps}
      </Text>
    </View>
  );
}
