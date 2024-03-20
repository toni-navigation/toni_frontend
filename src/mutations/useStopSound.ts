import { useMutation } from '@tanstack/react-query';
import { Audio } from 'expo-av';

import { stopSound } from '@/functions/functions';

export function useStopSound() {
  return useMutation({
    mutationFn: (sound: Audio.Sound) => stopSound(sound),
  });
}
