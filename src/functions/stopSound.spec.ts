import { Audio } from 'expo-av';

import { stopSound } from '@/functions/stopSound';

jest.mock('expo-av', () => ({
  Audio: {
    Sound: jest.fn().mockImplementation(() => ({
      unloadAsync: jest.fn(),
    })),
    setAudioModeAsync: jest.fn(),
  },
}));

describe('stopSound', () => {
  it('should unload the sound and set audio mode', async () => {
    const sound = new Audio.Sound();
    await stopSound(sound);

    expect(sound.unloadAsync).toHaveBeenCalledTimes(1);
    expect(Audio.setAudioModeAsync).toHaveBeenCalledWith({
      playsInSilentModeIOS: false,
    });
  });
});
