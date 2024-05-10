import { Stack } from 'expo-router';
import 'react-native-reanimated';

function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Navigation',
        }}
      />
    </Stack>
  );
}
export default HomeLayout;
