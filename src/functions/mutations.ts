import { useMutation } from '@tanstack/react-query';
import { Audio, AVPlaybackSource } from 'expo-av';
import { AccessibilityInfo } from 'react-native';

import {
  fetchReverseDataHandler,
  fetchSearchDataHandler,
  fetchTripHandler,
} from './fetch';
import {
  getCurrentPosition,
  pedometerCallback,
  playSound,
  stopSound,
} from './functions';
import { CurrentLocationType, LocationProps } from '../types/Types';

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
export function usePedometer() {
  return useMutation({
    mutationKey: ['pedometer'],
    mutationFn: pedometerCallback,
    onError: (error: Error) => {
      AccessibilityInfo.announceForAccessibility(error.message);
    },
  });
}

export function useStartSound() {
  return useMutation({
    mutationKey: ['sound'],
    mutationFn: (source: AVPlaybackSource) => playSound(source),
  });
}

export function useStopSound() {
  return useMutation({
    mutationKey: ['sound'],
    mutationFn: (sound: Audio.Sound) => stopSound(sound),
  });
}
