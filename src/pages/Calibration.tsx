import React, { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CalibrateProps, CalibrationProps } from '../../types/Types';

interface CalibrationProps {
  onCalibrate: () => void;
  calibration: CalibrateProps;
}

function Calibration(props: CalibrationProps) {
  const { onCalibrate, calibration } = props;
  const calibrationHandler = async () => {
    // getCurrentPosition(async function (position) {
    //   const newCalibration = calibrationHelper(position, calibration);
    //   setCalibration((prevState) => {
    //     return {
    //       ...prevState,
    //       ...newCalibration,
    //     };
    //   });
    // });
  };
  return (
    <View>
      <Text className="text-4xl font-extrabold dark:text-white">BlndFnd</Text>

      <Text className="text-3xl">Kalibrierung</Text>
      <Text className="text-lg">Gehe 30 Schritte</Text>
      <TouchableOpacity
        onPress={calibrationHandler}
        className="bg-green-800 hover:bg-green-950 h-1/2 flex justify-center font-bold py-2 px-4 rounded"
      >
        <Text className="text-white text-center text-lg">
          {calibration.start ? 'Ende' : 'Start'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Calibration;
