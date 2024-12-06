import { router } from 'expo-router';
import React, { useContext } from 'react';
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';

// @ts-ignore
import background from '@/assets/images/background100.png';
import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
import { Button } from '@/components/atoms/Button';
import { Header } from '@/components/atoms/Header';
import { IconButton } from '@/components/atoms/IconButton';
import { InputButton } from '@/components/atoms/InputButton';
import { ToniArrowSwitch } from '@/components/atoms/icons/ToniArrowSwitch';
import { ToniCurrentLocation } from '@/components/atoms/icons/ToniCurrentLocation';
import { ToniLocation } from '@/components/atoms/icons/ToniLocation';
import { PopUp } from '@/components/organisms/PopUp';
import { photonValue } from '@/functions/photonValue';
import { useCurrentLocationStore } from '@/store/useCurrentLocationStore';
import { OriginDestinationType, useTripStore } from '@/store/useTripStore';

export default function HomePage() {
  const { switchOriginDestination } = useTripStore((state) => state.actions);
  const origin = useTripStore((state) => state.origin);
  const destination = useTripStore((state) => state.destination);
  const currentLocation = useCurrentLocationStore(
    (state) => state.currentLocation
  );

  const { theme } = useContext(ThemeContext);

  const [showPopUp, setShowPopUp] = React.useState(false);

  const getCoordinates = (location: OriginDestinationType) => {
    if (location) {
      return location.geometry.coordinates;
    }
    if (location === null && currentLocation) {
      return [
        currentLocation.coords.longitude,
        currentLocation.coords.latitude,
      ];
    }

    return undefined;
  };

  // TODO: redirect direkt in startNavigationHandler
  const navigateToTrip = (params: {
    origin: number[];
    destination: number[];
  }) => {
    // Assuming router.push handles navigation to the trip page
    router.push({ pathname: `/trip`, params });
  };
  // const { onLogout } = useAuthStore((state) => state.actions);
  // const { resetUserStore } = useUserStore((state) => state.actions);

  const startNavigationHandler = () => {
    const newOrigin = getCoordinates(origin);
    const newDestination = getCoordinates(destination);
    if (newOrigin && newDestination) {
      const params = {
        origin: newOrigin,
        destination: newDestination,
      };

      navigateToTrip(params);
    }
  };
  // const logout = () => {
  //   onLogout();
  // };
  // const startNavigationFromFavorite = (favorite: FavoriteProps) => {
  //   changeDestination(favorite.address);
  //   if (currentLocation) {
  //     navigateToTrip({
  //       origin: [
  //         currentLocation.coords.longitude,
  //         currentLocation.coords.latitude,
  //       ],
  //       destination: favorite.address.geometry.coordinates,
  //     });
  //   }
  // };

  const screenHeight = Dimensions.get('window').height;
  const viewHeight = 0.45 * screenHeight;
  // const clearAsyncStorage = async () => {
  //   try {
  //     await AsyncStorage.clear();
  //     console.log('AsyncStorage successfully cleared!');
  //   } catch (error) {
  //     console.error('Failed to clear AsyncStorage:', error);
  //   }
  // };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* <Button width="full" onPress={cleanLastDestinations} buttonType="primary"> */}
      {/* Letzte Ziele löschen */}
      {/* </Button> */}
      {/* <Button onPress={clearAsyncStorage} buttonType="accent" width="full"> */}
      {/*  Clean AsyncStorage */}
      {/* </Button> */}
      {/* <Button onPress={logout} buttonType="accent" width="full"> */}
      {/*  Clean Auth */}
      {/* </Button> */}
      <PopUp
        visible={showPopUp}
        onCloseClick={() => {
          setShowPopUp(false);
          startNavigationHandler();
        }}
        onCloseButtonText="Alles klar!"
      >
        <Header classes="text-background">Hinweis</Header>

        <Text className="text-2xl font-atkinsonRegular text-center text-background">
          Solltest du öffentliche Verkehrsmittel nutzen, gib bitte die nächste
          Haltestelle ein. Toni verfügt nur über die Navigation von Fußwegen.
        </Text>
      </PopUp>
      <ImageBackground source={background} className="flex-1">
        <ScrollView keyboardShouldPersistTaps="always">
          <View
            style={{ height: viewHeight }}
            className="px-8 py-8 bg-background rounded-b-[25]"
          >
            <View>
              <View className="mb-6 flex flex-row justify-between">
                <Header>Neue Route</Header>
                <IconButton
                  onPress={switchOriginDestination}
                  buttonType="accentOutline"
                  disabled={origin === undefined && destination === undefined}
                  iconName="Start und Ziel tauschen"
                  icon={
                    <ToniArrowSwitch
                      stroke={themes.external[`--accent`]}
                      width={30}
                      height={30}
                    />
                  }
                />
              </View>

              <View className="flex flex-row items-center pb-8">
                <ToniCurrentLocation
                  width={40}
                  height={40}
                  fill={themes.external[`--${theme}-mode-icon-button`]}
                  stroke={themes.external[`--${theme}-mode-icon-button`]}
                />
                <InputButton
                  classes="ml-3 flex-1"
                  onPress={() => {
                    router.push('/home/start');
                  }}
                >
                  {origin ? photonValue(origin) : 'Mein Standort'}
                </InputButton>
              </View>
              <View className="flex flex-row items-center pb-8">
                <ToniLocation
                  width={40}
                  height={40}
                  stroke={themes.external[`--accent`]}
                  fillInner={themes.external[`--accent`]}
                />
                <InputButton
                  classes="ml-3 flex-1"
                  onPress={() => {
                    router.push('/home/destination');
                  }}
                >
                  {destination ? photonValue(destination) : ''}
                </InputButton>
              </View>
              <ScrollView
                className="my-8 rounded-full"
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                {/* <View className="flex flex-row"> */}
                {/*  {favorites && */}
                {/*    favorites.map((favorite) => ( */}
                {/*      <Chip */}
                {/*        onPress={() => startNavigationFromFavorite(favorite)} */}
                {/*        key={favorite.id} */}
                {/*      > */}
                {/*        {favorite.title} */}
                {/*      </Chip> */}
                {/*    ))} */}
                {/* </View> */}
              </ScrollView>
            </View>
          </View>
        </ScrollView>

        <View className="mx-5 mb-8">
          <Button
            width="full"
            onPress={() => setShowPopUp(true)}
            disabled={origin === undefined || !destination}
            buttonType="accent"
          >
            Route starten
          </Button>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
