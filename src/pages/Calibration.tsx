import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import useUserStore from '../../store/useUserStore';

function Calibration() {
  const { currentLocation, calibration, actions } = useUserStore();
  const calibrationHandler = () => {
    actions.setCalibration(currentLocation);
  };
  return (
    <View>
      <Text className="text-3xl">Kalibrierung</Text>
      <Text className="text-lg">Gehe 30 Schritte</Text>
      <TouchableOpacity
        onPress={calibrationHandler}
        className="bg-green-800 hover:bg-green-950 h-16 flex justify-center font-bold py-2 px-4 rounded"
        disabled={!currentLocation}
      >
        <Text className="text-white text-center text-lg">
          {calibration.isStart ? 'Start' : 'Stop'}
        </Text>
      </TouchableOpacity>
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
