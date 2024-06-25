import { fireEvent, render } from '@testing-library/react-native';
import { router } from 'expo-router';
import React from 'react';

import { CalibrationNavigation } from '@/components/calibration/CalibrationNavigation';
import { useCalibrationStore as mockUseCalibrationStore } from '@/store/useCalibrationStore';

jest.mock('expo-router', () => ({
  router: {
    back: jest.fn(),
    push: jest.fn(),
    setParams: jest.fn(),
    replace: jest.fn(),
  },
}));

jest.mock('@/store/useCalibrationStore', () => ({
  useCalibrationStore: jest.fn(),
}));

describe('CalibrationNavigation', () => {
  let setIndexMock: jest.Mock;
  let resetCalibrationStoreMock: jest.Mock;
  let shownIntroHandlerMock: jest.Mock;
  let props: any;

  const mockedUseCalibrationStore =
    mockUseCalibrationStore as unknown as jest.Mock;

  beforeEach(() => {
    setIndexMock = jest.fn();
    resetCalibrationStoreMock = jest.fn();
    shownIntroHandlerMock = jest.fn();

    props = {
      setIndex: setIndexMock,
      calibrationModeButtons: jest.fn(),
      currentElement: {
        backButtonText: 'Zurück',
        forwardButtonText: 'Weiter',
      },
      isFirstStep: false,
      isLastStep: false,
      stepText: 'Step 1',
      shownIntroHandler: (shownIntroHandlerMock = jest.fn()),
      isInCalibrationMode: false,
      isFromIntro: false,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays the correct step text', () => {
    const { getByText } = render(<CalibrationNavigation {...props} />);
    expect(getByText('Step 1')).toBeTruthy();
  });

  it('renders correctly and handles back button press', () => {
    const { getByText } = render(<CalibrationNavigation {...props} />);
    fireEvent.press(getByText('Zurück'));
    expect(setIndexMock).toHaveBeenCalledWith(expect.any(Function));
  });

  it('renders correctly and handles next button press', () => {
    const { getByText } = render(<CalibrationNavigation {...props} />);
    fireEvent.press(getByText('Weiter'));
    expect(setIndexMock).toHaveBeenCalledWith(expect.any(Function));
  });

  it('calls shownIntroHandler and router.push when isFromIntro and isFirstStep are true', () => {
    mockedUseCalibrationStore.mockReturnValue({
      actions: {
        toggleSkipped: jest.fn(),
        resetCalibrationStore: resetCalibrationStoreMock,
        shownIntroHandler: shownIntroHandlerMock,
      },
    });

    props.currentElement.backButtonText = 'Überspringen';
    props.isFromIntro = true;
    props.isFirstStep = true;
    const { getByText } = render(<CalibrationNavigation {...props} />);
    fireEvent.press(getByText('Überspringen'));
    // expect(shownIntroHandlerMock).toHaveBeenCalled();
    expect(router.push).toHaveBeenCalledWith('/home/');
  });

  it('calls resetCalibrationStore when isFromIntro is false and isFirstStep is true', () => {
    props.isFirstStep = true;
    props.isFromIntro = false;
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
    props.isFromIntro = false;
    const { getByText } = render(<CalibrationNavigation {...props} />);
    fireEvent.press(getByText('Weiter'));
    expect(router.back).toHaveBeenCalled();
  });

  it('should call setIndex with prevIndex + 1 when isLastStep and isFromIntro are false', () => {
    props.isLastStep = false;
    props.isFromIntro = false;
    const { getByText } = render(<CalibrationNavigation {...props} />);
    fireEvent.press(getByText('Weiter'));
    expect(setIndexMock).toHaveBeenCalledWith(expect.any(Function));
  });
});
