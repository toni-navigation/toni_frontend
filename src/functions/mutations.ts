import { useMutation } from '@tanstack/react-query';
import { Audio, AVPlaybackSource } from 'expo-av';
import { Pedometer } from 'expo-sensors';
import { AccessibilityInfo } from 'react-native';

import { fetchTripHandler } from '@/functions/fetch';
import {
  getCurrentPosition,
  playSound,
  stopSound,
} from '@/functions/functions';
import { PhotonService } from '@/services/api-photon';
import { LocationProps } from '@/types/Types';

export function useReverseData() {
  return useMutation({
    mutationKey: ['reverseData'],
    mutationFn: PhotonService.reverse,
  });
}

export function useTrip() {
  return useMutation({
    mutationFn: (points: (LocationProps | undefined | null)[]) =>
      fetchTripHandler(points),
  });
}
export function useCurrentLocation() {
  return useMutation({
    mutationFn: getCurrentPosition,
  });
}
export function usePedometerAvailable() {
  return useMutation({
    mutationFn: Pedometer.isAvailableAsync,
    onError: (error: Error) => {
      AccessibilityInfo.announceForAccessibility(error.message);
    },
  });
}

export function useStartSound() {
  return useMutation({
    mutationFn: (source: AVPlaybackSource) => playSound(source),
  });
}

export function useStopSound() {
  return useMutation({
    mutationFn: (sound: Audio.Sound) => stopSound(sound),
  });
}
