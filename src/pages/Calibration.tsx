import React, { useState } from 'react';
import { Pedometer } from 'expo-sensors';
import { ActivityIndicator, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import useUserStore from '../../store/useUserStore';
import { CurrentLocationType } from '../../types/Types';
import { useCurrentLocation } from '../functions/mutations';
import Button from '../components/atoms/Button';

function Calibration() {
  const { calibration, actions } = useUserStore();
  const [steps, setSteps] = useState(0);

  const currentLocationMutation = useCurrentLocation();
  let subscription: Pedometer.Subscription | null = null;

  const stopCalibrationIndex = 30;
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
      subscription.remove();
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
      actions.setResetCalibration();
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
      {calibration.meters !== undefined && calibration.meters !== null && (
        <Text>{calibration.meters} Meter</Text>
      )}
      {calibration.factor && (
        <Text>Umrechnungsfaktor: {calibration.factor}</Text>
      )}
    </View>
  );
}

export default Calibration;
