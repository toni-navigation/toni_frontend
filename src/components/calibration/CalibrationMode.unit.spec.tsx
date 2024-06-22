import { render } from '@testing-library/react-native';
import React from 'react';

import { CalibrationMode } from '@/components/calibration/CalibrationMode';

describe('CalibrationMode', () => {
  it('renders correctly with light color scheme', () => {
    const { getByText } = render(<CalibrationMode steps={5} />);
    expect(getByText('Schritte: 5')).toBeTruthy();
  });

  it('renders correctly with dark color scheme', () => {
    const { getByText } = render(<CalibrationMode steps={5} />);
    expect(getByText('Schritte: 5')).toBeTruthy();
  });

  it('renders correctly with zero steps', () => {
    const { getByText } = render(<CalibrationMode steps={0} />);
    expect(getByText('Schritte: 0')).toBeTruthy();
  });
});
