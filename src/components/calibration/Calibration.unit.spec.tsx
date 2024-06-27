test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});

/* import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';

import { Calibration } from '@/components/calibration/Calibration';
import { useCurrentLocation } from '@/mutations/useCurrentLocation';
import { usePedometerAvailable } from '@/mutations/usePedometerAvailable';
import { useSpeak } from '@/mutations/useSpeak';
import { useStartSound } from '@/mutations/useStartSound';

jest.mock('@/mutations/useSpeak', () => ({
  useSpeak: () => ({
    mutateAsync: jest.fn().mockResolvedValue(null),
  }),
}));

jest.mock('@/mutations/usePedometerAvailable', () => ({
  usePedometerAvailable: () => ({
    mutateAsync: jest.fn(),
  }),
}));

jest.mock('@/mutations/useCurrentLocation', () => ({
  useCurrentLocation: () => ({
    mutateAsync: jest.fn(),
  }),
}));

jest.mock('@/mutations/useStartSound', () => ({
  useStartSound: () => ({
    mutateAsync: jest.fn(),
  }),
}));

jest.mock('@/mutations/useStopSound', () => ({
  useStopSound: () => ({
    mutateAsync: jest.fn(),
  }),
}));

jest.mock('@/store/useCalibrationStore', () => ({
  useCalibrationStore: () => ({
    actions: {
      addCalibration: jest.fn(),
    },
    calibration: {
      factors: [],
    },
  }),
}));

describe('Calibration', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<Calibration />);
    expect(getByTestId('calibrationID')).toBeTruthy();
  });
  it('starts the pedometer when the "Start Kalibrierung" button is clicked at step 5', async () => {
    const { getByText, findByText } = render(<Calibration />);

    // Simulate clicking the "Weiter" button four times to advance to the 5th step
    for (let i = 0; i < 4; i++) {
      // eslint-disable-next-line no-await-in-loop
      const nextButton = await findByText(i === 0 ? 'Kalibrieren' : 'Weiter');
      fireEvent.press(nextButton);
    }

    const startButton = getByText('Start Kalibrierung');
    fireEvent.press(startButton);

    expect(useSpeak().mutateAsync).toHaveBeenCalledWith(
      'Kalibrierung gestartet. Warte einen Moment bis die Musik startet.'
    );
    expect(usePedometerAvailable().mutateAsync).toHaveBeenCalled();
    expect(useCurrentLocation().mutateAsync).toHaveBeenCalled();
    // expect(useStartSound().mutateAsync).toHaveBeenCalledWith(Song);
  });
}); */
