import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { Header } from '@/components/atoms/Header';
import { CalibrationNavigation } from '@/components/calibration/CalibrationNavigation';
import { useCalibrationStore } from '@/store/useCalibrationStore';

export function Finished() {
  const calibration = useCalibrationStore((state) => state.calibration);

  return (
    <SafeAreaView className="flex-1 bg-background" testID="calibrationID">
      <View className="px-8 mt-8 flex-1 flex-grow">
        <Header classes="text-textColor text-large">
          Schrittlänge konfiguriert
        </Header>
        {calibration.factor && (
          <View>
            <Text
              testID="Mode"
              className="text-small font-atkinsonRegular mt-8 mb-2 text-textColor text-center"
            >
              Schrittlänge:
            </Text>
            <Text className="text-large font-generalSansSemi text-primary text-center">
              {calibration.factor} m
            </Text>
          </View>
        )}
      </View>
      <CalibrationNavigation>
        <Button
          width="full"
          buttonType="accent"
          onPress={() => router.navigate('/profile')}
        >
          Fertig
        </Button>
      </CalibrationNavigation>
    </SafeAreaView>
  );
}

export default Finished;
