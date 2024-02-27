import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchReverseDataHandler, fetchTripHandler } from './fetch';
import { LocationProps } from '../../types/Types';

/*export default function useTrip(points: (LocationProps | undefined | null)[]) {
  return useQuery({
    queryKey: ['trip', { points }],
    queryFn: () => fetchTripHandler(points),
  });
}*/
/*export default function useReverseDataQuery(data: LocationProps) {
  console.log('called');
  return useQuery({
    queryKey: ['reverseData', { data }],
    queryFn: () => fetchReverseDataHandler(data),
  });
}*/
