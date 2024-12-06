import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import { calculateSteps } from '@/functions/calculateSteps';

interface TripStepProps {
  icon: React.ReactNode;
  instruction: string | undefined;
  manueverLength: number | undefined;
  calibrationFactor: number;
}
export function TripStep({
  icon,
  instruction,
  manueverLength,
  calibrationFactor,
}: TripStepProps) {
  const stepsToGo = calculateSteps(manueverLength, calibrationFactor);

  return (
    <SafeAreaView className="flex-1 m-5">
      {instruction && (
        <View className="flex-1 justify-center items-center text-center">
          {icon}
          <Text className="text-large text-textColor font-generalSansSemi py-5">
            {stepsToGo} Schritte
          </Text>
          <Text className="text-medium text-primary font-generalSansSemi">
            {instruction}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
