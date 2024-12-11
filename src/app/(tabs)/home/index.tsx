import { useSuspenseQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import React, { Suspense, useContext } from 'react';
import {
  ActivityIndicator,
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
import { Chip } from '@/components/atoms/Chip';
import { Header } from '@/components/atoms/Header';
import { IconButton } from '@/components/atoms/IconButton';
import { InputButton } from '@/components/atoms/InputButton';
import { ToniArrowSwitch } from '@/components/atoms/icons/ToniArrowSwitch';
import { ToniCurrentLocation } from '@/components/atoms/icons/ToniCurrentLocation';
import { ToniLocation } from '@/components/atoms/icons/ToniLocation';
import { PopUp } from '@/components/organisms/PopUp';
import { photonValue } from '@/functions/photonValue';
import { Favorite } from '@/services/api-backend';
import { favoritesControllerFindAllPinnedFavoritesOptions } from '@/services/api-backend/@tanstack/react-query.gen';
import { useAuthStore } from '@/store/useAuthStore';
import { useCurrentLocationStore } from '@/store/useCurrentLocationStore';
import { OriginDestinationType, useTripStore } from '@/store/useTripStore';

export default function HomePage() {
  const { switchOriginDestination, changeDestination } = useTripStore(
    (state) => state.actions
  );
  const origin = useTripStore((state) => state.origin);
  const destination = useTripStore((state) => state.destination);
  const currentLocation = useCurrentLocationStore(
    (state) => state.currentLocation
  );
  const token = useAuthStore((state) => state.token);

  const { data: favorites } = useSuspenseQuery({
    ...favoritesControllerFindAllPinnedFavoritesOptions(),
    queryKey: ['favorites', 'pinned', token],
  });
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
    router.push({ pathname: `/trip`, params });
  };

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

  const startNavigationFromFavorite = (favorite: Favorite) => {
    changeDestination(favorite.photonFeature);
    if (currentLocation) {
      navigateToTrip({
        origin: [
          currentLocation.coords.longitude,
          currentLocation.coords.latitude,
        ],
        destination: favorite.photonFeature.geometry.coordinates,
      });
    }
  };

  const screenHeight = Dimensions.get('window').height;
  const viewHeight = 0.45 * screenHeight;

  return (
    <SafeAreaView className="flex-1 bg-background">
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

              <InputButton
                onPress={() => {
                  router.push('/home/start');
                }}
                label="Start"
                icon={
                  <ToniCurrentLocation
                    width={40}
                    height={40}
                    fill={themes.external[`--${theme}-mode-icon-button`]}
                    stroke={themes.external[`--${theme}-mode-icon-button`]}
                  />
                }
              >
                {origin ? photonValue(origin) : 'Mein Standort'}
              </InputButton>

              <InputButton
                classes=""
                onPress={() => {
                  router.push('/home/destination');
                }}
                label="Ziel"
                icon={
                  <ToniLocation
                    width={40}
                    height={40}
                    stroke={themes.external[`--accent`]}
                    fillInner={themes.external[`--accent`]}
                  />
                }
              >
                {destination ? photonValue(destination) : ''}
              </InputButton>
              <ScrollView
                className="my-8 rounded-full"
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                <View className="flex flex-row">
                  <Suspense fallback={<ActivityIndicator size="small" />}>
                    {favorites &&
                      favorites.map((favorite) => (
                        <Chip
                          onPress={() => startNavigationFromFavorite(favorite)}
                          key={favorite.id}
                        >
                          {favorite.title}
                        </Chip>
                      ))}
                  </Suspense>
                </View>
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
