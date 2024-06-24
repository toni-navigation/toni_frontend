import { render, fireEvent } from '@testing-library/react-native';
import fs from 'fs';
import path from 'path';
import React from 'react';
import { act } from 'react-test-renderer';

import { Button } from '@/components/atoms/Button';

describe('Button', () => {
  const onPressMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    const snapshotFilePath = path.join(
      __dirname,
      '__snapshots__',
      'Button.unit.spec.tsx.snap'
    );
    if (fs.existsSync(snapshotFilePath)) {
      fs.unlinkSync(snapshotFilePath);
    }
  });

  it(`renders correctly with primary type`, () => {
    const { getByTestId } = render(
      <Button onPress={onPressMock} buttonType="primary">
        Test
      </Button>
    );
    expect(getByTestId('Button-primary')).toMatchSnapshot();
  });

  it(`renders correctly with primaryOutline type`, () => {
    const { getByTestId } = render(
      <Button onPress={onPressMock} buttonType="primaryOutline">
        Test
      </Button>
    );
    expect(getByTestId('Button-primaryOutline')).toMatchSnapshot();
  });

  it(`renders correctly with accent type`, () => {
    const { getByTestId } = render(
      <Button onPress={onPressMock} buttonType="accent">
        Test
      </Button>
    );
    expect(getByTestId('Button-accent')).toMatchSnapshot();
  });

  it(`renders correctly with accentOutline type`, () => {
    const { getByTestId } = render(
      <Button onPress={onPressMock} buttonType="accentOutline">
        Test
      </Button>
    );
    expect(getByTestId('Button-accentOutline')).toMatchSnapshot();
  });

  it('calls onPress when clicked and not disabled', async () => {
    const { getByText } = render(
      <Button onPress={onPressMock} buttonType="primary" disabled={false}>
        Test
      </Button>
    );
    await act(async () => {
      fireEvent.press(getByText('Test'));
    });
    expect(onPressMock).toHaveBeenCalled();
  });

  it('does not call onPress when clicked and disabled', async () => {
    const { getByText } = render(
      <Button onPress={onPressMock} buttonType="primary" disabled>
        Test
      </Button>
    );
    await act(async () => {
      fireEvent.press(getByText('Test'));
    });
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('shows ActivityIndicator when isLoading is true', () => {
    const { getByTestId } = render(
      <Button onPress={onPressMock} buttonType="primary" isLoading>
        Test
      </Button>
    );
    expect(getByTestId('ActivityIndicator')).toBeTruthy();
  });

  it('shows correct text when isLoading is false', () => {
    const { getByText } = render(
      <Button onPress={onPressMock} buttonType="primary">
        Test
      </Button>
    );
    expect(getByText('Test')).toBeTruthy();
  });

  it('renders correctly with given props', () => {
    const { getByTestId } = render(
      <Button onPress={onPressMock} buttonType="primary" disabled={false}>
        Test Button
      </Button>
    );

    const button = getByTestId('Button-primary');
    expect(button).toBeDefined();
    expect(button.props.accessibilityHint).toEqual('Test Button');
    expect(button.props.accessibilityLabel).toEqual('Test Button');
    expect(button.props.accessibilityRole).toEqual('button');
  });

  it('returns correct accessibility output', async () => {
    const { rerender, getByTestId } = render(
      <Button
        onPress={onPressMock}
        buttonType="primary"
        disabled={false}
        isLoading={false}
      >
        Test Button
      </Button>
    );

    let button = getByTestId('Button-primary');
    expect(button.props.accessibilityHint).toEqual('Test Button');
    expect(button.props.accessibilityLabel).toEqual('Test Button');

    await act(async () => {
      rerender(
        <Button
          onPress={onPressMock}
          buttonType="primary"
          disabled
          isLoading={false}
        >
          Test Button
        </Button>
      );
    });

    button = getByTestId('Button-primary');
    expect(button.props.accessibilityHint).toEqual('Test Button nicht nutzbar');
    expect(button.props.accessibilityLabel).toEqual(
      'Test Button nicht nutzbar'
    );

    await act(async () => {
      rerender(
        <Button onPress={onPressMock} buttonType="primary" disabled isLoading>
          Test Button
        </Button>
      );
    });

    button = getByTestId('Button-primary');
    expect(button.props.accessibilityHint).toEqual(
      'Test Button nicht nutzbar, wird geladen'
    );
    expect(button.props.accessibilityLabel).toEqual(
      'Test Button nicht nutzbar, wird geladen'
    );
  });
});
