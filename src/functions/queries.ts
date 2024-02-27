import { useQuery } from '@tanstack/react-query';
import { fetchTripHandler } from './fetch';
import { LocationProps } from '../../types/Types';

/*export default function useTrip(points: (LocationProps | undefined | null)[]) {
  return useQuery({
    queryKey: ['trip', { points }],
    queryFn: () => fetchTripHandler(points),
  });
}*/
