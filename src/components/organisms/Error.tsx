import React from 'react';
import { Text, View } from 'react-native';

interface ErrorProps {
  error: string;
}

export function Error({ error }: ErrorProps) {
  return (
    <View testID="ErrorView">
      <Text testID="Error">Error</Text>
      <Text testID="AnotherError">{error}</Text>
    </View>
  );
}
