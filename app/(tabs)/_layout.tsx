import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';

export default () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: 'Navigation',
          tabBarIcon: () => (
            <Feather name="navigation" size={24} color="green" />
          ),
        }}
      />
      <Tabs.Screen name="favorites" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
};
