import { useLocalSearchParams } from 'expo-router';
import React from 'react';

import { Calibration } from '@/components/calibration/Calibration';

export default function CalibrationPage() {
  const { id, fromIntro } = useLocalSearchParams();

  return <Calibration id={Number(id)} fromIntro={fromIntro === 'true'} />;
}
