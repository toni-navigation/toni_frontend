import { render } from '@testing-library/react-native';
import React from 'react';

import { Pause } from '@/components/atoms/icons/Pause';

describe('Pause component', () => {
  it('renders correctly with default props', () => {
    const { getByTestId, getAllByTestId } = render(<Pause />);

    const svg = getByTestId('Pause');
    expect(svg.props.width).toBe(24);
    expect(svg.props.height).toBe(24);

    expect(svg.props.fill).toBe('currentColor');

    const paths = getAllByTestId('PausePath');
    expect(paths.length).toBe(2);
    expect(paths[0].props.fill).toBeTruthy();
    expect(paths[1].props.fill).toBeTruthy();
    expect(paths[0].props.d).toBe(
      'M5.74609 3C4.7796 3 3.99609 3.7835 3.99609 4.75V19.25C3.99609 20.2165 4.7796 21 5.74609 21H9.24609C10.2126 21 10.9961 20.2165 10.9961 19.25V4.75C10.9961 3.7835 10.2126 3 9.24609 3H5.74609Z'
    );
    expect(paths[1].props.d).toBe(
      'M14.7461 3C13.7796 3 12.9961 3.7835 12.9961 4.75V19.25C12.9961 20.2165 13.7796 21 14.7461 21H18.2461C19.2126 21 19.9961 20.2165 19.9961 19.25V4.75C19.9961 3.7835 19.2126 3 18.2461 3H14.7461Z'
    );
  });

  it('renders correctly with custom props', () => {
    const { getByTestId, getAllByTestId } = render(
      <Pause width={32} height={32} viewBox="0 0 32 32" fill="#ff0000" />
    );

    const svg = getByTestId('Pause');
    expect(svg.props.width).toBe(32);
    expect(svg.props.height).toBe(32);

    expect(svg.props.fill).toBe('#ff0000');

    const paths = getAllByTestId('PausePath');
    expect(paths.length).toBe(2);
    expect(paths[0].props.fill).toBeTruthy();
    expect(paths[1].props.fill).toBeTruthy();
  });
});
