import { Stack } from 'expo-router';
import 'react-native-reanimated';

function FavoritesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Meine Favoriten',
        }}
      />
    </Stack>
  );
}
export default FavoritesLayout;
