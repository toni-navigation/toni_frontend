import React from 'react';
import { SceneMap, TabView } from 'react-native-tab-view';

import { TabBar } from '@/components/organisms/TabBar';
import { TripList } from '@/pages/TripList';
import { TripStep } from '@/pages/TripStep';

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
      renderTabBar={TabBar}
    />
  );
}
