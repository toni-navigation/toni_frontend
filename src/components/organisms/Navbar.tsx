import React from 'react';
import { useColorScheme } from 'react-native';
import { Tabs } from 'expo-router';
import styling from '../../../stylings';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
        tabBarStyle: { height: 100 },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: 'Navigation',
          tabBarIcon: ({ color }) => icons.navigation({ color }),
          tabBarActiveBackgroundColor:
            colorscheme === 'light'
              ? styling.colors['primary-color-light']
              : styling.colors['primary-color-dark'],
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor:
            colorscheme === 'light'
              ? styling.colors['primary-color-light']
              : styling.colors['primary-color-dark'],
          tabBarAccessibilityLabel: 'Navigation',
          tabBarLabelPosition: 'below-icon',
          tabBarItemStyle: {
            height: 110 - insets.bottom,
            alignContent: 'center',
            paddingBottom: 15,
          },
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          tabBarLabel: 'Favoriten',
          tabBarIcon: ({ color }) => icons.favoriteList({ color }),
          tabBarActiveBackgroundColor:
            colorscheme === 'light'
              ? styling.colors['primary-color-light']
              : styling.colors['primary-color-dark'],
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor:
            colorscheme === 'light'
              ? styling.colors['primary-color-light']
              : styling.colors['primary-color-dark'],
          tabBarAccessibilityLabel: 'Favoriten',
          tabBarLabelPosition: 'below-icon',
          tabBarItemStyle: {
            height: 110 - insets.bottom,
            alignContent: 'center',
            paddingBottom: 15,
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color }) => icons.profile({ color }),
          tabBarActiveBackgroundColor:
            colorscheme === 'light'
              ? styling.colors['primary-color-light']
              : styling.colors['primary-color-dark'],
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor:
            colorscheme === 'light'
              ? styling.colors['primary-color-light']
              : styling.colors['primary-color-dark'],
          tabBarAccessibilityLabel: 'Profil',
          tabBarLabelPosition: 'below-icon',
          tabBarItemStyle: {
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
