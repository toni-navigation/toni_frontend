import React from 'react';
import { SceneMap, TabView } from 'react-native-tab-view';
import { router } from 'expo-router';
import { SafeAreaView, ScrollView, Text, useColorScheme } from 'react-native';
import useUserStore from '../store/useUserStore';
import TripStep from '../src/pages/TripStep';
import decodePolyline from '../src/functions/decodePolyline';
import { distanceOfLatLon } from '../src/functions/functions';
import TabBar from '../src/components/organisms/TabBar';
import Button from '../src/components/atoms/Button';

const backToHomeHandler = async () => {
  router.back();
};

function FirstRoute() {
  const { trip, calibration, currentLocation } = useUserStore();
  let decodedShape: {
    result: number;
    lng: number;
    byte: null | number;
    shift: number;
    coordinates: [number, number][];
    index: number;
    factor: number;
    lat: number;
  };
  if (trip) {
    decodedShape = decodePolyline(trip?.trip.legs[0].shape);
    // console.log(decodedShape);
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="mx-5 my-5">
        {trip &&
          currentLocation &&
          trip.trip &&
          trip.trip.legs[0].maneuvers.map((maneuver) => (
            <TripStep
              key={maneuver.begin_shape_index + maneuver.end_shape_index}
              maneuver={maneuver}
            />
          ))}
        <Button
          disabled={false}
          onPress={backToHomeHandler}
          buttonType="primaryOutline"
        >
          <Text>Beenden</Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

function SecondRoute() {
  const { trip, calibration, currentLocation } = useUserStore();

  const [currentManeuver, setCurrentManeuver] = React.useState(0);

  let decodedShape: {
    result: number;
    lng: number;
    byte: null | number;
    shift: number;
    coordinates: [number, number][];
    index: number;
    factor: number;
    lat: number;
  };
  if (trip && currentLocation) {
    decodedShape = decodePolyline(trip?.trip.legs[0].shape);
    // console.log(decodedShape);
    const startLat =
      decodedShape.coordinates[
        trip.trip.legs[0].maneuvers[currentManeuver + 1].begin_shape_index
      ][0];
    const startLon =
      decodedShape.coordinates[
        trip.trip.legs[0].maneuvers[currentManeuver + 1].begin_shape_index
      ][1];

    const currentLat = currentLocation.coords.latitude;
    const currentLon = currentLocation.coords.longitude;

    const distanceChange =
      distanceOfLatLon(startLat, startLon, currentLat, currentLon, 'K') * 1000;

    if (distanceChange < 5) {
      setCurrentManeuver((prevState) => prevState + 1);
    }
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="mx-5 my-5">
        {trip && currentLocation && trip.trip && (
          <TripStep
            key={
              trip.trip.legs[0].maneuvers[currentManeuver].begin_shape_index +
              trip.trip.legs[0].maneuvers[currentManeuver].end_shape_index
            }
            maneuver={trip.trip.legs[0].maneuvers[currentManeuver]}
          />
        )}
        <Button
          disabled={false}
          onPress={backToHomeHandler}
          buttonType="primaryOutline"
        >
          <Text>Beenden</Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function TripPage() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Überblick' },
    { key: 'second', title: 'Aktuelles Maneuver' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      style={{ backgroundColor: 'white' }}
      renderTabBar={(props) => (
        <TabBar jumpTo={props.jumpTo} navigationState={props.navigationState} />
      )}
    />
  );
}
