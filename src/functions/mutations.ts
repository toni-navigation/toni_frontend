import { useMutation } from '@tanstack/react-query';
import { Audio, AVPlaybackSource } from 'expo-av';
import { Pedometer } from 'expo-sensors';
import { AccessibilityInfo } from 'react-native';

import {
  getCurrentPosition,
  playSound,
  stopSound,
} from '@/functions/functions';
import { PhotonService } from '@/services/api-photon';

export function useReverseData() {
  return useMutation({
    mutationKey: ['reverseData'],
    mutationFn: PhotonService.reverse,
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
