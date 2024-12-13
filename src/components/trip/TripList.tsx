import React, { useContext } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
import { ToniThreeCircles } from '@/components/atoms/icons/ToniThreeCircles';
import { tripInstructionOutput } from '@/functions/tripInstructionOutput';
import { ValhallaManeuverProps } from '@/types/Valhalla-Types';

interface TripListProps {
  maneuvers: ValhallaManeuverProps[];
  calibrationFactor: number | null;
}
export function TripList({ maneuvers, calibrationFactor }: TripListProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <SafeAreaView className="flex-1 mt-5 mx-5">
      <Text className="text-textColor font-generalSansSemi text-medium mb-10">
        Deine Route
      </Text>
      <FlatList
        data={maneuvers}
        renderItem={({ item, index }) => (
          <View
            className={` ${index === 0 ? 'border-primary rounded-full' : ''}`}
          >
            <View className="flex flex-row mb-3">
              <Text className="text-small text-primary font-generalSansSemi">
                {index + 1}.
              </Text>
              <View>
                <Text className="ps-2 text-small text-textColor font-generalSansSemi mb-3">
                  {tripInstructionOutput(item, calibrationFactor)}
                </Text>
                <ToniThreeCircles
                  fill={themes.external[`--${theme}-mode-primary`]}
                  width={20}
                  height={20}
                />
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
