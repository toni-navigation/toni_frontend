import { AtkinsonHyperlegible_400Regular } from '@expo-google-fonts/atkinson-hyperlegible';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';

import 'react-native-reanimated';
import '@/global.css';
import generalSansSemi from '@/assets/fonts/GeneralSans-Semibold.otf';
import { ThemeProvider } from '@/components/ThemeProvider';
import * as Linking from 'expo-linking';
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

function RootLayoutNav() {
    return (
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <Stack
                        screenOptions={{
                            headerTitleStyle: {
                                fontFamily: 'generalSansSemi',
                                fontWeight: 'bold',
                            },

                        }}
                    >
                        <Stack.Screen
                            name="(tabs)"
                            options={{
                                headerShown: false,
                            }}
                        />
                        {/* <Stack.Screen */}
                        {/*  name="calibration" */}
                        {/*  options={{ */}
                        {/*    headerShown: false, */}
                        {/*  }} */}
                        {/* /> */}

                        <Stack.Screen
                            name="index"
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name="agbs"
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name="intro"
                            options={{
                                headerShown: false,
                            }}
                        />
                        {/* <Stack.Screen */}
                        {/*  name="auth" */}
                        {/*  options={{ */}
                        {/*    presentation: 'modal', // Enables modal presentation for all screens in 'modal' */}
                        {/*    headerShown: false, // Optional: Hide headers for modals */}
                        {/*  }} */}
                        {/* /> */}
                        <Stack.Screen
                            name="trip"
                            options={{
                                headerShown: false,
                                headerBackTitle: 'Home',
                            }}
                        />
                    </Stack>
                </ThemeProvider>
            </QueryClientProvider>
        </React.StrictMode>
    );
}
export default function RootLayout() {
    const [loaded, error] = useFonts({
        atkinsonRegular: AtkinsonHyperlegible_400Regular,
        generalSansSemi,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);
    const router = useRouter();

    useEffect(() => {
        const handleDeepLink = async (event: { url: string }) => {
            const { queryParams } = Linking.parse(event.url);
            if (queryParams?.token) {
                await AsyncStorage.setItem('emailConfirmationToken', queryParams.token as string);
                console.log('Stored token:', queryParams.token);
            }
        };

        // Listen for deep links when app is already open
        const subscription = Linking.addEventListener('url', handleDeepLink);

        // Handle deep link if app was opened from a link
        Linking.getInitialURL().then((url) => {
            if (url) handleDeepLink({ url });
        });

        return () => {
            subscription.remove();
        };
    }, [router]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav />;
}
