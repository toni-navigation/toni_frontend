import React, { useContext } from 'react';
import { Text, View } from 'react-native';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
import { Button } from '@/components/atoms/Button';
import { IconButton } from '@/components/atoms/IconButton';
import { ToniMap } from '@/components/atoms/icons/ToniMap';
import { calculateSteps } from '@/functions/calculateSteps';

interface TripSummaryProps {
  summary: { time: number; length: number };
  onPressMap: () => void;
  setIconButton: 'accent' | 'accentOutline' | 'primary' | 'primaryOutline';
}

export function TripSummary({
  summary,
  onPressMap,
  setIconButton,
}: TripSummaryProps) {
  const { theme } = useContext(ThemeContext);
  const convertSecondsToMinutes = (seconds: number | undefined) => {
    if (!seconds) return 0;

    return Math.floor(seconds / 60);
  };

  const getStrokeColor = (
    buttonType: 'accent' | 'accentOutline' | 'primary' | 'primaryOutline'
  ) => {
    switch (buttonType) {
      case 'primary':
        return themes.external[`--${theme}-mode-primary-inverted`];
      case 'primaryOutline':
        return themes.external[`--${theme}-mode-primary`];
      default:
        return themes.external[`--${theme}-mode-primary`];
    }
  };

  return (
    <View className="flex items-center my-5 text-center text-textColor text-medium font-generalSansSemi">
      <Text className="text-textColor text-medium font-generalSansSemi">
        Noch
      </Text>
      <Text className="text-textColor text-medium font-generalSansSemi">
        {convertSecondsToMinutes(summary.time)} min
        {' | '}
        {summary.length} km
        {' | '}
        {calculateSteps(summary.length, 1.2)} Schritte
      </Text>
      <View className="mt-8 w-full flex items-center flex-row justify-center relative">
        <View className="w-2/3 flex items-center px-5">
          <Button onPress={() => {}} buttonType="accentOutline" width="full">
            Beenden
          </Button>
        </View>
        <View className="absolute right-0">
          <IconButton
            icon={
              <ToniMap
                stroke={getStrokeColor(setIconButton)}
                width={25}
                height={25}
                strokeWidth={4}
              />
            }
            iconName="Karte"
            onPress={onPressMap}
            buttonType={setIconButton}
          />
        </View>
      </View>
    </View>
  );
}
