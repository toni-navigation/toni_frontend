import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import { ListItem } from '@/components/atoms/ListItem';

describe('ListItem component', () => {
  const mockOnPress = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when not clickable', () => {
    const { getByTestId, queryByRole } = render(
      <ListItem classes="bg-background">Test Item</ListItem>
    );
    const listItem = getByTestId('listitem');
    expect(listItem).toBeTruthy();
    expect(queryByRole('button')).toBeNull();
  });

  it('renders correctly when clickable', () => {
    const { getByTestId, getByRole } = render(
      <ListItem onPress={mockOnPress} classes="bg-background">
        Test Item
      </ListItem>
    );

    const listItem = getByTestId('listbutton');
    expect(listItem).toBeTruthy();
    const button = getByRole('button');
    expect(button).toBeTruthy();

    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('applies the correct accessibility props', () => {
    const { getByTestId } = render(
      <ListItem onPress={mockOnPress} classes="bg-background">
        Test Item
      </ListItem>
    );
    const listItem = getByTestId('listbutton');
    expect(listItem.props.accessibilityRole).toEqual('button');
  });

  it('applies the correct classes', () => {
    const { getByTestId } = render(
      <ListItem classes="bg-background">Test Item</ListItem>
    );
    const listItem = getByTestId('listitem');
    expect(listItem.props.className).toEqual('py-3 px-2 bg-background');
  });

  it('applies the correct classes to Text', () => {
    const { getByTestId } = render(
      <ListItem classes="bg-background">Test Item</ListItem>
    );
    const listItem = getByTestId('listitem');
    expect(listItem.props.children.props.className).toEqual(
      'text-2xl font-atkinsonRegular text-textColor'
    );
  });

  it('does not trigger onPress when not clickable', () => {
    const { getByTestId } = render(
      <ListItem classes="bg-gray-100">Test Item</ListItem>
    );

    const listItem = getByTestId('listitem');
    fireEvent.press(listItem);
    expect(mockOnPress).not.toHaveBeenCalled();
  });
});
