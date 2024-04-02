import { useQuery } from '@tanstack/react-query';

import { fetchTripHandler } from '@/functions/fetchTripHandler';
import { LocationProps } from '@/types/Types';

export function useTrip(restructureTripData: LocationProps[]) {
  return useQuery({
    queryKey: ['valhalla', restructureTripData],
    queryFn: () => fetchTripHandler(restructureTripData),
  });
}
