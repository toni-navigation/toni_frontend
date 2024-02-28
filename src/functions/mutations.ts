import { useMutation } from '@tanstack/react-query';
import {
  fetchReverseDataHandler,
  fetchSearchDataHandler,
  fetchTripHandler,
} from './fetch';
import { CurrentLocationType, LocationProps } from '../../types/Types';
import { getCurrentPosition } from './functions';

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

export function useTrip() {
  return useMutation({
    mutationKey: ['trip'],
    mutationFn: (points: (LocationProps | undefined | null)[]) =>
      fetchTripHandler(points),
  });
}
export function useCurrentLocation() {
  return useMutation({
    mutationKey: ['currentLocation'],
    mutationFn: getCurrentPosition,
  });
}
