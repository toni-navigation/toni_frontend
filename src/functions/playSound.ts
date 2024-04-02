import { Audio, AVPlaybackSource } from 'expo-av';

export async function playSound(source: AVPlaybackSource) {
  let sound: Audio.Sound | null = null;
  sound = new Audio.Sound();

  await sound.loadAsync(source);
  await sound.playAsync();
  await Audio.setAudioModeAsync({
    playsInSilentModeIOS: true,
  });

  return sound;
}
