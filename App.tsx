import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { debounce } from 'lodash';
import { ValhallaProps } from './types/Valhalla-Types';
import { FeatureProps, PointsProps } from './types/Nominatim-Types';
import { CalibrateProps, LocationType } from './types/Types';
import {
  getCurrentPosition,
  suggestionHelper,
  suggestionsHelper,
} from './src/functions/functions';
import {
  fetchReverseDataHandler,
  fetchTripHandler,
} from './src/functions/fetch';
import Calibration from './src/pages/Calibration';
import Destination from './src/pages/Destination';

import Suggestions from './src/Suggestions';
import Trip from './src/pages/Trip';

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     backgroundColor: '#fff',
//     color: '#000',
//     paddingLeft: 20,
//     paddingRight: 20,
//     // alignItems: 'center',
//     // justifyContent: 'center',
//   },
//   headline: {
//     fontSize: 40,
//     fontWeight: 'bold',
//   },
//   subheadline: {
//     fontSize: 34,
//   },
// });
const INITIAL_POINTS: PointsProps = {
  start: {
    query: '',
    location: null,
  },
  destination: {
    query: '',
    location: null,
    suggestions: null,
  },
};
export default function App() {
  const [currentLocation, setCurrentLocation] = useState<any>();
  const [trip, setTrip] = useState<ValhallaProps>();
  const [points, setPoints] = useState<PointsProps>(INITIAL_POINTS);
  const [calibration, setCalibration] = useState<CalibrateProps>({
    start: null,
    end: null,
    meters: null,
    factor: null,
  });
  const [currentPage, setCurrentPage] = useState<number>(0);
  // const [location, setLocation] = useState<any>(null);
  // const [errorMsg, setErrorMsg] = useState<any>(null);

  const suggestionsHandler = async (query: string) => {
    const newPoints = await suggestionsHelper(query, points);
    setPoints(newPoints);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(debounce(suggestionsHandler, 500), []);

  const callTrip = async (newPoints: PointsProps) => {
    const startAndDestination: LocationType[] = [
      newPoints.start.location,
      newPoints.destination.location,
    ];

    const newTrip = await fetchTripHandler(startAndDestination);
    setTrip(newTrip);
  };

  const inputChangeHandler = (value: string) => {
    const newPoints = { ...points };
    newPoints.destination.query = value;
    setPoints(newPoints);
    debounceFn(value);
  };
  const nextPageHandler = () => {
    setCurrentPage((prevState) => prevState + 1);
  };
  const locationSuggestionClickHandler = async (
    locationSuggestion: FeatureProps
  ) => {
    nextPageHandler();
    const newPoints = suggestionHelper(locationSuggestion, points);
    const start = {
      lat: currentLocation.coords.latitude,
      lon: currentLocation.coords.longitude,
    };
    const reverseData = await fetchReverseDataHandler(start);
    if (reverseData?.features[0].properties.geocoding.label) {
      newPoints.start.query =
        reverseData.features[0].properties.geocoding.label;
    }
    newPoints.start.location = start;

    if (points.destination.location !== null) {
      await callTrip(newPoints);
    }
    setPoints(newPoints);
  };

  useEffect(() => {
    (async () => {
      const position = await getCurrentPosition();
      setCurrentLocation(position);
    })();
  }, []);

  const calibrationHandler = async () => {};

  const showTripHandler = () => {
    if (currentLocation === null) {
      return <Text>Error bei der Standortermittlung</Text>;
    }
    if (trip === undefined) {
      return <Text>Loading</Text>;
    }
    if (currentLocation === undefined) {
      return <Text>Loading</Text>;
    }
    return (
      <View>
        {trip.trip.legs[0].maneuvers.map((maneuver) => (
          <Trip
            key={maneuver.begin_shape_index + maneuver.end_shape_index}
            maneuver={maneuver}
            factor={calibration.factor}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView className="">
      <View className="p-5 h-screen pb-20 relative">
        {currentLocation && (
          <Text>
            {currentLocation.coords.longitude},{' '}
            {currentLocation.coords.latitude}
          </Text>
        )}
        <View className="flex-1 flex-col justify-between">
          <View className="mb-4">
            {currentPage === 0 && (
              <Calibration
                onCalibrate={calibrationHandler}
                calibration={calibration}
              />
            )}
            {currentPage === 1 && (
              <View>
                <Destination
                  query={points.destination.query}
                  onDestinationChange={inputChangeHandler}
                />
                {points.destination.suggestions && (
                  <Suggestions
                    suggestions={points.destination.suggestions}
                    onLocationSuggestionClick={locationSuggestionClickHandler}
                  />
                )}
              </View>
            )}
            {currentPage === 2 && showTripHandler()}
          </View>

          {currentPage === 0 && (
            <View>
              <TouchableOpacity
                className="bg-green-800 hover:bg-green-950 h-20 flex justify-center font-bold py-2 px-4 rounded"
                onPress={nextPageHandler}
              >
                <Text className="text-white text-center text-lg">Weiter</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
