import { act, fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import { Calibration } from '@/components/calibration/Calibration';
// __mocks__/expo-av.js
export const Audio = {
  Sound: jest.fn().mockImplementation(() => ({
    loadAsync: jest.fn().mockResolvedValue(true),
    playAsync: jest.fn().mockResolvedValue(true),
    stopAsync: jest.fn().mockResolvedValue(true),
    unloadAsync: jest.fn().mockResolvedValue(true),
  })),
};

// __mocks__/expo-sensors.js
export const Pedometer = {
  watchStepCount: jest.fn(),
  isAvailableAsync: jest.fn().mockResolvedValue(true),
  Subscription: jest.fn(),
};

// __mocks__/expo-speech.js
export const Speech = {
  speak: jest.fn(),
};
// __mocks__/index.js
// jest.mock('@/components/atoms/Button', () => ({
//   Button: jest.fn().mockImplementation(({ onPress, children, disabled }) => (
//     <TouchableOpacity
//       accessibilityRole="button"
//       onPress={onPress}
//       disabled={disabled}
//     >
//       {children}
//     </TouchableOpacity>
//   )),
// }));

// jest.mock('@/components/calibration/CalibrationHeader', () => ({
//   CalibrationHeader: jest
//     .fn()
//     .mockImplementation(() => <div>Calibration Header</div>),
// }));

// jest.mock('@/components/calibration/CalibrationMode', () => ({
//   CalibrationMode: jest
//     .fn()
//     .mockImplementation(() => <div>Calibration Mode</div>),
// }));

// jest.mock('@/components/calibration/CalibrationNavigation', () => ({
//   CalibrationNavigation: jest
//     .fn()
//     .mockImplementation(() => <div>Calibration Navigation</div>),
// }));

// jest.mock('@/components/organisms/AlertBar', () => ({
//   AlertBar: jest.fn().mockImplementation(({ text }) => <div>{text}</div>),
// }));

// jest.mock('@/functions/getDistanceInMeter', () => ({
//   getDistanceInMeter: jest.fn().mockReturnValue(20),
// }));

jest.mock('@/mutations/useCurrentLocation', () => ({
  useCurrentLocation: jest.fn().mockReturnValue({
    mutateAsync: jest.fn().mockResolvedValue({
      coords: { latitude: 0, longitude: 0, accuracy: 5 },
    }),
    isPending: false,
  }),
}));

jest.mock('@/mutations/usePedometerAvailable', () => ({
  usePedometerAvailable: jest.fn().mockReturnValue({
    mutateAsync: jest.fn().mockResolvedValue(true),
    isPending: false,
  }),
}));

jest.mock('@/mutations/useSpeak', () => ({
  useSpeak: jest.fn().mockReturnValue({
    mutateAsync: jest.fn().mockResolvedValue(true),
    isPending: false,
  }),
}));

jest.mock('@/mutations/useStartSound', () => ({
  useStartSound: jest.fn().mockReturnValue({
    mutateAsync: jest.fn().mockResolvedValue({}),
    isPending: false,
  }),
}));

jest.mock('@/mutations/useStopSound', () => ({
  useStopSound: jest.fn().mockReturnValue({
    mutateAsync: jest.fn().mockResolvedValue(true),
    isPending: false,
  }),
}));

jest.mock('@/store/useCalibrationStore', () => ({
  useCalibrationStore: jest.fn().mockReturnValue({
    calibration: {
      factors: [],
    },
    actions: {
      addCalibration: jest.fn(),
    },
  }),
}));

jest.mock('@/mutations/useCurrentLocation');
jest.mock('@/mutations/usePedometerAvailable');
jest.mock('@/mutations/useSpeak');
jest.mock('@/mutations/useStartSound');
jest.mock('@/mutations/useStopSound');
jest.mock('@/store/useCalibrationStore');
jest.mock('expo-sensors');

describe('Calibration Component', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<Calibration />);
    expect(getByTestId('calibrationID')).toBeTruthy();
  });
  it('starts calibration when "Start Kalibrierung" button is pressed', () => {
    const { getByText } = render(<Calibration />);
    const button = getByText('Kalibrieren');
    fireEvent.press(button);
    expect(getByText('Zurück')).toBeTruthy();
  });
  it('stops calibration when "Abbrechen" button is pressed', async () => {
    const { getByText } = render(<Calibration />);
    const calibrate = getByText('Kalibrieren');

    await act(async () => {
      fireEvent.press(calibrate);
    });

    const next = getByText('Weiter');
    expect(getByText('Schritt 2 / 6')).toBeTruthy();

    await act(async () => {
      fireEvent.press(next);
    });

    expect(getByText('Schritt 3 / 6')).toBeTruthy();

    await act(async () => {
      fireEvent.press(next);
    });

    expect(getByText('Schritt 4 / 6')).toBeTruthy();

    await act(async () => {
      fireEvent.press(next);
    });

    expect(getByText('Schritt 5 / 6')).toBeTruthy();

    // expect(getByText('Stopp')).toBeTruthy();
  });
});
