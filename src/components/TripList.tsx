import React from 'react';
import { FlatList, SafeAreaView, Text } from 'react-native';

import { ListItem } from '@/components/atoms/ListItem';
import { getCalibrationValue } from '@/functions/getCalibrationValue';
import { tripInstructionOutput } from '@/functions/tripInstructionOutput';
import { useCalibrationStore } from '@/store/useCalibrationStore';
import { TripProps } from '@/types/Valhalla-Types';

export function TripList({ data }: { data: TripProps }) {
  const calibration = useCalibrationStore((state) => state.calibration);

  return (
    <SafeAreaView className="flex-1 m-5">
      <FlatList
        data={data.legs[0].maneuvers}
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
    </SafeAreaView>
  );
}
