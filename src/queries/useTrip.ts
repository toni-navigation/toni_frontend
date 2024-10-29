import { useSuspenseQuery } from '@tanstack/react-query';

import { SearchParamType } from '@/components/trip/Trip';
import { fetchTripHandler } from '@/functions/fetchTripHandler';

export function useTrip(tripData: SearchParamType) {
  return useSuspenseQuery({
    queryKey: ['valhalla', tripData],
    queryFn: () => fetchTripHandler(tripData),
  });
}
