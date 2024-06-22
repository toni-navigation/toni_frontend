import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import { PopUp } from '@/components/organisms/PopUp';

describe('PopUp', () => {
  it('renders correctly with given children and colorscheme', () => {
    const { getByText } = render(
      <PopUp visible onCloseClick={() => {}} onCloseButtonText="Close">
        Popup
      </PopUp>
    );

    expect(getByText('Close')).toBeTruthy();
  });

  it('calls onCloseClick when Close button is pressed', () => {
    const onCloseClick = jest.fn();
    const { getByText } = render(
      <PopUp visible onCloseClick={onCloseClick} onCloseButtonText="Close">
        Test
      </PopUp>
    );

    fireEvent.press(getByText('Close'));

    expect(onCloseClick).toHaveBeenCalled();
  });

  it('calls onClick when Click button is pressed', () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <PopUp
        visible
        onClick={onClick}
        onClickButtonText="Click"
        onCloseClick={() => {}}
        onCloseButtonText="Close"
      >
        Test
      </PopUp>
    );

    fireEvent.press(getByText('Click'));

    expect(onClick).toHaveBeenCalled();
  });

  it('does not render Click button when onClick and onClickButtonText are not provided', () => {
    const { queryByText } = render(
      <PopUp visible onCloseClick={() => {}} onCloseButtonText="Close">
        Test
      </PopUp>
    );

    expect(queryByText('Click')).toBeNull();
  });
});
