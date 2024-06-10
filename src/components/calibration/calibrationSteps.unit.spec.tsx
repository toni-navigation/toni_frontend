import { render } from '@testing-library/react-native';
import { Text } from 'react-native';

import { calibrationSteps } from '@/components/calibration/calibrationSteps';

describe('calibrationSteps', () => {
  it('returns correct steps with factors and light color scheme', () => {
    const steps = calibrationSteps([1, 2, 3], 'light');
    expect(steps.length).toBe(6);
    const { getByTestId } = render(
      steps[0].calibrationValueNode ?? <Text>-</Text>
    );
    expect(getByTestId('calibrationValue')).toBeTruthy();
  });

  it('returns correct steps with factors and dark color scheme', () => {
    const steps = calibrationSteps([1, 2, 3], 'dark');
    expect(steps.length).toBe(6);
    const { getByTestId } = render(
      steps[0].calibrationValueNode ?? <Text>-</Text>
    );
    expect(getByTestId('calibrationValue')).toBeTruthy();
  });

  it('returns correct steps without factors', () => {
    const steps = calibrationSteps(undefined, 'light');
    expect(steps.length).toBe(6);
    const { getByText } = render(<Text>{steps[0].calibrationValueNode}</Text>);
    expect(getByText('-')).toBeTruthy();
  });
});
