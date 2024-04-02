import { Audio } from 'expo-av';

export async function stopSound(sound: Audio.Sound) {
  await sound.unloadAsync();
  await Audio.setAudioModeAsync({
    playsInSilentModeIOS: false,
  });

  return sound;
}
