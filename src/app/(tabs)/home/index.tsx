import { router } from 'expo-router';
import React, { useContext } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
import { Button } from '@/components/atoms/Button';
import { Header } from '@/components/atoms/Header';
import { IconButton } from '@/components/atoms/IconButton';
import { SwitchArrow } from '@/components/atoms/icons/SwitchArrow';
import { GeocoderAutocomplete } from '@/components/organisms/GeocoderAutocomplete';
import { PopUp } from '@/components/organisms/PopUp';
import { useCurrentLocationStore } from '@/store/useCurrentLocationStore';
import { OriginDestinationType, useTripStore } from '@/store/useTripStore';

export default function HomePage() {
  const { changeOrigin, changeDestination, switchOriginDestination } =
    useTripStore((state) => state.actions);
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
    router.push({ pathname: `/home/trip`, params });
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

  // const bbox = currentLocation && getBbox(currentLocation);
  // const bboxCoordinates = bbox && [
  //   { latitude: bbox[1], longitude: bbox[0] }, // southwest corner
  //   { latitude: bbox[1], longitude: bbox[2] }, // northwest corner
  //   { latitude: bbox[3], longitude: bbox[2] }, // northeast corner
  //   { latitude: bbox[3], longitude: bbox[0] }, // southeast corner
  //   { latitude: bbox[1], longitude: bbox[0] }, // closing the polygon - southwest corner
  // ];

  // if (!skipped && calibration.factors.length === 0) {
  //   return <Calibration isFromIntro />;
  // }

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

      <ScrollView className="px-8 my-8" keyboardShouldPersistTaps="always">
        <Header classes="text-textColor">Hallo</Header>
        <GeocoderAutocomplete
          value={origin}
          placeholder="Start eingeben"
          label="Start"
          onChange={(value) => changeOrigin(value)}
        />
        <View className="pt-8" />
        <IconButton
          onPress={switchOriginDestination}
          buttonType="primary"
          disabled={origin === undefined && destination === undefined}
          icon={
            <SwitchArrow
              fill={themes.external[`--${theme}-mode-icon-button`]}
              width={35}
              height={35}
            />
          }
        />
        <GeocoderAutocomplete
          value={destination}
          placeholder="Ziel eingeben"
          label="Ziel"
          onChange={(value) => changeDestination(value)}
        />
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
    </SafeAreaView>
  );
}
