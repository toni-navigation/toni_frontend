import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { ListItem } from '@/components/atoms/ListItem';
import { tripInstructionOutput } from '@/functions/tripInstructionOutput';
import { TripProps } from '@/types/Valhalla-Types';
import { getCalibrationValue } from '@/functions/getCalibrationValue';
import { useCalibrationStore } from '@/store/useCalibrationStore';

export function TripList({ data }: { data: TripProps }) {
  const calibration = useCalibrationStore((state) => state.calibration);

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="mx-5 my-5">
        {data.legs[0].maneuvers.map((maneuver, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <ListItem key={index}>
            <Text>
              {index + 1}.{' '}
              {tripInstructionOutput(
                maneuver,
                getCalibrationValue(calibration.factors)
              )}
            </Text>
          </ListItem>
        ))}
      </ScrollView>
      <View className="mx-5">
        <Button onPress={() => router.back()} buttonType="primary">
          <Text>Beenden</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
