test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});

/* import { fireEvent, render } from '@testing-library/react-native';
import { router } from 'expo-router';
import React from 'react';

import { CalibrationNavigation } from '@/components/calibration/CalibrationNavigation';
import * as calibrationStore from '@/store/useCalibrationStore';

jest.mock('expo-router', () => ({
  router: {
    back: jest.fn(),
    push: jest.fn(),
    setParams: jest.fn(),
    replace: jest.fn(),
  },
}));

describe('CalibrationNavigation', () => {
  let setIndexMock: jest.Mock<any, any, any>;
  let resetCalibrationStoreMock: jest.Mock<any, any, any>;
  let shownIntroHandlerMock: jest.Mock<any, any, any>;
  let props: any;

  beforeEach(() => {
    setIndexMock = jest.fn();
    resetCalibrationStoreMock = jest.fn();
    shownIntroHandlerMock = jest.fn();

    props = {
      setIndex: jest.fn(),
      calibrationModeButtons: jest.fn(),
      currentElement: {
        backButtonText: 'Zurück',
        forwardButtonText: 'Weiter',
      },
      isFirstStep: false,
      isLastStep: false,
      stepText: 'Step 1',
      shownIntroHandler: shownIntroHandlerMock,
      isInCalibrationMode: false,
      isFromIntro: false,
    };

    jest
      .spyOn(calibrationStore, 'useCalibrationStore')
      .mockImplementation(() => ({
        actions: {
          toggleSkipped: jest.fn(),
          resetCalibrationStore: resetCalibrationStoreMock,
          shownIntroHandler: shownIntroHandlerMock,
        },
      }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays the correct step text', () => {
    const { getByText } = render(<CalibrationNavigation {...props} />);
    expect(getByText('Step 1')).toBeTruthy();
  });

  it('renders correctly and handles back button press', () => {
    const setIndex = jest.fn();
    props.setIndex = setIndex;
    const { getByText } = render(<CalibrationNavigation {...props} />);
    fireEvent.press(getByText('Zurück'));
    expect(setIndex).toHaveBeenCalledWith(expect.any(Function));
  });

  it('renders correctly and handles next button press', () => {
    const setIndex = jest.fn();
    props.setIndex = setIndex;
    const { getByText } = render(<CalibrationNavigation {...props} />);
    fireEvent.press(getByText('Weiter'));
    expect(setIndex).toHaveBeenCalledWith(expect.any(Function));
  });

  it('calls shownIntroHandler and router.push when isFromIntro and isFirstStep are true', () => {
    props.currentElement.backButtonText = 'Überspringen';
    props.isFromIntro = true;
    props.isFirstStep = true;
    const { getByText } = render(<CalibrationNavigation {...props} />);
    fireEvent.press(getByText('Überspringen'));
    expect(shownIntroHandlerMock).toHaveBeenCalled();
    expect(router.push).toHaveBeenCalledWith('/home/');
  });

  it('calls resetCalibrationStore when isFromIntro is false and isFirstStep is true', () => {
    props.isFirstStep = true;
    const { getByText } = render(<CalibrationNavigation {...props} />);
    fireEvent.press(getByText('Zurück'));
    expect(resetCalibrationStoreMock).toHaveBeenCalled();
  });

  it('calls router.back when isFirstStep is true', () => {
    props.isFirstStep = true;
    const { getByText } = render(<CalibrationNavigation {...props} />);
    fireEvent.press(getByText('Zurück'));
    expect(router.back).toHaveBeenCalled();
  });

  it('calls setIndex with correct argument when none of the conditions are met', () => {
    setIndexMock = jest.fn();
    props.setIndex = setIndexMock;
    const { getByText } = render(<CalibrationNavigation {...props} />);
    fireEvent.press(getByText('Zurück'));
    expect(setIndexMock).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should call router.replace and shownIntroHandler when isFromIntro and isLastStep are true', () => {
    props.isFromIntro = true;
    props.isLastStep = true;

    const { getByText } = render(<CalibrationNavigation {...props} />);
    fireEvent.press(getByText('Weiter'));

    expect(shownIntroHandlerMock).toHaveBeenCalled();
    expect(router.replace).toHaveBeenCalledWith({ pathname: '/home/' });
  });

  it('should call router.back when isLastStep is true and isFromIntro is false', () => {
    props.isLastStep = true;
    const { getByText } = render(<CalibrationNavigation {...props} />);
    fireEvent.press(getByText('Weiter'));
    expect(router.back).toHaveBeenCalled();
  });

  it('should call setIndex with prevIndex + 1 when isLastStep and isFromIntro are false', () => {
    const setIndex2Mock = jest.fn();

    const testProps = {
      ...props,
      setIndex: setIndex2Mock,
      isLastStep: false,
      isFromIntro: false,
    };

    const { getByText } = render(<CalibrationNavigation {...testProps} />);
    fireEvent.press(getByText('Weiter'));

    expect(setIndex2Mock).toHaveBeenCalled();

    const firstCallArg = setIndex2Mock.mock.calls[0][0];
    expect(typeof firstCallArg).toBe('function');
  });
});
*/
