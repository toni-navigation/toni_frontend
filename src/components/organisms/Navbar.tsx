import { Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import styling from '../../../stylings';

interface NavbarProps {
  icons: {
    navigation: (props: { color: string }) => React.JSX.Element;
    favoriteList: (props: { color: string }) => React.JSX.Element;
    profile: (props: { color: string }) => React.JSX.Element;
  };
}

function Navbar({ icons }: NavbarProps) {
  const colorscheme = useColorScheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { height: 110 },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: 'Navigation',
          tabBarLabel: 'Navigation',
          tabBarIcon: ({ color }) => icons.navigation({ color }),
          tabBarActiveBackgroundColor:
            colorscheme === 'light'
              ? styling.colors['primary-color-light']
              : styling.colors['primary-color-dark'],
          tabBarActiveTintColor:
            colorscheme === 'light'
              ? styling.colors['background-light']
              : styling.colors['background-dark'],
          tabBarInactiveTintColor:
            colorscheme === 'light'
              ? styling.colors['primary-color-light']
              : styling.colors['primary-color-dark'],
          tabBarAccessibilityLabel: 'Navigation',
          tabBarLabelPosition: 'below-icon',
          tabBarItemStyle: {
            justifyContent: 'center',
            height: 110 - insets.bottom,
            alignContent: 'center',
            paddingBottom: 15,
          },
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          headerTitle: 'Meine Favoriten',
          tabBarLabel: 'Favoriten',
          tabBarIcon: ({ color }) => icons.favoriteList({ color }),
          tabBarActiveBackgroundColor:
            colorscheme === 'light'
              ? styling.colors['primary-color-light']
              : styling.colors['primary-color-dark'],
          tabBarActiveTintColor:
            colorscheme === 'light'
              ? styling.colors['background-light']
              : styling.colors['background-dark'],
          tabBarInactiveTintColor:
            colorscheme === 'light'
              ? styling.colors['primary-color-light']
              : styling.colors['primary-color-dark'],
          tabBarAccessibilityLabel: 'Favoriten',
          tabBarLabelPosition: 'below-icon',
          tabBarItemStyle: {
            justifyContent: 'center',
            height: 110 - insets.bottom,
            alignContent: 'center',
            paddingBottom: 15,
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: 'Mein Profil',
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color }) => icons.profile({ color }),
          tabBarActiveBackgroundColor:
            colorscheme === 'light'
              ? styling.colors['primary-color-light']
              : styling.colors['primary-color-dark'],
          tabBarActiveTintColor:
            colorscheme === 'light'
              ? styling.colors['background-light']
              : styling.colors['background-dark'],
          tabBarInactiveTintColor:
            colorscheme === 'light'
              ? styling.colors['primary-color-light']
              : styling.colors['primary-color-dark'],
          tabBarAccessibilityLabel: 'Profil',
          tabBarLabelPosition: 'below-icon',
          tabBarItemStyle: {
            justifyContent: 'center',
            height: 110 - insets.bottom,
            alignContent: 'center',
            paddingBottom: 15,
          },
        }}
      />
    </Tabs>
  );
}

export default Navbar;
