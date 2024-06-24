import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import { MenuButton } from '@/components/atoms/MenuButton';
import { Cross } from '@/components/atoms/icons/Cross';

describe('MenuButton', () => {
  const mockOnPress = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the menu button correctly', () => {
    const { getByRole } = render(
      <MenuButton onPress={mockOnPress} icon={<Cross />}>
        Test Button
      </MenuButton>
    );

    expect(getByRole('button')).toBeTruthy();
  });

  it('should call onPress when the button is pressed', () => {
    const { getByRole } = render(
      <MenuButton onPress={mockOnPress} icon={<Cross />}>
        Test Button
      </MenuButton>
    );

    fireEvent.press(getByRole('button'));

    expect(mockOnPress).toHaveBeenCalled();
  });

  it('should render the button with correct accessibility props', () => {
    const { getByTestId } = render(
      <MenuButton onPress={mockOnPress} icon={<Cross />}>
        Test Button
      </MenuButton>
    );
    expect(getByTestId('MenuButton').props.accessibilityLabel).toEqual(
      'Test Button'
    );
    expect(getByTestId('MenuButton').props.accessibilityHint).toEqual('');
    expect(getByTestId('MenuButton').props.accessibilityRole).toEqual('button');
  });

  it('should render the button with correct styles of Icon and Text', () => {
    const { getByTestId } = render(
      <MenuButton onPress={mockOnPress} icon={<Cross />}>
        Test Button
      </MenuButton>
    );
    expect(getByTestId('MenuButtonIcon').props.className).toEqual('pl-2');
    expect(getByTestId('MenuButtonText').props.className).toEqual(
      'font-generalSansSemi text-2xl pl-4 text-primary'
    );
  });
});
