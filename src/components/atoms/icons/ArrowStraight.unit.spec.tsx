import { render } from '@testing-library/react-native';
import React from 'react';
import { Path } from 'react-native-svg';

import { ArrowStraight } from '@/components/atoms/icons/ArrowStraight';

describe('ArrowStraight component', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<ArrowStraight />);

    const svg = getByTestId('ArrowStraight');
    expect(svg.props.width).toBe(24);
    expect(svg.props.height).toBe(24);

    const path = svg.findByType(Path);
    expect(path.props.fill).toBe('#000');

    const arrowStraightPath = getByTestId('ArrowStraightPath');
    expect(arrowStraightPath.props.d).toBe(
      'M7.29252 8.29327L11.2883 4.29327C11.6486 3.93262 12.2157 3.90456 12.6082 4.20931L12.7024 4.29243L16.7077 8.29243C17.0984 8.6827 17.0988 9.31586 16.7086 9.70664C16.3483 10.0674 15.7811 10.0955 15.3886 9.7907L15.2944 9.70757L13.001 7.417L13.001 19.0007C13.001 19.5135 12.615 19.9362 12.1176 19.9939L12.001 20.0007C11.4882 20.0007 11.0655 19.6146 11.0077 19.1173L11.001 19.0007L11.001 7.41L8.70748 9.70673C8.34719 10.0674 7.77997 10.0954 7.38752 9.79062L7.29327 9.70748C6.93259 9.34719 6.90456 8.77997 7.20938 8.38752L7.29252 8.29327L11.2883 4.29327L7.29252 8.29327Z'
    );
  });

  it('renders correctly with custom props', () => {
    const { getByTestId } = render(
      <ArrowStraight
        width={32}
        height={32}
        viewBox="0 0 32 32"
        fill="#ff0000"
      />
    );

    const svg = getByTestId('ArrowStraight');
    expect(svg.props.width).toBe(32);
    expect(svg.props.height).toBe(32);

    const path = svg.findByType(Path);
    expect(path.props.fill).toBe('#ff0000');
  });
});
