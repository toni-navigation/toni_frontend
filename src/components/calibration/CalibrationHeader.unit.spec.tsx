import { render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';

import { CalibrationHeader } from '@/components/calibration/CalibrationHeader';
import { CalibrationStepsProps } from '@/components/calibration/calibrationSteps';

describe('CalibrationHeader', () => {
  const mockCurrentStep: CalibrationStepsProps = {
    text: 'Test Step',
    calibrationValueNode: <Text>Test Node</Text>,
  };

  it('renders correctly with light color scheme', () => {
    const { getByText } = render(
      <CalibrationHeader colorscheme="light" currentStep={mockCurrentStep} />
    );
    expect(getByText('Test Step')).toBeTruthy();
    expect(getByText('Test Node')).toBeTruthy();
  });

  it('renders correctly with dark color scheme', () => {
    const { getByText } = render(
      <CalibrationHeader colorscheme="dark" currentStep={mockCurrentStep} />
    );
    expect(getByText('Test Step')).toBeTruthy();
    expect(getByText('Test Node')).toBeTruthy();
  });

  it('renders correctly when calibrationValueNode is null', () => {
    const mockCurrentStepWithoutNode: CalibrationStepsProps = {
      text: 'Test Step',
      calibrationValueNode: undefined,
    };
    const { getByText, queryByText } = render(
      <CalibrationHeader
        colorscheme="light"
        currentStep={mockCurrentStepWithoutNode}
      />
    );
    expect(getByText('Test Step')).toBeTruthy();
    expect(queryByText('Test Node')).toBeNull();
  });
});
