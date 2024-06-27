import { render } from '@testing-library/react-native';
import React from 'react';
import { Path } from 'react-native-svg';

import { ArrowRight } from '@/components/atoms/icons/ArrowRight';

describe('ArrowRight component', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<ArrowRight />);

    const svg = getByTestId('ArrowRight');
    expect(svg.props.width).toBe(24);
    expect(svg.props.height).toBe(24);

    const path = svg.findByType(Path);
    expect(path.props.fill).toBe('#000');

    const arrowRightPath = getByTestId('ArrowRightPath');
    expect(arrowRightPath.props.d).toBe(
      'M9.7042 16.2945C10.0945 16.6853 10.094 17.3184 9.70324 17.7087C9.31245 18.0989 8.67928 18.0985 8.28902 17.7077L3.29241 12.7043C2.90237 12.3137 2.90255 11.681 3.29282 11.2906L8.28943 6.29297C8.67992 5.9024 9.31308 5.90234 9.70365 6.29282C10.0942 6.6833 10.0943 7.31647 9.70379 7.70703L6.411 11H13C17.3349 11 20.8645 14.4478 20.9962 18.7508L21 19C21 19.5523 20.5523 20 20 20C19.4477 20 19 19.5523 19 19C19 15.7616 16.4344 13.1224 13.2249 13.0041L13 13H6.414L9.7042 16.2945Z'
    );
  });

  it('renders correctly with custom props', () => {
    const { getByTestId } = render(
      <ArrowRight width={32} height={32} viewBox="0 0 32 32" fill="#ff0000" />
    );

    const svg = getByTestId('ArrowRight');
    expect(svg.props.width).toBe(32);
    expect(svg.props.height).toBe(32);

    const path = svg.findByType(Path);
    expect(path.props.fill).toBe('#ff0000');
  });
});
