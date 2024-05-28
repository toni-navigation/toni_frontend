import { Tabs, usePathname } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';

import { Heart } from '@/components/atoms/icons/Heart';
import { NavigationArrow } from '@/components/atoms/icons/NavigationArrow';
import { Person } from '@/components/atoms/icons/Person';
import styling from '@/stylings';

const iconsArray = {
    heart: ({ color }: { color: string }) => (
        <Heart fill={color} width={48} height={48} />
    ),
    navigationArrow: ({ color }: { color: string }) => (
        <NavigationArrow fill={color} width={41} height={41} />
    ),
    person: ({ color }: { color: string }) => (
        <Person fill={color} width={48} height={48} />
    ),
};
export default function Layout() {
    const colorscheme = useColorScheme();
    const currentPath = usePathname();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    display: currentPath.includes('trip') ? 'none' : undefined,
                    height: 110,
                    borderTopWidth: 0,
                    elevation: 0,
                    backgroundColor:
                        colorscheme === 'light'
                            ? styling.colors['background-light']
                            : styling.colors['background-dark'],
                },

                tabBarShowLabel: false,
                tabBarActiveTintColor:
                    colorscheme === 'light'
                        ? styling.colors['orange-accent']
                        : styling.colors['orange-accent'],
                tabBarInactiveTintColor:
                    colorscheme === 'light'
                        ? styling.colors['primary-color-light']
                        : styling.colors['background-dark'],
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
                    tabBarAccessibilityLabel: 'Navigation',
                    tabBarItemStyle: {
                        backgroundColor:
                            colorscheme === 'light'
                                ? styling.colors['primary-color-dark']
                                : styling.colors['primary-color-light'],
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
                    tabBarAccessibilityLabel: 'Favoriten',
                    tabBarItemStyle: {
                        backgroundColor:
                            colorscheme === 'light'
                                ? styling.colors['primary-color-dark']
                                : styling.colors['primary-color-light'],
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
                        backgroundColor:
                            colorscheme === 'light'
                                ? styling.colors['primary-color-dark']
                                : styling.colors['primary-color-light'],
                        borderTopRightRadius: 40,
                        height: 110,
                    },
                    headerShown: false,
                }}
            />
        </Tabs>
    );
}
