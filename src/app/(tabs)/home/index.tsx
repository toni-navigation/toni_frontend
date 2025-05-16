import { useQuery } from '@tanstack/react-query';
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
import { Chip } from '@/components/atoms/Chip';
import { Header } from '@/components/atoms/Header';
import { IconButton } from '@/components/atoms/IconButton';
import { InputButton } from '@/components/atoms/InputButton';
import { ToniArrowSwitch } from '@/components/atoms/icons/ToniArrowSwitch';
import { ToniCurrentLocation } from '@/components/atoms/icons/ToniCurrentLocation';
import { ToniLocation } from '@/components/atoms/icons/ToniLocation';
import { PopUp } from '@/components/organisms/PopUp';
import { inputButtonOutput } from '@/functions/originOutput';
import { QUERY_KEYS } from '@/query-keys';
import { Favorite } from '@/services/api-backend';
import { favoritesControllerFindAllFavoritesOptions } from '@/services/api-backend/@tanstack/react-query.gen';
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
  const { data: favorites } = useQuery({
    ...favoritesControllerFindAllFavoritesOptions(),
    queryKey: [QUERY_KEYS.favorites, token],
    enabled: !!token,
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
        <Header>Hinweis</Header>

        <Text className="text-medium pt-4 font-atkinsonRegular text-center text-textColor">
          Solltest du öffentliche Verkehrsmittel nutzen, gib bitte die nächste
          Haltestelle ein. hearow verfügt nur über die Navigation von Fußwegen.
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
                      strokeWidth={5}
                    />
                  }
                />
              </View>

              <InputButton
                classes="mb-2"
                onPress={() => {
                  router.push('/home/start');
                }}
                label="Start"
                icon={
                  <ToniCurrentLocation
                    width={40}
                    height={40}
                    strokeWidth={3}
                    fill={themes.external[`--${theme}-mode-icon-button`]}
                    stroke={themes.external[`--${theme}-mode-icon-button`]}
                  />
                }
              >
                {inputButtonOutput(origin)}
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
                    strokeWidth={3}
                  />
                }
              >
                {inputButtonOutput(destination)}
              </InputButton>
              <ScrollView
                className="my-8 rounded-full"
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                <View className="flex flex-row">
                  {favorites &&
                    favorites
                      .filter((favorite) => favorite.isPinned)
                      .map((favorite) => (
                        <Chip
                          onPress={() => startNavigationFromFavorite(favorite)}
                          key={favorite.id}
                        >
                          {favorite.title}
                        </Chip>
                      ))}
                </View>
              </ScrollView>
            </View>
          </View>
        </ScrollView>

        <View className="mx-5 mb-8 items-center">
          <Button
            width="third"
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
