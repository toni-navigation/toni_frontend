import { useMutation } from '@tanstack/react-query';
import { fetchReverseDataHandler, fetchSearchDataHandler } from './fetch';
import { CurrentLocationType, LocationProps } from '../../types/Types';

export function useSearchData(currentLocation: CurrentLocationType) {
  return useMutation({
    mutationKey: ['searchData'],
    mutationFn: (data: string) => fetchSearchDataHandler(data, currentLocation),
  });
}

export function useReverseData() {
  return useMutation({
    mutationKey: ['reverseData'],
    mutationFn: (data: LocationProps) => fetchReverseDataHandler(data),
  });
}
