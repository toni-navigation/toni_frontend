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

  const checkOrientationStyle = (index: Orientation | undefined): ViewStyle => {
    switch (index) {
      case 1:
        return { height: 100, position: 'absolute' };
      case 3:
        return { height: 300, position: 'absolute' };
      case 4:
        return { height: 100, position: 'absolute', top: 0, bottom: 'auto' };
      default:
        return { height: 300, position: 'absolute', top: 0, bottom: 'auto' };
    }
  };

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: checkOrientationStyle(orientation),
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
