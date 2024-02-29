import React, { useState } from 'react';
import { Audio } from 'expo-av';
import { Pedometer } from 'expo-sensors';
import { ActivityIndicator, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import useUserStore from '../../store/useUserStore';
import { CurrentLocationType } from '../../types/Types';
import { useCurrentLocation } from '../functions/mutations';
import Button from '../components/atoms/Button';
import { getCalibrationValue } from '../functions/functions';
import Song from '../../assets/Testtrack.mp3';

function Calibration() {
  const { calibration, actions } = useUserStore();
  const [steps, setSteps] = useState(0);

  const currentLocationMutation = useCurrentLocation();
  let subscription: Pedometer.Subscription | null = null;

  const stopCalibrationIndex = 30;
  const stopPedometer = async (
    start: CurrentLocationType,
    pedometerSteps: number,
    sound: Audio.Sound
  ) => {
    if (subscription) {
      subscription.remove();
      await sound.unloadAsync();
      const currentPositionData = await currentLocationMutation.mutateAsync();
      actions.setCalibration(start, currentPositionData, pedometerSteps);
    }
  };
  const handlePedometerUpdate = async (
    start: CurrentLocationType,
    result: Pedometer.PedometerResult,
    sound: Audio.Sound
  ) => {
    setSteps(result.steps);
    if (result.steps >= stopCalibrationIndex) {
      // console.log(
      //   '15 Schritte erreicht',
      //   currentLocation?.coords.latitude,
      //   currentLocation?.coords.longitude
      // );
      await stopPedometer(start, result.steps, sound);
    }
  };
  const startPedometer = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    if (isAvailable) {
      setSteps(0);
      const currentPositionData = await currentLocationMutation.mutateAsync();
      const { sound } = await Audio.Sound.createAsync(Song);
      await sound.playAsync();

      subscription = Pedometer.watchStepCount((result) =>
        handlePedometerUpdate(currentPositionData, result, sound)
      );
    }
  };

  return (
    <View>
      <Button buttonType="secondary" onPress={startPedometer}>
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
      <Text>Meter: {getCalibrationValue(calibration.meters)}</Text>
      <Text>Umrechnungsfaktor: {getCalibrationValue(calibration.factors)}</Text>
    </View>
  );
}

export default Calibration;
