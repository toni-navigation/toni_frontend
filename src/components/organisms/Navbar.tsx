import { Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';

import styling from '@/stylings';

interface NavbarProps {
  icons: {
    heart: (props: { color: string }) => React.JSX.Element;
    person: (props: { color: string }) => React.JSX.Element;
    navigationArrow: (props: { color: string }) => React.JSX.Element;
  };
}

export function Navbar({ icons }: NavbarProps) {
  const colorscheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 118,
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
          backgroundColor:
            colorscheme === 'light'
              ? styling.colors['mint-dark']
              : styling.colors['mint-light'],
        },

        tabBarShowLabel: false,
        tabBarActiveTintColor:
          colorscheme === 'light'
            ? styling.colors['orange-accent']
            : styling.colors['orange-accent'],
        tabBarInactiveTintColor:
          colorscheme === 'light'
            ? styling.colors['mint-light']
            : styling.colors['mint-dark'],
        tabBarIconStyle: {
          justifyContent: 'center',
          alignContent: 'center',
        },
      }}
    >
      <Tabs.Screen
        name="favorites"
        options={{
          headerTitle: 'Navigation',
          tabBarLabel: 'Navigation',
          tabBarIcon: ({ color }) => icons.heart({ color }),
          tabBarAccessibilityLabel: 'Navigation',
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: 'Meine Favoriten',
          tabBarLabel: 'Favoriten',
          tabBarIcon: ({ color }) => icons.navigationArrow({ color }),
          tabBarAccessibilityLabel: 'Favoriten',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: 'Mein Profil',
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color }) => icons.person({ color }),
          tabBarAccessibilityLabel: 'Profil',
        }}
      />
    </Tabs>
  );
}
