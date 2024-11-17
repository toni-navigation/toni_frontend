import React from 'react';
import { View } from 'react-native';

interface CalibrationNavigationProps {
  // index: number;
  // calibrationModeButtons: () => React.ReactNode;
  // currentElement: CalibrationStepsProps;
  // isInCalibrationMode: boolean;
  children: React.ReactNode;
}
export function CalibrationNavigation({
  // index,
  // calibrationModeButtons,
  // currentElement,
  // isInCalibrationMode,
  children,
}: CalibrationNavigationProps) {
  return <View className="flex flex-row mx-8 mb-3 gap-1.5 ">{children}</View>;
}
