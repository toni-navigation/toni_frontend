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

  it('renders correctly', () => {
    const { getByText } = render(
      <CalibrationHeader currentStep={mockCurrentStep} />
    );
    expect(getByText('Test Step').children).toEqual(['Test Step']);
    expect(getByText('Test Node').children).toEqual(['Test Node']);
  });

  it('renders correctly when calibrationValueNode is null', () => {
    const mockCurrentStepWithoutNode: CalibrationStepsProps = {
      text: 'Test Step',
      calibrationValueNode: undefined,
    };
    const { getByText, queryByText } = render(
      <CalibrationHeader currentStep={mockCurrentStepWithoutNode} />
    );
    expect(getByText('Test Step')).toBeTruthy();
    expect(queryByText('Test Node')).toBeNull();
  });
});
