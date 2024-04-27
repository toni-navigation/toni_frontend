import { Stack } from 'expo-router';

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
