import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { act } from 'react-test-renderer';

import { Button } from '@/components/atoms/Button';

describe('Button', () => {
  const onPressMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // const snapshotFilePath = path.join(
    //   __dirname,
    //   '__snapshots__',
    //   'Button.unit.spec.tsx.snap'
    // );
    // if (fs.existsSync(snapshotFilePath)) {
    //   fs.unlinkSync(snapshotFilePath);
    // }
  });

  it(`renders correctly with primary type`, () => {
    const { getByTestId } = render(
      <Button onPress={onPressMock} buttonType="primary">
        Test
      </Button>
    );
    expect(getByTestId('Button-primary')).toBeTruthy();
  });

  it(`renders correctly with primaryOutline type`, () => {
    const { getByTestId } = render(
      <Button onPress={onPressMock} buttonType="primaryOutline">
        Test
      </Button>
    );
    expect(getByTestId('Button-primaryOutline')).toBeTruthy();
  });

  it(`renders correctly with accent type`, () => {
    const { getByTestId } = render(
      <Button onPress={onPressMock} buttonType="accent">
        Test
      </Button>
    );
    expect(getByTestId('Button-accent')).toBeTruthy();
  });

  it(`renders correctly with accentOutline type`, () => {
    const { getByTestId } = render(
      <Button onPress={onPressMock} buttonType="accentOutline">
        Test
      </Button>
    );
    expect(getByTestId('Button-accentOutline')).toBeTruthy();
  });

  it('calls onPress when clicked and not disabled', async () => {
    const { getByText } = render(
      <Button onPress={onPressMock} buttonType="primary" disabled={false}>
        Test
      </Button>
    );
    act(() => {
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
    act(() => {
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
    const { getByTestId } = render(
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

    button = getByTestId('Button-primary');
    expect(button.props.accessibilityHint).toEqual('Test Button');
    expect(button.props.accessibilityLabel).toEqual('Test Button');
  });
});
