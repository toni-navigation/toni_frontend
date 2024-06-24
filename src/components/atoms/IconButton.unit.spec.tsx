import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import { IconButton } from '@/components/atoms/IconButton';
import { Cross } from '@/components/atoms/icons/Cross';

describe('IconButton', () => {
  const mockOnPress = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the icon button correctly', () => {
    const { getByRole } = render(
      <IconButton
        iconName="Cross"
        icon={<Cross />}
        onPress={mockOnPress}
        buttonType="primary"
      />
    );
    expect(getByRole('button')).toBeTruthy();
  });

  it('should call onPress when the button is pressed', () => {
    const { getByRole } = render(
      <IconButton
        iconName="Cross"
        icon={<Cross />}
        onPress={mockOnPress}
        buttonType="primary"
      />
    );

    fireEvent.press(getByRole('button'));

    expect(mockOnPress).toHaveBeenCalled();
  });

  it('should not call onPress when the button is disabled', () => {
    const { getByRole } = render(
      <IconButton
        icon={<Cross />}
        onPress={mockOnPress}
        buttonType="primary"
        disabled
        iconName="Cross"
      />
    );

    fireEvent.press(getByRole('button'));

    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('renders correctly with given props', async () => {
    const { getByTestId, rerender } = render(
      <IconButton
        icon={<Cross />}
        onPress={mockOnPress}
        buttonType="primary"
        disabled={false}
        classes="test-class"
        iconName="Cross"
      />
    );

    let button = getByTestId('IconButton-primary');
    expect(button).toBeDefined();
    expect(button.props.accessibilityHint).toEqual('');
    expect(button.props.accessibilityLabel).toEqual('Cross');
    expect(button.props.accessibilityRole).toEqual('button');

    rerender(
      <IconButton
        icon={<Cross />}
        onPress={mockOnPress}
        buttonType="primary"
        disabled
        classes="test-class"
        iconName="Cross"
      />
    );

    button = getByTestId('IconButton-primary');
    expect(button.props.accessibilityHint).toEqual('Nicht nutzbar');
    expect(button.props.accessibilityLabel).toEqual('Cross nicht nutzbar');
  });
});
