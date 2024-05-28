import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import { MenuButton } from '@/components/atoms/MenuButton';
import { Cross } from '@/components/atoms/icons/Cross';
import stylings from '@/stylings';

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

  it('should render the button with correct styles for each color scheme', () => {
    const { getByRole, rerender } = render(
      <MenuButton onPress={mockOnPress} icon={<Cross />}>
        Test Button
      </MenuButton>
    );

    expect(getByRole('button').props.style.borderTopColor).toContain(
      stylings.colors['primary-color-dark']
    );

    rerender(
      <MenuButton onPress={mockOnPress} icon={<Cross />}>
        Test Button
      </MenuButton>
    );
    expect(getByRole('button').props.style.borderTopColor).toContain(
      stylings.colors['primary-color-dark']
    );
  });
});
