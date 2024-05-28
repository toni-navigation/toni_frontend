import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import { InputText } from '@/components/atoms/InputText';

describe('InputText', () => {
  const mockOnClickDelete = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the input text correctly', () => {
    const { getByTestId } = render(
      <InputText
        onClickDelete={mockOnClickDelete}
        accessibilityLabel="Test Input"
        accessibilityHint="Test Input"
      />
    );

    expect(getByTestId('TextInput')).toBeTruthy();
  });

  it('should call onClickDelete when the delete button is pressed', () => {
    const { getByRole } = render(
      <InputText
        onClickDelete={mockOnClickDelete}
        accessibilityLabel="Test Input"
        accessibilityHint="Test Input"
        value="Test Value"
      />
    );

    fireEvent.press(getByRole('button'));

    expect(mockOnClickDelete).toHaveBeenCalled();
  });

  it('should not render delete button when the input value is empty', () => {
    const { queryByRole } = render(
      <InputText
        onClickDelete={mockOnClickDelete}
        accessibilityLabel="Test Input"
        accessibilityHint="Test Input"
        value=""
      />
    );

    expect(queryByRole('button')).toBeNull();
  });

  it('should render delete button when the input value is not empty', () => {
    const { getByRole } = render(
      <InputText
        onClickDelete={mockOnClickDelete}
        accessibilityLabel="Test Input"
        accessibilityHint="Test Input"
        value="Test Value"
      />
    );

    expect(getByRole('button')).toBeTruthy();
  });
});
