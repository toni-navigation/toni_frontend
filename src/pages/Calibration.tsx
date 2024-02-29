import React, { useState } from 'react';
import { Pedometer } from 'expo-sensors';
import { ActivityIndicator, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import useUserStore from '../../store/useUserStore';
import { CurrentLocationType } from '../../types/Types';
import { useCurrentLocation } from '../functions/mutations';
import Button from '../components/atoms/Button';
import { calculateMedian } from '../functions/functions';

function Calibration() {
  const { calibration, actions } = useUserStore();
  const [steps, setSteps] = useState(0);

  const currentLocationMutation = useCurrentLocation();
  let subscription: Pedometer.Subscription | null = null;

  const stopCalibrationIndex = 10;
  const stopPedometer = async (
    start: CurrentLocationType,
    pedometerSteps: number
  ) => {
    if (subscription) {
      // console.log(
      //   'Pedometer stopped',
      //   currentLocation?.coords.latitude,
      //   currentLocation?.coords.longitude
      // );
      //const position = await getCurrentPosition();
      subscription.remove();

      const currentPositionData = await currentLocationMutation.mutateAsync();
      actions.setCalibration(start, currentPositionData, pedometerSteps);
      // if (start && currentLocation) {
      //   const distance = distanceOfLatLon(
      //     start.coords.latitude,
      //     start.coords.longitude,
      //     currentLocation.coords.latitude,
      //     currentLocation.coords.longitude,
      //     'K'
      //   );
      //   console.log('Distance:', distance);
      // } else {
      //   console.log('Something went wrong');
      // }
    }
  };
  const handlePedometerUpdate = async (
    start: CurrentLocationType,
    result: Pedometer.PedometerResult
  ) => {
    setSteps(result.steps);
    if (result.steps >= stopCalibrationIndex) {
      // console.log(
      //   '15 Schritte erreicht',
      //   currentLocation?.coords.latitude,
      //   currentLocation?.coords.longitude
      // );
      await stopPedometer(start, result.steps);
    }
  };
  const startPedometer = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    if (isAvailable) {
      setSteps(0);
      // console.log(
      //   'Pedometer is available:',
      //   currentLocation?.coords.latitude,
      //   currentLocation?.coords.longitude
      // );
      //actions.setCalibrationStart(currentLocation);
      const currentPositionData = await currentLocationMutation.mutateAsync();

      //const position = await getCurrentPosition();

      subscription = Pedometer.watchStepCount((result) =>
        handlePedometerUpdate(currentPositionData, result)
      );
    }
  };

  const outputFactor = () => {
    if (calibration.factors.length === 0) {
      return <Text>Umrechnungsfaktor: 0</Text>;
    }
    if (calibration.factors.length > 5) {
      return (
        <Text>Umrechnungsfaktor: {calculateMedian(calibration.factors)}</Text>
      );
    }
    return (
      <Text>
        Umrechnungsfaktor: {calibration.factors[calibration.factors.length - 1]}
      </Text>
    );
  };
  const outputMeters = () => {
    if (calibration.meters.length === 0) {
      return <Text>Meter: 0</Text>;
    }
    if (calibration.meters.length > 5) {
      return <Text>Meter: {calculateMedian(calibration.meters)}</Text>;
    }
    return (
      <Text>Meter: {calibration.meters[calibration.meters.length - 1]}</Text>
    );
  };
  return (
    <View>
      <Button buttonType={'secondary'} onPress={startPedometer}>
        <Text className="text-white text-center text-lg">
          Kalibrierung starten
        </Text>
      </Button>
      {currentLocationMutation.isPending && <ActivityIndicator />}

      <MapView
        className="h-36 w-full"
        region={{
          latitude: 47.811195,
          longitude: 13.033229,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {calibration.start &&
          calibration.start.lat &&
          calibration.start.lon && (
            <Marker
              coordinate={{
                latitude: calibration.start.lat,
                longitude: calibration.start.lon,
              }}
            />
          )}
        {calibration.end && calibration.end.lat && calibration.end.lon && (
          <Marker
            coordinate={{
              latitude: calibration.end.lat,
              longitude: calibration.end.lon,
            }}
          />
        )}
      </MapView>

      <Text className="text-lg">Schritte: {steps}</Text>
      {outputMeters()}
      {outputFactor()}
    </View>
  );
}

export default Calibration;
