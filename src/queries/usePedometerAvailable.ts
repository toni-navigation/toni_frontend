import { useSuspenseQuery } from '@tanstack/react-query';
import { Pedometer } from 'expo-sensors';

export function usePedometerAvailable() {
  return useSuspenseQuery({
    queryKey: ['pedometer-available'],
    queryFn: async () => {
      const isAvailable = await Pedometer.isAvailableAsync();
      // changePedometerAvailability(isAvailable);

      return isAvailable;
    },
    staleTime: 7 * 24 * 60 * 60 * 1000,
    // staleTime: 1000,
    // refetchInterval: 1000,
  });
}
