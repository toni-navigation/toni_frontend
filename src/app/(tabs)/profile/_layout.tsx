import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { useContext } from 'react';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';

function ProfileLayout() {
  const { theme } = useContext(ThemeContext);

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Mein Profil',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="calibration"
        options={{
          headerTitle: 'Kalibrierung',
          headerStyle: {
            backgroundColor: themes.external[`--${theme}-mode-background`],
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack>
  );
}
export default ProfileLayout;
