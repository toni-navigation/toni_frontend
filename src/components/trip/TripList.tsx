import React from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  useColorScheme,
  View,
} from 'react-native';

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
  const colorscheme = useColorScheme();

  return (
    <SafeAreaView className="flex-1 mx-5">
      <FlatList
        data={maneuvers}
        renderItem={({ item, index }) => (
          <View
            className={`px-2 py-1 ${index === 0 ? `border-solid border-2 rounded-[25px] ${colorscheme === 'light' ? 'border-primary-color-dark' : 'border-primary-color-light'}` : ''}`}
          >
            <ListItem>
              <Text
                className={`text-2xl font-atkinsonRegular ${colorscheme === 'light' ? 'text-text-color-light' : 'text-text-color-dark'}`}
              >
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
