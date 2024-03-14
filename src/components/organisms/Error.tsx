import { Text, View } from 'react-native';

interface ErrorProps {
  error: string;
}

export function Error({ error }: ErrorProps) {
  return (
    <View>
      <Text>Error</Text>
      <Text>{error}</Text>
    </View>
  );
}
