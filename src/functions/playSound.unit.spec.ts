import { Audio, AVPlaybackSource } from 'expo-av';

import { playSound } from '@/functions/playSound';

jest.mock('expo-av', () => ({
  Audio: {
    Sound: jest.fn().mockImplementation(() => ({
      loadAsync: jest.fn(),
      setIsLoopingAsync: jest.fn(),
      playAsync: jest.fn(),
    })),
    setAudioModeAsync: jest.fn(),
  },
}));

describe('playSound', () => {
  it('should load and play the sound', async () => {
    const source: AVPlaybackSource = { uri: 'test.mp3' };
    const playedSound = await playSound(source);
    expect(Audio.Sound).toHaveBeenCalledTimes(1);
    expect(playedSound.loadAsync).toHaveBeenCalledWith(source);
    expect(playedSound.setIsLoopingAsync).toHaveBeenCalledWith(true);
    expect(playedSound.playAsync).toHaveBeenCalledTimes(1);
  });

  it('should set the audio mode to play in silent mode on iOS', async () => {
    const source: AVPlaybackSource = { uri: 'test.mp3' };
    await playSound(source);

    expect(Audio.setAudioModeAsync).toHaveBeenCalledWith({
      playsInSilentModeIOS: true,
    });
  });
});
