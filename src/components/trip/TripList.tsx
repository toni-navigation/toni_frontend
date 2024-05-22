import React from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';

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
    <SafeAreaView className="flex-1 m-4">
      <FlatList
        data={maneuvers}
        renderItem={({ item, index }) => (
          <View
            className={` px-2 py-1 ${index === 0 ? 'border-solid border-2 rounded-[25px] border-primary-color-dark' : ''}`}
          >
            <ListItem>
              <Text className="text-2xl font-atkinsonRegular">
                {index + 1}
                {'. '}
                {tripInstructionOutput(
                  item,
                  getCalibrationValue(calibration.factors)
                )}
              </Text>
            </ListItem>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
