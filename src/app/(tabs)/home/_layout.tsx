import { Stack } from 'expo-router';

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
