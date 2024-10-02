import { Stack } from 'expo-router';
import React from 'react';
import 'react-native-reanimated';

function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Mein Profil',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
export default ProfileLayout;
