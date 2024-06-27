import { render } from '@testing-library/react-native';
import React from 'react';

import { Cross } from '@/components/atoms/icons/Cross';

describe('Cross component', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<Cross />);

    const svg = getByTestId('Cross');
    expect(svg.props.width).toBe(24);
    expect(svg.props.height).toBe(24);
    expect(svg.props.fill).toBe('currentColor');

    const crossPath = getByTestId('CrossPath');
    expect(crossPath.props.d).toBe('M16 8L8 16M8.00001 8L16 16');
  });

  it('renders correctly with custom props', () => {
    const { getByTestId } = render(
      <Cross width={32} height={32} viewBox="0 0 32 32" fill="#ff0000" />
    );

    const svg = getByTestId('Cross');
    expect(svg.props.width).toBe(32);
    expect(svg.props.height).toBe(32);
  });
});
