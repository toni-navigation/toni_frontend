import 'ts-node/register';
import { ConfigContext, ExpoConfig } from 'expo/config';

// eslint-disable-next-line import/no-default-export
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'toni',
  slug: 'toni',
  version: '1.0.0',
  icon: './src/assets/images/icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './src/assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#0A585C',
  },
  experiments: {
    typedRoutes: true,
  },
  plugins: [
    [
      'expo-location',
      {
        locationAlwaysAndWhenInUsePermission:
          'Allow Toni to use your location.',
      },
    ],
    'expo-router',
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
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './src/assets/images/adaptive-icon.png',
      backgroundColor: '#0A585C',
    },
  },
  web: {
    favicon: './src/assets/favicon.png',
  },
  scheme: 'toni',
});
