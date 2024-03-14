import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, Text, useColorScheme } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';

import Button from '../components/atoms/Button';
import TabBar from '../components/organisms/TabBar';
import decodePolyline from '../functions/decodePolyline';
import { distanceOfLatLon } from '../functions/functions';
import TripList from '../pages/TripList';
import TripStep from '../pages/TripStep';
import useUserStore from '../store/useUserStore';

function SecondRoute() {}

const renderScene = SceneMap({
  first: TripList,
  second: TripStep,
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
