import { useEffect } from 'react';
import { AccessibilityInfo, Text, View } from 'react-native';

interface ErrorProps {
  error: string;
}
function Error({ error }: ErrorProps) {
  return (
    <View>
      <Text>Error</Text>
      <Text>{error}</Text>
    </View>
  );
}

export default Error;
