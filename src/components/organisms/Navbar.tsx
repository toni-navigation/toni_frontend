import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { ViewStyle } from 'react-native';
import { Tabs } from 'expo-router';
import styling from '../../../stylings';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Orientation } from 'expo-screen-orientation';
import * as ScreenOrientation from 'expo-screen-orientation';
import { OrientationChangeEvent } from 'expo-screen-orientation/src/ScreenOrientation.types';

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
  const [orientation, setOrientation] = useState<Orientation>();

  const checkOrientation = async () => {
    const currentOrientation = await ScreenOrientation.getOrientationAsync();
    setOrientation(currentOrientation);
  };
  const handleOrientationChange = (o: OrientationChangeEvent) => {
    setOrientation(o.orientationInfo.orientation);
  };

  useEffect(() => {
    checkOrientation();
    ScreenOrientation.addOrientationChangeListener(handleOrientationChange);
  }, []);

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
          headerTitle: 'Meine Profil',
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
