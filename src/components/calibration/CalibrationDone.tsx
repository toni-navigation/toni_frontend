import { router } from 'expo-router';
import React, { useContext } from 'react';
import { Text, View } from 'react-native';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
import { Button } from '@/components/atoms/Button';
import { StepLength } from '@/components/atoms/icons/StepLength';
import { CalibrationHeader } from '@/components/calibration/CalibrationHeader';
import { CalibrationNavigation } from '@/components/calibration/CalibrationNavigation';
import { getCalibrationValue } from '@/functions/getCalibrationValue';
import { useCalibrationStore } from '@/store/useCalibrationStore';

export function CalibrationDone() {
  const { theme } = useContext(ThemeContext);
  const calibration = useCalibrationStore((state) => state.calibration);

  const iconColor = themes.external[`--${theme}-mode-primary`];

  return (
    <>
      <View className="px-8 mt-8 flex-1 flex-grow">
        <CalibrationHeader />
        <View className="flex items-center border-primary border-4 justify-center mt-8 rounded-full w-1/2 aspect-square self-center">
          <StepLength fill={iconColor} width={83} height={83} />
        </View>
        <Text
          testID="Mode"
          className="text-small font-atkinsonRegular mt-16 mb-2 text-textColor text-center"
        >
          Deine Schrittlänge beträgt:
        </Text>
        <Text className="text-large font-generalSansSemi text-primary text-center">
          {calibration.factors && getCalibrationValue(calibration.factors)
            ? `${getCalibrationValue(calibration.factors)} m`
            : '-'}
        </Text>
      </View>

      <CalibrationNavigation>
        <Button
          buttonType="accent"
          width="full"
          onPress={() => router.push('/home')}
        >
          Fertig
        </Button>
      </CalibrationNavigation>
    </>
  );
}
