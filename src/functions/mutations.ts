import { useMutation } from '@tanstack/react-query';
import { fetchReverseDataHandler, fetchSearchDataHandler } from './fetch';
import { LocationType } from '../../types/Types';

export function useSearchData() {
  return useMutation({
    mutationKey: ['searchData'],
    mutationFn: (data: string) => fetchSearchDataHandler(data),
  });
}

export function useReverseData() {
  return useMutation({
    mutationKey: ['reverseData'],
    mutationFn: (data: LocationType) => fetchReverseDataHandler(data),
  });
}
