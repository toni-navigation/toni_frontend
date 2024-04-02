import { useMutation } from '@tanstack/react-query';
import { AVPlaybackSource } from 'expo-av';

import { playSound } from '@/functions/playSound';

export function useStartSound() {
  return useMutation({
    mutationFn: (source: AVPlaybackSource) => playSound(source),
  });
}
