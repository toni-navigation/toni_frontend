import React from 'react';
import { SafeAreaView } from 'react-native';

export function TripStep({ children }: { children: React.ReactNode }) {
  return <SafeAreaView className="flex-1 m-5">{children}</SafeAreaView>;
}
