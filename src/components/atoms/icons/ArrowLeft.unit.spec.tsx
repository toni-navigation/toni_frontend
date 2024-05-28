import { render } from '@testing-library/react-native';
import React from 'react';
import { Path } from 'react-native-svg';

import { ArrowLeft } from '@/components/atoms/icons/ArrowLeft'; // Adjust the import according to your project structure

describe('ArrowLeft component', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<ArrowLeft />);

    const svg = getByTestId('ArrowLeft');
    expect(svg.props.width).toBe(24);
    expect(svg.props.height).toBe(24);
    // expect(svg.props.viewBox).toBe('0 0 24 24');

    const path = svg.findByType(Path);
    expect(path.props.fill).toBe('#000');
  });

  it('renders correctly with custom props', () => {
    const { getByTestId } = render(
      <ArrowLeft width={32} height={32} viewBox="0 0 32 32" fill="#ff0000" />
    );

    const svg = getByTestId('ArrowLeft');
    expect(svg.props.width).toBe(32);
    expect(svg.props.height).toBe(32);

    const path = svg.findByType(Path);
    expect(path.props.fill).toBe('#ff0000');
  });
});
