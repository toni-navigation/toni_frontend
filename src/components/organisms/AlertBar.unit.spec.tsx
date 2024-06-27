import { render } from '@testing-library/react-native';
import * as Speech from 'expo-speech';
import React from 'react';

import { AlertBar } from '@/components/organisms/AlertBar';

jest.mock('expo-speech', () => ({
  speak: jest.fn(),
}));

describe('AlertBar', () => {
  it('renders correctly and calls speak function', () => {
    const { getByText } = render(<AlertBar text="Test Alert" />);
    expect(getByText('Test Alert')).toBeTruthy();
    expect(Speech.speak).toHaveBeenCalledWith('Test Alert', { language: 'de' });
  });

  it('updates speak function when text changes', () => {
    const { rerender } = render(<AlertBar text="Test Alert" />);
    rerender(<AlertBar text="Updated Alert" />);
    expect(Speech.speak).toHaveBeenCalledWith('Updated Alert', {
      language: 'de',
    });
  });
});
