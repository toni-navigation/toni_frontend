import { render } from '@testing-library/react-native';
import React from 'react';

import { NavigationArrow } from '@/components/atoms/icons/NavigationArrow';

describe('NavigationArrow component', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<NavigationArrow />);

    const svg = getByTestId('NavigationArrow');
    expect(svg.props.width).toBe(24);
    expect(svg.props.height).toBe(24);

    const navigationArrowPath = getByTestId('NavigationArrowPath');
    expect(navigationArrowPath.props.fill).toBeTruthy();
    expect(navigationArrowPath.props.d).toBe(
      'M14.18,6.75,9.9,13.05c-.14.14-.06.35-.06.49l3.23,6.74a.73.73,0,0,0,1.34-.1l6-19.2a.69.69,0,0,0-.93-.9l-19,6.7c-.71.15-.69,1-.05,1.34l6.84,3c.22.07.36.07.5-.08L14,6.54a.21.21,0,0,1,.28,0A.31.31,0,0,1,14.18,6.75Z'
    );
  });

  it('renders correctly with custom props', () => {
    const { getByTestId } = render(
      <NavigationArrow
        width={32}
        height={32}
        viewBox="0 0 32 32"
        fill="#ff0000"
      />
    );

    const svg = getByTestId('NavigationArrow');
    expect(svg.props.width).toBe(32);
    expect(svg.props.height).toBe(32);

    const navigationArrowPath = getByTestId('NavigationArrowPath');
    expect(navigationArrowPath.props.fill).toBeTruthy();
  });
});
