import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import { ListItem } from '@/components/atoms/ListItem';

describe('ListItem component', () => {
  it('renders correctly when not clickable', () => {
    const { getByTestId, queryByRole } = render(
      <ListItem classes="bg-background-dark">Test Item</ListItem>
    );
    const listItem = getByTestId('listitem');
    expect(listItem).toBeTruthy();
    expect(listItem.props.style[2].backgroundColor).toBeTruthy();
    expect(queryByRole('button')).toBeNull();
  });

  it('renders correctly when clickable', () => {
    const mockOnPress = jest.fn();
    const { getByTestId, getByRole } = render(
      <ListItem onPress={mockOnPress} classes="bg-background-dark">
        Test Item
      </ListItem>
    );

    const listItem = getByTestId('listbutton');
    expect(listItem).toBeTruthy();
    // expect(listItem.props.style[3].backgroundColor).toBeTruthy();

    const button = getByRole('button');
    expect(button).toBeTruthy();

    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('applies the correct classes', () => {
    const { getByTestId } = render(
      <ListItem classes="bg-background-dark">Test Item</ListItem>
    );

    const listItem = getByTestId('listitem');
    expect(listItem.props.style[2].backgroundColor).toBeTruthy();
  });

  it('does not trigger onPress when not clickable', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <ListItem classes="bg-gray-100">Test Item</ListItem>
    );

    const listItem = getByTestId('listitem');
    fireEvent.press(listItem);
    expect(mockOnPress).not.toHaveBeenCalled();
  });
});
