import { render } from '@testing-library/react-native';
import { useColorScheme as mockUseColorScheme } from 'nativewind';
import React from 'react';
import { View, Text } from 'react-native';

import { ThemeProvider, ThemeContext } from '@/components/ThemeProvider';

jest.mock('nativewind', () => ({
  useColorScheme: jest.fn(),
  vars: jest.fn().mockReturnValue({}),
}));

describe('ThemeProvider', () => {
  const mockedUseColorScheme = mockUseColorScheme as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    mockedUseColorScheme.mockReturnValue({ colorScheme: 'light' });

    const { getByTestId } = render(
      <ThemeProvider>
        <View testID="child" />
      </ThemeProvider>
    );
    expect(getByTestId('child')).toBeTruthy();
  });

  it('provides the correct theme context value for dark mode', async () => {
    mockedUseColorScheme.mockReturnValue({ colorScheme: 'dark' });

    function TestComponent() {
      const contextValue = React.useContext(ThemeContext);

      return <Text testID="contextValue">{contextValue.theme}</Text>;
    }

    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(getByTestId('contextValue').props.children).toBe('dark');
  });

  it('provides the correct theme context value for light mode', async () => {
    // Mock the useColorScheme to return light mode
    mockedUseColorScheme.mockReturnValue({ colorScheme: 'light' });

    function TestComponent() {
      const contextValue = React.useContext(ThemeContext);

      return <Text testID="contextValue">{contextValue.theme}</Text>;
    }

    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(getByTestId('contextValue').props.children).toBe('light');
  });

  it('falls back to the default theme when colorScheme is undefined', async () => {
    mockedUseColorScheme.mockReturnValue({ colorScheme: undefined });

    function TestComponent() {
      const contextValue = React.useContext(ThemeContext);

      return <Text testID="contextValue">{contextValue.theme}</Text>;
    }

    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(getByTestId('contextValue').props.children).toBe('light');
  });
});
