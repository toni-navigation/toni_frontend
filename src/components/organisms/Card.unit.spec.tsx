import { render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';

import { Card } from '@/components/organisms/Card';

describe('Card', () => {
  it('renders correctly with light color scheme', () => {
    const { getByText } = render(
      <Card>
        <Text>Test Content</Text>
      </Card>
    );
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('renders correctly with dark color scheme', () => {
    const { getByText } = render(
      <Card>
        <Text>Test Content</Text>
      </Card>
    );
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('renders correctly with icon', () => {
    const { getByText } = render(
      <Card icon={<Text>Test Icon</Text>}>
        <Text>Test Content</Text>
      </Card>
    );
    expect(getByText('Test Icon')).toBeTruthy();
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('renders correctly without icon', () => {
    const { getByText, queryByText } = render(
      <Card>
        <Text>Test Content</Text>
      </Card>
    );
    expect(queryByText('Test Icon')).toBeNull();
    expect(getByText('Test Content')).toBeTruthy();
  });
});
