import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import { Intro } from '@/components/Intro';

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
describe('Intro', () => {
  it('should render initial state correctly', () => {
    const { getByText } = render(<Intro />);
    expect(getByText('Dein Weg')).toBeTruthy();
    expect(getByText('Dein Klang')).toBeTruthy();
    expect(getByText('Deine Freiheit')).toBeTruthy();
  });

  it('should navigate to calibration page when "Los gehts" button is pressed', () => {
    const { getByText } = render(<Intro />);
    const button = getByText('Los gehts');
    fireEvent.press(button);
    expect(getByText('Kalibrierung')).toBeTruthy();
  });

  it('should not navigate to calibration page when "Registrieren" button is pressed', () => {
    const { getByText, queryByText } = render(<Intro />);
    const button = getByText('Registrieren');
    fireEvent.press(button);
    expect(queryByText('Kalibrierung')).toBeNull();
  });

  it('should display correct number of dots', () => {
    const { getAllByTestId } = render(<Intro />);
    const dots = getAllByTestId('dot');
    expect(dots.length).toBe(3);
  });

  it('should change active dot when page changes', () => {
    const { getAllByTestId } = render(<Intro />);
    const dots = getAllByTestId('dot');
    expect(dots[0].props.style.backgroundColor).toBe('primary-color-dark');
    expect(dots[1].props.style.backgroundColor).toBe('transparent');
    expect(dots[2].props.style.backgroundColor).toBe('transparent');
  });
});
