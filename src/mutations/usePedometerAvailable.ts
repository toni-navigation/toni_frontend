import { useMutation } from '@tanstack/react-query';
import { Pedometer } from 'expo-sensors';
import { AccessibilityInfo } from 'react-native';

export function usePedometerAvailable() {
  return useMutation({
    mutationFn: Pedometer.isAvailableAsync,
    onError: (error: Error) => {
      AccessibilityInfo.announceForAccessibility(error.message);
    },
  });
}
