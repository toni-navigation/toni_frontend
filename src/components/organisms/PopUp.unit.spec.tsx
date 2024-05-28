import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import { PopUp } from '@/components/organisms/PopUp';

describe('PopUp', () => {
  it('renders correctly when visible', () => {
    const { getByText } = render(
      <PopUp visible onCloseClick={() => {}} onCloseButtonText="Close">
        Popup
      </PopUp>
    );

    expect(getByText('Close')).toBeTruthy();
  });

  it('does not render when not visible', () => {
    const { queryByText } = render(
      <PopUp visible={false} onCloseClick={() => {}} onCloseButtonText="Close">
        {' '}
        Popup
      </PopUp>
    );

    expect(queryByText('Close')).toBeNull();
  });

  it('calls onCloseClick when close button is pressed', () => {
    const onCloseClick = jest.fn();
    const { getByText } = render(
      <PopUp visible onCloseClick={onCloseClick} onCloseButtonText="Close">
        {' '}
        Popup
      </PopUp>
    );

    fireEvent.press(getByText('Close'));

    expect(onCloseClick).toHaveBeenCalled();
  });

  it('calls onClick when click button is pressed', () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <PopUp
        visible
        onClick={onClick}
        onClickButtonText="Click"
        onCloseClick={() => {}}
        onCloseButtonText="Close"
      >
        Popup
      </PopUp>
    );

    fireEvent.press(getByText('Click'));

    expect(onClick).toHaveBeenCalled();
  });

  it('does not render click button when onClick is not provided', () => {
    const { queryByText } = render(
      <PopUp visible onCloseClick={() => {}} onCloseButtonText="Close">
        Popup
      </PopUp>
    );

    expect(queryByText('Click')).toBeNull();
  });

  it('calls onDismiss when modal is dismissed', () => {
    const onDismiss = jest.fn();
    const { getByTestId } = render(
      <PopUp
        visible
        onCloseClick={() => {}}
        onCloseButtonText="Close"
        onDismiss={onDismiss}
      >
        Popup
      </PopUp>
    );

    fireEvent(getByTestId('modal'), 'dismiss');

    expect(onDismiss).toHaveBeenCalled();
  });
});
