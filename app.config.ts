import 'ts-node/register';
import { ConfigContext, ExpoConfig } from 'expo/config';

// eslint-disable-next-line import/no-default-export
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  extra: {
    eas: {
      projectId: '41ce45b0-f361-4e31-a1b3-4b1f8185b526',
    },
  },
  newArchEnabled: true,
  name: 'toni-navigation',
  slug: 'toni',
  version: '1.0.0',
  icon: './src/assets/images/icon.png',
  userInterfaceStyle: 'automatic', // 'automatic' | 'light' | 'dark'
  splash: {
    image: './src/assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#0A585C',
  },
  experiments: {
    typedRoutes: true,
  },
  plugins: [
    'expo-secure-store',
    [
      'expo-location',
      {
        locationAlwaysAndWhenInUsePermission: 'Allow Toni to use your location.',
      },
    ],
    'expo-router',
    'expo-font',
    [
      'expo-screen-orientation',
      {
        initialOrientation: 'DEFAULT',
      },
    ],
  ],
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    requireFullScreen: true,
    splash: {
      image: './src/assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#0A585C',
    },
    config: {
      usesNonExemptEncryption: false,
    },
    bundleIdentifier: 'io.toni.app',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './src/assets/images/adaptive-icon.png',
      backgroundColor: '#0A585C',
    },
    package: 'io.toni.app',
  },
  web: {
    favicon: './src/assets/favicon.png',
  },
  scheme: 'toni',
});
