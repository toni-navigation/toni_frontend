import { render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';

import { Header } from '@/components/atoms/Header'; // Adjust the import according to your project structure

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

    expect(header).toBeTruthy();
    expect(header.props.style[0].fontSize).toBeTruthy();
    expect(header.props.style[1].fontFamily).toBeTruthy();
    expect(header.props.style[2].height).toBeTruthy();
    expect(header.props.style[3].textAlign).toBeTruthy();
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
