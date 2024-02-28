import React from 'react';
import { Button, Text, useWindowDimensions, View } from 'react-native';
import TripList from '../src/pages/TripList';
import useUserStore from '../store/useUserStore';
import { SceneMap, TabView } from 'react-native-tab-view';
import TripStep from '../src/pages/TripStep';
import decodePolyline from '../src/functions/decodePolyline';
import { distanceOfLatLon } from '../src/functions/functions';

const FirstRoute = () => {
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
    //console.log(decodedShape);
  }
  return (
    trip &&
    currentLocation &&
    trip.trip &&
    trip.trip.legs[0].maneuvers.map((maneuver) => (
      <TripStep
        key={maneuver.begin_shape_index + maneuver.end_shape_index}
        maneuver={maneuver}
        factor={calibration.factor}
        decodedShape={decodedShape}
        currentLocation={currentLocation}
      />
    ))
  );
};

const SecondRoute = () => {
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
    //console.log(decodedShape);
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
    console.log(distanceChange);

    if (distanceChange < 5) {
      setCurrentManeuver((prevState) => prevState + 1);
    }
  }

  return (
    trip &&
    currentLocation &&
    trip.trip && (
      <TripStep
        key={
          trip.trip.legs[0].maneuvers[currentManeuver].begin_shape_index +
          trip.trip.legs[0].maneuvers[currentManeuver].end_shape_index
        }
        maneuver={trip.trip.legs[0].maneuvers[currentManeuver]}
        factor={calibration.factor}
        decodedShape={decodedShape!}
        currentLocation={currentLocation}
      />
    )
  );
};

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});
export default function TripPage() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);
  const { currentLocation } = useUserStore();

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      //style={}
    />
  );
}
