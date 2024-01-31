import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Calibration from './pages/Calibration';
import Destination from './pages/Destination';
import Suggestions from './components/Suggestions';
import {
  CalibrateProps,
  CurrentLocationProps,
  PointsProps,
} from '../types/Types';
import { ValhallaProps } from '../types/Valhalla-Types';
import Trip from './pages/Trip';
import { FeatureProps } from '../types/Nominatim-Types';

interface PagesProps {
  currentPage: number;
  onCalibrate: () => void;
  calibration: CalibrateProps;
  onClickNext: () => void;
  points: PointsProps;
  onDestinationChange: (destination: string) => void;
  onLocationSuggestionClick: (
    locationSuggestion: FeatureProps
  ) => Promise<void>;
  currentLocation: CurrentLocationProps | null | undefined;
  trip: ValhallaProps | null | undefined;
  onClickPrevious: () => void;
}
function Pages({
  currentPage,
  onCalibrate,
  calibration,
  onClickNext,
  points,
  onDestinationChange,
  onLocationSuggestionClick,
  currentLocation,
  trip,
  onClickPrevious,
}: PagesProps) {
  const showTripHandler = () => {
    if (currentLocation === null) {
      return <Text>Error bei der Standortermittlung</Text>;
    }
    if (trip === null) {
      return <Text>Error bei der Routenberechnung</Text>;
    }
    if (trip === undefined || currentLocation === undefined) {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      );
    }
    return (
      <View>
        {trip &&
          trip.trip.legs[0].maneuvers.map((maneuver) => (
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
    <View className="mb-4">
      <View>
        <Text>CurrentLocation: </Text>
        {currentLocation && (
          <Text>
            {currentLocation.coords.latitude},{' '}
            {currentLocation.coords.longitude}
          </Text>
        )}
      </View>

      {currentPage === 0 && (
        <Calibration
          onCalibrate={onCalibrate}
          calibration={calibration}
          onClickNext={onClickNext}
          currentLocation={currentLocation}
        />
      )}
      {currentPage === 1 && (
        <View>
          <Destination
            query={points.destination.query}
            onDestinationChange={onDestinationChange}
          />
          {points.destination.suggestions && (
            <Suggestions
              suggestions={points.destination.suggestions}
              onLocationSuggestionClick={onLocationSuggestionClick}
            />
          )}
          <TouchableOpacity
            onPress={onClickPrevious}
            className="bg-white h-20 flex justify-center font-bold py-2 px-4 border-green-100 rounded"
          >
            <Text>Zurück</Text>
          </TouchableOpacity>
        </View>
      )}
      {currentPage === 2 && showTripHandler()}
    </View>
  );
}

export default Pages;
