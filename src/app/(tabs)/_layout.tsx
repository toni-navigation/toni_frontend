import { Tabs, usePathname } from 'expo-router';
import React, { useContext } from 'react';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
import { ToniFavorites } from '@/components/atoms/icons/ToniFavorites';
import { ToniNavigationArrow } from '@/components/atoms/icons/ToniNavigationArrow';
import { ToniProfile } from '@/components/atoms/icons/ToniProfile';

const iconsArray = {
  star: ({ color }: { color: string }) => (
    <ToniFavorites fill={color} width={36} height={36} />
  ),
  navigationArrow: ({ color }: { color: string }) => (
    <ToniNavigationArrow fill={color} width={32} height={32} />
  ),
  person: ({ color }: { color: string }) => (
    <ToniProfile fill={color} width={36} height={36} />
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
          display: currentPath.includes('trip') ? 'none' : undefined,
          backgroundColor: themes.external[`--${theme}-mode-background`],
          height: 100,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'generalSans-semibold',
          justifyContent: 'center',
          alignContent: 'center',
          paddingTop: 10,
        },
        // tabBarLabelPosition: 'beside-icon',
        tabBarActiveTintColor: themes.external['--accent'],
        tabBarInactiveTintColor:
          themes.external[`--${theme}-mode-primary-inverted`],
        tabBarIconStyle: {
          justifyContent: 'center',
          alignContent: 'center',
          marginTop: 10,
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
            height: 110,
          },
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
