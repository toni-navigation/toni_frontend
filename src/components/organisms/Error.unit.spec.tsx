import { render } from '@testing-library/react-native';
import React from 'react';

import { Error } from '@/components/organisms/Error';

describe('Error', () => {
  it('renders correctly with error message', () => {
    const { getByText } = render(<Error error="Test Error" />);
    expect(getByText('Error').children[0]).toEqual('Error');
    expect(getByText('Test Error').children[0]).toEqual('Test Error');
  });

  it('renders correctly with different error message', () => {
    const { getByText } = render(<Error error="Another Test Error" />);
    expect(getByText('Error').children[0]).toEqual('Error');
    expect(getByText('Another Test Error').children[0]).toEqual(
      'Another Test Error'
    );
  });
});
