import { router } from 'expo-router';
import React, { useContext } from 'react';
import { Dimensions, SafeAreaView, ScrollView, View } from 'react-native';

// import { getCalibrationValue } from '@/functions/getCalibrationValue';
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
import { TOKEN } from '@/services/client';
import { deleteToken } from '@/store/secureStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useUserStore } from '@/store/useUserStore';

export default function ProfilePage() {
  const calibrationFactor = useUserStore((state) => state.calibrationFactor);
  const user = useUserStore((state) => state.user);
  const { resetUserStore } = useUserStore((state) => state.actions);

  const { removeToken } = useAuthStore((state) => state.actions);

  const logout = async () => {
    try {
      await deleteToken(TOKEN);
      removeToken();
      resetUserStore();
    } catch (error) {
      console.error(error);
    }
  };

  const screenHeight = Dimensions.get('window').height;
  const viewHeight = 0.2 * screenHeight;
  const { theme } = useContext(ThemeContext);

  return (
    <SafeAreaView className="flex-1 bg-background">
      {!user ? (
        <View className="flex-1 bg-invertedPrimary">
          <View
            style={{ height: viewHeight }}
            className="px-8 py-5 bg-background rounded-b-[25] items-center"
          >
            <ToniProfilePicture height={70} width={70} />
            <Header classes="text-center mt-4">Mein Profil</Header>
          </View>
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
        </View>
      ) : (
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
          <ScrollView className="px-8">
            <ProfileMenuCard
              header="Allgemein"
              onPress={() => {
                router.push('/profile/general-settings');
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
                Keine Heimat Adresse
              </ProfileMenuItem>
            </ProfileMenuCard>
            <ProfileMenuCard
              header="Schrittlänge"
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
                {calibrationFactor
                  ? `Deine Schrittlänge: ${calibrationFactor} m`
                  : 'Keine Schrittlänge hinterlegt'}
              </ProfileMenuItem>
            </ProfileMenuCard>
            <ProfileMenuCard
              classes="mb-8"
              header="Konto"
              onPress={() => {
                router.push('/profile/account-settings');
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
                {/* {user?.password ? '********' : 'Kein Passwort'} */}
                Kein Passwort
              </ProfileMenuItem>
            </ProfileMenuCard>
            {/* {isPending && <ActivityIndicator size="large" />} */}
            {/* {isError && <Text>{error.message}</Text>} */}
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
        </View>
      )}
    </SafeAreaView>
  );
}
