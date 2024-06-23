import { render } from '@testing-library/react-native';
import React from 'react';
import { Path } from 'react-native-svg';

import { Play } from '@/components/atoms/icons/Play';

describe('Play component', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<Play />);

    const svg = getByTestId('Play');
    expect(svg.props.width).toBe(24);
    expect(svg.props.height).toBe(24);

    const path = svg.findByType(Path);
    expect(path.props.fill).toBe('#000');

    const personPath = getByTestId('PlayPath');
    expect(personPath.props.d).toBe(
      'M405.2,232.9L126.8,67.2c-3.4-2-6.9-3.2-10.9-3.2c-10.9,0-19.8,9-19.8,20H96v344h0.1c0,11,8.9,20,19.8,20  c4.1,0,7.5-1.4,11.2-3.4l278.1-165.5c6.6-5.5,10.8-13.8,10.8-23.1C416,246.7,411.8,238.5,405.2,232.9z'
    );
  });

  it('renders correctly with custom props', () => {
    const { getByTestId } = render(
      <Play width={32} height={32} viewBox="0 0 32 32" fill="#ff0000" />
    );

    const svg = getByTestId('Play');
    expect(svg.props.width).toBe(32);
    expect(svg.props.height).toBe(32);

    const path = svg.findByType(Path);
    expect(path.props.fill).toBe('#ff0000');
  });
});
