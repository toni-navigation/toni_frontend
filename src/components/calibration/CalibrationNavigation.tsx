import React from 'react';
import { View } from 'react-native';

interface CalibrationNavigationProps {
  children: React.ReactNode;
}
export function CalibrationNavigation({
  children,
}: CalibrationNavigationProps) {
  return <View className="flex flex-row mx-8 mb-3 gap-1.5 ">{children}</View>;
}
