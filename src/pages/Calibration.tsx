import React, { useState } from 'react';
import { Pedometer } from 'expo-sensors';
import { Text, TouchableOpacity, View } from 'react-native';
import useUserStore from '../../store/useUserStore';
import { distanceOfLatLon } from '../functions/functions';
import { CurrentLocationType } from '../../types/Types';

function Calibration() {
  const { currentLocation, calibration, actions } = useUserStore();
  const [steps, setSteps] = useState(0);
  let subscription: Pedometer.Subscription | null = null;
  const stopPedometer = (start: CurrentLocationType) => {
    if (subscription) {
      console.log(
        'Pedometer stopped',
        currentLocation?.coords.latitude,
        currentLocation?.coords.longitude
      );
      actions.setCalibrationStop(currentLocation);
      if (start && currentLocation) {
        const distance = distanceOfLatLon(
          start.coords.latitude,
          start.coords.longitude,
          currentLocation.coords.latitude,
          currentLocation.coords.longitude,
          'K'
        );
        console.log('Distance:', distance);
      } else {
        console.log('Something went wrong');
      }
      subscription.remove();
    }
  };
  const handlePedometerUpdate = (
    result: Pedometer.PedometerResult,
    start: CurrentLocationType
  ) => {
    setSteps(result.steps);
    if (result.steps >= 30) {
      console.log(
        '15 Schritte erreicht',
        currentLocation?.coords.latitude,
        currentLocation?.coords.longitude
      );
      stopPedometer(start);
    }
  };
  const startPedometer = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    if (isAvailable) {
      console.log(
        'Pedometer is available:',
        currentLocation?.coords.latitude,
        currentLocation?.coords.longitude
      );
      actions.setCalibrationStart(currentLocation);
      subscription = Pedometer.watchStepCount((result) =>
        handlePedometerUpdate(result, currentLocation)
      );
    }
  };

  return (
    <View>
      <Text className="text-3xl">Kalibrierung</Text>
      <Text className="text-lg">Gehe 30 Schritte</Text>
      <TouchableOpacity
        onPress={startPedometer}
        className="bg-green-800 hover:bg-green-950 h-16 flex justify-center font-bold py-2 px-4 rounded"
      >
        <Text className="text-white text-center text-lg">
          Kalibrierung starten
        </Text>
      </TouchableOpacity>
      <Text className="text-lg">Schritte: {steps}</Text>
      {calibration.start && (
        <Text>
          Start: {calibration.start.lat}, {calibration.start.lon}
        </Text>
      )}
      {calibration.end && (
        <Text>
          Ende: {calibration.end.lat}, {calibration.end.lon}
        </Text>
      )}
      {/*{calibration.meters && calibration.meters !== 0 && (*/}
      {/*  <View>*/}
      {/*    <Text>30 Schritte waren {calibration.meters} Meter</Text>*/}
      {/*    <Text>*/}
      {/*      1 Schritt sind umgerechnnet {calibration.meters / 30} Meter. Die*/}
      {/*      Meteranzahlen werden anhand diesen Wertes umgerechnet*/}
      {/*    </Text>*/}
      {/*  </View>*/}
      {/*)}*/}
      <View>
        <Text>{JSON.stringify(calibration)}</Text>
      </View>
    </View>
  );
}

export default Calibration;
