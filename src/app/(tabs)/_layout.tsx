import { router, Tabs, usePathname, useSegments } from 'expo-router';
import React, { useContext, useEffect } from 'react';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
import { Heart } from '@/components/atoms/icons/Heart';
import { NavigationArrow } from '@/components/atoms/icons/NavigationArrow';
import { Person } from '@/components/atoms/icons/Person';

const iconsArray = {
  heart: ({ color }: { color: string }) => (
    <Heart classes={color} fill={color} width={48} height={48} />
  ),
  navigationArrow: ({ color }: { color: string }) => (
    <NavigationArrow fill={color} width={41} height={41} />
  ),
  person: ({ color }: { color: string }) => (
    <Person fill={color} width={48} height={48} />
  ),
};
export default function Layout() {
  const currentPath = usePathname();
  const { theme } = useContext(ThemeContext);
  console.log('currentPath', currentPath);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display:
            currentPath.includes('trip') || currentPath.includes('calibration')
              ? 'none'
              : undefined,
          height: 110,
          borderTopWidth: 0,
          elevation: 0,
          backgroundColor: themes.external[`--${theme}-mode-background`],
        },

        tabBarShowLabel: false,
        tabBarActiveTintColor: themes.external['--accent'],
        tabBarInactiveTintColor:
          themes.external[`--${theme}-mode-primary-inverted`],
        tabBarIconStyle: {
          justifyContent: 'center',
          alignContent: 'center',
        },
      }}
    >
      <Tabs.Screen
        key="favorites"
        name="favorites"
        options={{
          headerTitle: 'Meine Favoriten',
          tabBarLabel: 'Favoriten',
          tabBarIcon: ({ color }) => iconsArray.heart({ color }),
          tabBarAccessibilityLabel: 'Favoriten',
          tabBarItemStyle: {
            backgroundColor: themes.external[`--${theme}-mode-primary`],
            borderTopLeftRadius: 40,
            height: 110,
          },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: 'Navigation',
          tabBarLabel: 'Navigation',
          tabBarIcon: ({ color }) => iconsArray.navigationArrow({ color }),
          href: '/home',
          tabBarAccessibilityLabel: 'Navigation',
          tabBarItemStyle: {
            backgroundColor: themes.external[`--${theme}-mode-primary`],
            height: 110,
          },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: 'Mein Profil',
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color }) => iconsArray.person({ color }),
          tabBarAccessibilityLabel: 'Profil',
          tabBarItemStyle: {
            backgroundColor: themes.external[`--${theme}-mode-primary`],
            borderTopRightRadius: 40,
            height: 110,
          },
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
