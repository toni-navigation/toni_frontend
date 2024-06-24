import { render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';

import { Header } from '@/components/atoms/Header';

describe('Header component', () => {
  it('renders correctly with default styles', () => {
    const { getByText } = render(<Header>Test Header</Header>);
    const header = getByText('Test Header');
    expect(header).toBeTruthy();
  });

  it('applies additional classes correctly', () => {
    const { getByText } = render(
      <Header classes="text-center">Test Header with Classes</Header>
    );
    const header = getByText('Test Header with Classes');

    expect(header.props.children).toEqual('Test Header with Classes');
    expect(header.props.className).toEqual(
      'text-4xl font-generalSansSemi h-24 text-center'
    );
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <Header>
        <Text>Child Text</Text>
      </Header>
    );
    const childText = getByText('Child Text');
    expect(childText).toBeTruthy();
  });
});
