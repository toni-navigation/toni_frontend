import { useMutation } from '@tanstack/react-query';
import { Pedometer } from 'expo-sensors';

export function usePedometerAvailable() {
  return useMutation({
    mutationFn: Pedometer.isAvailableAsync,
  });
}
