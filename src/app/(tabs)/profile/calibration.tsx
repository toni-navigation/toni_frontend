import { useLocalSearchParams } from 'expo-router';
import React from 'react';

import { Calibration } from '@/components/calibration/Calibration';

export type SearchParamType = {
  fromIntro: number | undefined;
};
export default function CalibrationPage() {
  // const { fromIntro } = useLocalSearchParams() as SearchParamType;
  /// / if (fromIntro === 1) {
  // return <Calibration isFromIntro />;
  // }

  return <Calibration />;
}
