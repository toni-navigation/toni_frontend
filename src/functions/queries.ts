import { useQuery } from '@tanstack/react-query';
import { fetchTripHandler } from './fetch';
import { LocationType } from '../../types/Types';

export default function useTrip(points: (LocationType | undefined)[]) {
  return useQuery({
    queryKey: ['trip', { points }],
    queryFn: () => fetchTripHandler(points),
  });
}
