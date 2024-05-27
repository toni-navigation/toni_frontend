import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import { Button } from '@/components/atoms/Button'; // Adjust the import according to your project structure

describe('Button component', () => {
  let onPressMock: jest.Mock;

  beforeEach(() => {
    onPressMock = jest.fn();
  });

  it('renders correctly with primary buttonType', () => {
    const { toJSON } = render(
      <Button onPress={onPressMock} disabled={false} buttonType="primary">
        Primary Button
      </Button>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with accent buttonType', () => {
    const { toJSON } = render(
      <Button onPress={onPressMock} disabled={false} buttonType="accent">
        Accent Button
      </Button>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with primaryOutline buttonType', () => {
    const { toJSON } = render(
      <Button
        onPress={onPressMock}
        disabled={false}
        buttonType="primaryOutline"
      >
        Primary Outline Button
      </Button>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with accentOutline buttonType', () => {
    const { toJSON } = render(
      <Button onPress={onPressMock} disabled={false} buttonType="accentOutline">
        Accent Outline Button
      </Button>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly when disabled', () => {
    const { toJSON } = render(
      <Button onPress={onPressMock} disabled buttonType="primary">
        Disabled Button
      </Button>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when pressed and not disabled', () => {
    const { getByRole } = render(
      <Button onPress={onPressMock} disabled={false} buttonType="primary">
        Pressable Button
      </Button>
    );
    const button = getByRole('button');
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalled();
  });

  it('does not call onPress when pressed and disabled', () => {
    const { getByRole } = render(
      <Button onPress={onPressMock} disabled buttonType="primary">
        Disabled Button
      </Button>
    );
    const button = getByRole('button');
    fireEvent.press(button);
    expect(onPressMock).not.toHaveBeenCalled();
  });
});
