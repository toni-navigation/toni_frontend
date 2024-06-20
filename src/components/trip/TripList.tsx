import React from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';

import { ListItem } from '@/components/atoms/ListItem';
import { getCalibrationValue } from '@/functions/getCalibrationValue';
import { tripInstructionOutput } from '@/functions/tripInstructionOutput';
import { CalibrationProps } from '@/types/Types';
import { ValhallaManeuverProps } from '@/types/Valhalla-Types';

interface TripListProps {
  maneuvers: ValhallaManeuverProps[];
  calibration: CalibrationProps;
}
export function TripList({ maneuvers, calibration }: TripListProps) {
  return (
    <SafeAreaView className="flex-1 mx-5">
      <FlatList
        data={maneuvers}
        renderItem={({ item, index }) => (
          <View
            className={`px-2 py-1 ${index === 0 ? 'border-solid border-2 rounded-[25px] border-primary' : ''}`}
          >
            <ListItem>
              {index + 1}
              {'. '}
              {tripInstructionOutput(
                item,
                getCalibrationValue(calibration.factors)
              )}
            </ListItem>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
