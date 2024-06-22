import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { CalibrationNavigation } from '@/components/calibration/CalibrationNavigation';
import { CalibrationStepsProps } from '@/components/calibration/calibrationSteps';

jest.mock('@/store/useCalibrationStore', () => ({
  useCalibrationStore: () => ({
    actions: {
      toggleSkipped: jest.fn(),
      resetCalibrationStore: jest.fn(),
    },
  }),
}));

jest.mock('expo-router', () => ({
  router: {
    back: jest.fn(),
    setParams: jest.fn(),
    replace: jest.fn(),
  },
}));

describe('CalibrationNavigation', () => {
  const mockCurrentElement: CalibrationStepsProps = {
    text: 'Test Step',
    calibrationValueNode: <Text>Test Node</Text>,
    backButtonText: 'Back',
    forwardButtonText: 'Next',
  };

  it('renders correctly and handles back button press', () => {
    const setIndex = jest.fn();
    const mockPress = jest.fn();
    const { getByText } = render(
      <CalibrationNavigation
        isInCalibrationMode={false}
        setIndex={setIndex}
        calibrationModeButtons={() => (
          <Button buttonType="primary" onPress={mockPress}>
            Button
          </Button>
        )}
        currentElement={mockCurrentElement}
        isFirstStep={false}
        isLastStep={false}
        stepText="Step 1"
        colorscheme="light"
      />
    );
    fireEvent.press(getByText('Back'));
    expect(setIndex).toHaveBeenCalledWith(expect.any(Function));
  });

  it('renders correctly and handles next button press', () => {
    const setIndex = jest.fn();
    const mockPress = jest.fn();

    const { getByText } = render(
      <CalibrationNavigation
        isInCalibrationMode
        setIndex={setIndex}
        calibrationModeButtons={() => (
          <Button buttonType="primary" onPress={mockPress}>
            Button
          </Button>
        )}
        currentElement={mockCurrentElement}
        isFirstStep={false}
        isLastStep={false}
        stepText="Step 1"
        colorscheme="light"
      />
    );
    fireEvent.press(getByText('Next'));
    expect(setIndex).toHaveBeenCalledWith(expect.any(Function));
  });
});
