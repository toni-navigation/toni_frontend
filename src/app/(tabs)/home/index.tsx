import { router } from 'expo-router';
import React, { useContext, useState } from 'react';
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
import { CurrentLocationIcon } from '@/components/atoms/icons/CurrentLocationIcon';
import { Location } from '@/components/atoms/icons/Location';
import { SwitchArrow } from '@/components/atoms/icons/SwitchArrow';
import { PopUp } from '@/components/organisms/PopUp';
import { photonValue } from '@/functions/photonValue';
import { useCurrentLocationStore } from '@/store/useCurrentLocationStore';
import { useFavoriteStore } from '@/store/useFavoritesStore';
import { OriginDestinationType, useTripStore } from '@/store/useTripStore';

export default function HomePage() {
  const { changeOrigin, changeDestination, switchOriginDestination } =
    useTripStore((state) => state.actions);
  const origin = useTripStore((state) => state.origin);
  const destination = useTripStore((state) => state.destination);
  const currentLocation = useCurrentLocationStore(
    (state) => state.currentLocation
  );
  const favorites = useFavoriteStore((state) => state.favorites);

  const { theme } = useContext(ThemeContext);

  const [showPopUp, setShowPopUp] = React.useState(false);

  const [startValue, setStartValue] = useState('Mein Standort');
  const [destinationValue, setDestinationValue] = useState('');

  React.useEffect(() => {
    if (origin) {
      setStartValue(photonValue(origin));
    }
    if (origin === undefined) {
      setStartValue('');
    }
  }, [origin]);

  React.useEffect(() => {
    if (destination) {
      setDestinationValue(photonValue(destination));
    }
    if (destination === undefined) {
      setDestinationValue('');
    }
  }, [destination]);

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

  const startNavigationFromFavorite = (favorite: number) => {
    changeDestination(favorites[favorite].address);
    if (currentLocation) {
      navigateToTrip({
        origin: [
          currentLocation.coords.longitude,
          currentLocation.coords.latitude,
        ],
        destination: favorites[favorite].address.geometry.coordinates,
      });
    }
  };

  const screenHeight = Dimensions.get('window').height;
  const viewHeight = 0.5 * screenHeight;

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
            className="px-8 py-8 bg-background rounded-b-[70]"
          >
            <View>
              <View className="my-6 flex flex-row justify-between">
                <Header>Neue Route</Header>
                <IconButton
                  onPress={switchOriginDestination}
                  buttonType="accentOutline"
                  disabled={origin === undefined && destination === undefined}
                  iconName="Start und Ziel tauschen"
                  icon={
                    <SwitchArrow
                      fill={themes.external[`--accent`]}
                      width={30}
                      height={30}
                    />
                  }
                />
              </View>

              <View className="flex flex-row items-center pb-8">
                <Location
                  width={30}
                  height={30}
                  fill={themes.external[`--${theme}-mode-icon-button`]}
                />
                <InputButton
                  classes="ml-4 flex-1"
                  onPress={() => {
                    router.push('/home/start');
                  }}
                >
                  {startValue}
                </InputButton>
              </View>
              <View className="flex flex-row items-center pb-8">
                <CurrentLocationIcon
                  width={35}
                  height={35}
                  fill={themes.external[`--accent`]}
                />
                <InputButton
                  classes="ml-3 flex-1"
                  onPress={() => {
                    // @ts-ignore
                    router.push('/home/destination');
                  }}
                >
                  {destinationValue}
                </InputButton>
              </View>
              <ScrollView
                className="my-8 rounded-full"
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                <View className="flex flex-row">
                  <Chip
                    onPress={() => {
                      startNavigationFromFavorite(0);
                    }}
                  >
                    {favorites[0].title}
                  </Chip>
                  <Chip
                    onPress={() => {
                      startNavigationFromFavorite(1);
                    }}
                  >
                    {favorites[1].title}
                  </Chip>
                  <Chip
                    onPress={() => {
                      startNavigationFromFavorite(2);
                    }}
                  >
                    {favorites[2].title}
                  </Chip>
                </View>
              </ScrollView>
            </View>
          </View>
        </ScrollView>

        <View className="mx-5 mb-8">
          <Button
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
