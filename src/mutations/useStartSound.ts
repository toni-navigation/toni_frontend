import { useMutation } from '@tanstack/react-query';
import { AVPlaybackSource } from 'expo-av';

import { playSound } from '@/functions/playSound';

export function useStartSound(stopSpeech: () => void) {
  return useMutation({
    mutationFn: (source: AVPlaybackSource) => playSound(source),
    onSuccess: () => {
      // console.log('success');
      // stopSpeech();
    },
  });
}
