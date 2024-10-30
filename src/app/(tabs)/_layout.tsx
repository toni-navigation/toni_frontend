import { Tabs, usePathname } from 'expo-router';
import React, { useContext } from 'react';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
import { NavigationArrow } from '@/components/atoms/icons/NavigationArrow';
import { Person } from '@/components/atoms/icons/Person';
import { Star } from '@/components/atoms/icons/Star';

const iconsArray = {
  star: ({ color }: { color: string }) => (
    <Star classes={color} fill={color} width={36} height={36} />
  ),
  navigationArrow: ({ color }: { color: string }) => (
    <NavigationArrow fill={color} width={32} height={32} />
  ),
  person: ({ color }: { color: string }) => (
    <Person fill={color} width={36} height={36} />
  ),
};
export default function Layout() {
  const currentPath = usePathname();
  const { theme } = useContext(ThemeContext);

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
          backgroundColor: themes.external[`--${theme}-mode-background`],
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'generalSans-semibold',
          height: 40,
          justifyContent: 'center',
          alignContent: 'center',
        },
        // tabBarLabelPosition: 'beside-icon',
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
          tabBarIcon: ({ color }) => iconsArray.star({ color }),
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
