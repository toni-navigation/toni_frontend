import { render } from '@testing-library/react-native';
import React from 'react';
import { Path } from 'react-native-svg';

import { Location } from '@/components/atoms/icons/Location';

describe('Location component', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<Location />);

    const svg = getByTestId('Location');
    expect(svg.props.width).toBe(34.939);
    expect(svg.props.height).toBe(34.939);

    const path = svg.findByType(Path);
    expect(path.props.fill).toBe('#000');
    const locationPath = getByTestId('LocationPath');
    expect(locationPath.props.d).toBe(
      'M19.468,2A17.469,17.469,0,1,1,2,19.468,17.469,17.469,0,0,1,19.468,2Zm0,2.62A14.849,14.849,0,1,0,34.317,19.468,14.849,14.849,0,0,0,19.468,4.619Zm-.006,4.367A10.477,10.477,0,1,1,8.985,19.462,10.477,10.477,0,0,1,19.462,8.986Z'
    );
  });

  it('renders correctly with custom props', () => {
    const { getByTestId } = render(
      <Location width={32} height={32} viewBox="0 0 32 32" fill="#ff0000" />
    );

    const svg = getByTestId('Location');
    expect(svg.props.width).toBe(32);
    expect(svg.props.height).toBe(32);

    const path = svg.findByType(Path);
    expect(path.props.fill).toBe('#ff0000');
  });
});
