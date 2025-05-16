import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import React, { useContext } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Linking,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
import { Button } from '@/components/atoms/Button';
import { Header } from '@/components/atoms/Header';
import { ProfileMenuCard } from '@/components/atoms/ProfileMenuCard';
import { ProfileMenuItem } from '@/components/atoms/ProfileMenuItem';
import { ToniEmail } from '@/components/atoms/icons/ToniEmail';
import { ToniHome } from '@/components/atoms/icons/ToniHome';
import { ToniName } from '@/components/atoms/icons/ToniName';
import { ToniPassword } from '@/components/atoms/icons/ToniPassword';
import { ToniProfilePicture } from '@/components/atoms/icons/ToniProfilePicture';
import { ToniSteps } from '@/components/atoms/icons/ToniSteps';
import { Card } from '@/components/organisms/Card';
import { Login } from '@/components/organisms/Login';
import { Registration } from '@/components/organisms/Registration';
import { TabBar } from '@/components/organisms/TabBar';
import { photonValue } from '@/functions/photonValue';
import { QUERY_KEYS } from '@/query-keys';
import {
  authenticationControllerGetUserOptions,
  favoritesControllerFindHomeAddressOptions,
} from '@/services/api-backend/@tanstack/react-query.gen';
import { TOKEN } from '@/services/client';
import { deleteToken } from '@/store/secureStore';
import { useAuthStore } from '@/store/useAuthStore';

export default function ProfilePage() {
  const token = useAuthStore((state) => state.token);
  const { removeToken } = useAuthStore((state) => state.actions);
  const { data: user, isLoading } = useQuery({
    ...authenticationControllerGetUserOptions(),
    queryKey: [QUERY_KEYS.user, token],
    enabled: !!token,
  });

  const { data: homeAddress } = useQuery({
    ...favoritesControllerFindHomeAddressOptions(),
    queryKey: [QUERY_KEYS.home_address, token],
    enabled: !!token,
  });

  const logout = async () => {
    try {
      await deleteToken(TOKEN);
      removeToken();
      router.dismissTo('/intro');
    } catch (error) {
      Alert.alert('Fehler', 'Beim Logout ist ein Fehler aufgetreten');
    }
  };
  const screenHeight = Dimensions.get('window').height;
  const viewHeight = 0.2 * screenHeight;
  const { theme } = useContext(ThemeContext);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 bg-invertedPrimary">
        <View
          style={{ height: viewHeight }}
          className="px-8 py-5 bg-background rounded-b-[25] items-center"
        >
          <ToniProfilePicture height={70} width={70} />
          <Header classes="text-center mt-4">
            {user?.firstname && user?.lastname
              ? `${user.firstname} ${user.lastname}`
              : 'Mein Profil'}
          </Header>
        </View>
        {isLoading && <ActivityIndicator size="large" />}
        {!user && !isLoading ? (
          <View className="flex-1 m-5">
            <Card color="background">
              <TabBar
                firstTabButtonText="Login"
                secondTabButtonText="Registrierung"
              >
                <Login />
                <Registration />
              </TabBar>
            </Card>
          </View>
        ) : (
          <ScrollView className="px-8">
            <ProfileMenuCard
              header="Allgemein"
              editButton
              onPress={() => {
                router.push({
                  pathname: '/profile/general-settings',
                  params: {
                    userId: user?.id,
                    firstname: user?.firstname,
                    lastname: user?.lastname,
                    homeFavorite: homeAddress
                      ? JSON.stringify(homeAddress)
                      : undefined,
                  },
                });
              }}
            >
              <ProfileMenuItem
                label="Vorname"
                icon={
                  <ToniName
                    height={30}
                    width={30}
                    stroke={themes.external[`--${theme}-mode-icon-button`]}
                    strokeWidth={4}
                  />
                }
              >
                {user?.firstname ? `${user.firstname}` : 'Kein Vorname'}
              </ProfileMenuItem>
              <ProfileMenuItem
                label="Nachname"
                isLast
                icon={
                  <ToniName
                    height={30}
                    width={30}
                    stroke={themes.external[`--${theme}-mode-icon-button`]}
                    strokeWidth={4}
                  />
                }
              >
                {user?.lastname ? `${user.lastname}` : 'Kein Nachname'}
              </ProfileMenuItem>
            </ProfileMenuCard>
            <ProfileMenuCard
              header="Heimatadresse"
              editButton
              onPress={() => {
                router.push({
                  pathname: '/profile/home-settings',
                  params: {
                    userId: user?.id,
                    firstname: user?.firstname,
                    lastname: user?.lastname,
                    homeFavorite: homeAddress
                      ? JSON.stringify(homeAddress)
                      : undefined,
                  },
                });
              }}
            >
              <ProfileMenuItem
                isLast
                label="Heimat Adresse"
                icon={
                  <ToniHome
                    height={30}
                    width={30}
                    stroke={themes.external[`--${theme}-mode-icon-button`]}
                    strokeWidth={4}
                  />
                }
              >
                {homeAddress
                  ? photonValue(homeAddress.photonFeature)
                  : 'Keine Heimat Adresse'}
              </ProfileMenuItem>
            </ProfileMenuCard>
            <ProfileMenuCard
              header="Schrittlänge"
              editButton
              onPress={() => {
                router.push('/profile/calibration');
              }}
            >
              <ProfileMenuItem
                isLast
                icon={
                  <ToniSteps
                    height={30}
                    width={30}
                    stroke={themes.external[`--${theme}-mode-icon-button`]}
                    strokeWidth={4}
                  />
                }
              >
                {user?.calibrationFactor
                  ? `Deine Schrittlänge: ${user.calibrationFactor} m`
                  : 'Keine Schrittlänge hinterlegt'}
              </ProfileMenuItem>
            </ProfileMenuCard>
            <ProfileMenuCard
              header="Konto"
              editButton
              onPress={() => {
                router.push({
                  pathname: '/profile/account-settings',
                  params: { userId: user?.id, email: user?.email },
                });
              }}
            >
              <ProfileMenuItem
                label="Email"
                icon={
                  <ToniEmail
                    height={30}
                    width={30}
                    stroke={themes.external[`--${theme}-mode-icon-button`]}
                    strokeWidth={4}
                  />
                }
              >
                {user?.email ? `${user.email}` : 'Keine Email Adresse'}
              </ProfileMenuItem>
              <ProfileMenuItem
                isLast
                label="Passwort"
                icon={
                  <ToniPassword
                    height={30}
                    width={30}
                    stroke={themes.external[`--${theme}-mode-icon-button`]}
                    strokeWidth={4}
                  />
                }
              >
                ********
              </ProfileMenuItem>
            </ProfileMenuCard>

            <ProfileMenuCard classes="mb-8" header="Rechtliches">
              <ProfileMenuItem>
                <Text
                  accessibilityLabel="Nutzungsbedingungen"
                  accessibilityRole="link"
                  accessibilityHint="Link zu den Nutzungsbedingungen"
                  className="text-accent"
                  onPress={() =>
                    Linking.openURL(
                      'https://www.hearow-nav.com/nutzungsbedingungen'
                    )
                  }
                >
                  Nutzungsbedingungen
                </Text>
              </ProfileMenuItem>
              <ProfileMenuItem>
                <Text
                  accessibilityLabel="AGBs"
                  accessibilityRole="link"
                  accessibilityHint="Link zu den AGBs"
                  className="text-accent"
                  onPress={() =>
                    Linking.openURL('https://www.hearow-nav.com/agbs')
                  }
                >
                  AGBs
                </Text>
              </ProfileMenuItem>
              <ProfileMenuItem isLast>
                <Text
                  accessibilityLabel="Datenschutz Richtlinien"
                  accessibilityRole="link"
                  accessibilityHint="Link zu den Datenschutz Richtlinien"
                  className="text-accent"
                  onPress={() =>
                    Linking.openURL('https://www.hearow-nav.com/datenschutz')
                  }
                >
                  Datenschutz Richtlinien
                </Text>
              </ProfileMenuItem>
            </ProfileMenuCard>

            <View className="flex items-center mb-8">
              <Button
                onPress={logout}
                buttonType="accent"
                width="third"
                disabled={!user}
              >
                Logout
              </Button>
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
