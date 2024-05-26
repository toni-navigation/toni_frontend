import React from 'react';
import { TouchableOpacity } from 'react-native';
import { create } from 'react-test-renderer';

import { Button } from '@/components/atoms/Button'; // Adjust the import according to your project structure

describe('Button component', () => {
  let onPressMock: jest.Mock;

  beforeEach(() => {
    onPressMock = jest.fn();
  });

  it('renders correctly with primary buttonType', () => {
    const tree = create(
      <Button onPress={onPressMock} buttonType="primary">
        Primary Button
      </Button>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with accent buttonType', () => {
    const tree = create(
      <Button onPress={onPressMock} buttonType="accent">
        Accent Button
      </Button>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with primaryOutline buttonType', () => {
    const tree = create(
      <Button onPress={onPressMock} buttonType="primaryOutline">
        Primary Outline Button
      </Button>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with accentOutline buttonType', () => {
    const tree = create(
      <Button onPress={onPressMock} buttonType="accentOutline">
        Accent Outline Button
      </Button>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when disabled', () => {
    const tree = create(
      <Button onPress={onPressMock} disabled buttonType="primary">
        Disabled Button
      </Button>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls onPress when pressed and not disabled', () => {
    const testRenderer = create(
      <Button onPress={onPressMock} buttonType="primary">
        Pressable Button
      </Button>
    );
    const buttonInstance = testRenderer.root.findByType(TouchableOpacity);
    buttonInstance.props.onPress();
    expect(onPressMock).toHaveBeenCalled();
  });

  it('does not call onPress when pressed and disabled', () => {
    const testRenderer = create(
      <Button onPress={onPressMock} disabled buttonType="primary">
        Disabled Button
      </Button>
    );
    const buttonInstance = testRenderer.root.findByType(TouchableOpacity);
    buttonInstance.props.onPress();
    expect(onPressMock).not.toHaveBeenCalled();
  });
});
