import { useMutation } from '@tanstack/react-query';
import * as Speech from 'expo-speech';

export function useSpeak() {
  return useMutation({
    mutationFn: (text: string) =>
      new Promise((resolve: any, reject) => {
        Speech.speak(text, {
          language: 'de',
          onDone: () => resolve(),
          onError: () => reject(),
        });
      }),
  });
}
