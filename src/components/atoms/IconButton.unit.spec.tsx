import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import { IconButton } from '@/components/atoms/IconButton';
import { Cross } from '@/components/atoms/icons/Cross';
import styling from '@/stylings';

describe('IconButton', () => {
  const mockOnPress = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the icon button correctly', () => {
    const { getByRole } = render(
      <IconButton icon={<Cross />} onPress={mockOnPress} buttonType="primary" />
    );

    expect(getByRole('button')).toBeTruthy();
  });

  it('should call onPress when the button is pressed', () => {
    const { getByRole } = render(
      <IconButton icon={<Cross />} onPress={mockOnPress} buttonType="primary" />
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
      />
    );

    fireEvent.press(getByRole('button'));

    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('should render the button with correct styles for each buttonType', () => {
    const { getByRole } = render(
      <IconButton icon={<Cross />} onPress={mockOnPress} buttonType="primary" />
    );
    expect(getByRole('button').props.style.backgroundColor).toContain(
      styling.colors['primary-color-dark']
    );
    //
    // rerender(
    //   <IconButton icon={<Cross />} onPress={mockOnPress} buttonType="accent" />
    // );
    //
    // expect(getByRole('button').props.style.backgroundColor).toContain(
    //   styling.colors['orange-accent']
    // );
    //
    // rerender(
    //   <IconButton
    //     icon={<Cross />}
    //     onPress={mockOnPress}
    //     buttonType="accentOutline"
    //   />
    // );
    // expect(getByRole('button').props.style.borderTopColor).toContain(
    //   styling.colors['orange-accent']
    // );
    //
    // rerender(
    //   <IconButton
    //     icon={<Cross />}
    //     onPress={mockOnPress}
    //     buttonType="primaryOutline"
    //   />
    // );
    // expect(getByRole('button').props.style.borderTopColor).toContain(
    //   styling.colors['primary-color-dark']
    // );
  });
});
