import { render } from '@testing-library/react-native';
import React from 'react';
import { Path } from 'react-native-svg';

import { Close } from '@/components/atoms/icons/Close';

describe('Close component', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<Close />);

    const svg = getByTestId('Close');
    expect(svg.props.width).toBe(24);
    expect(svg.props.height).toBe(24);

    const path = svg.findByType(Path);
    expect(path.props.fill).toBe('#000');

    const arrowStraightPath = getByTestId('ClosePath');
    expect(arrowStraightPath.props.d).toBe(
      'M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z'
    );
  });

  it('renders correctly with custom props', () => {
    const { getByTestId } = render(
      <Close width={32} height={32} viewBox="0 0 32 32" fill="#ff0000" />
    );

    const svg = getByTestId('Close');
    expect(svg.props.width).toBe(32);
    expect(svg.props.height).toBe(32);

    const path = svg.findByType(Path);
    expect(path.props.fill).toBe('#ff0000');
  });
});
