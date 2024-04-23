import { router } from 'expo-router';
import React from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { ListItem } from '@/components/atoms/ListItem';
import { getCalibrationValue } from '@/functions/getCalibrationValue';
import { tripInstructionOutput } from '@/functions/tripInstructionOutput';
import { useCalibrationStore } from '@/store/useCalibrationStore';
import { ValhallaManeuverProps } from '@/types/Valhalla-Types';

export function TripList({
  maneuvers,
}: {
  maneuvers: ValhallaManeuverProps[];
}) {
  const calibration = useCalibrationStore((state) => state.calibration);

  return (
    <SafeAreaView className="flex-1">
      <FlatList
        data={maneuvers}
        className="mx-5 my-5"
        renderItem={({ item, index }) => (
          <ListItem>
            <Text>
              {index + 1}
              {'. '}
              {tripInstructionOutput(
                item,
                getCalibrationValue(calibration.factors)
              )}
            </Text>
          </ListItem>
        )}
      />
      <View className="mx-5">
        <Button onPress={() => router.back()} buttonType="primary">
          <Text>Beenden</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
