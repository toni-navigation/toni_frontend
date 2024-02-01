import React, { useEffect } from 'react';
import MapView, { LatLng, Marker } from 'react-native-maps';
import { Text, TouchableOpacity, View } from 'react-native';
import { CalibrateProps, CurrentLocationProps } from '../../types/Types';
import PrimaryButton from '../components/PrimaryButton';

interface CalibrationProps {
  onCalibrate: () => void;
  calibration: CalibrateProps;
  onClickNext: () => void;
  currentLocation: CurrentLocationProps | null | undefined;
}

function Calibration({
  onCalibrate,
  calibration,
  onClickNext,
  currentLocation,
}: CalibrationProps) {
  // const mapRef = React.createRef<any>();
  //
  // useEffect(() => {
  //   const goToMyLocation = async () => {
  //     mapRef.current.animateCamera({
  //       center: {
  //         latitude: currentLocation?.coords.latitude,
  //         longitude: currentLocation?.coords.longitude,
  //       },
  //     });
  //   };
  //   if (currentLocation) {
  //     goToMyLocation();
  //   }
  // }, [mapRef, currentLocation]);
  let location: LatLng | undefined;
  if (
    currentLocation &&
    currentLocation.coords &&
    currentLocation.coords.latitude &&
    currentLocation.coords.longitude
  ) {
    location = {
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    };
  }
  return (
    <View>
      <Text className="text-4xl font-extrabold dark:text-white">BlndFnd</Text>

      <MapView
        className="h-36 w-full"
        region={{
          latitude: 47.811195,
          longitude: 13.033229,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {location && <Marker coordinate={location} />}
      </MapView>

      <Text className="text-3xl">Kalibrierung</Text>
      <Text className="text-lg">Gehe 30 Schritte</Text>
      <TouchableOpacity
        onPress={onCalibrate}
        className="bg-green-800 hover:bg-green-950 h-16 flex justify-center font-bold py-2 px-4 rounded"
        disabled={!currentLocation}
      >
        <Text className="text-white text-center text-lg">
          {calibration.start ? 'Ende' : 'Start'}
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
      <View>
        <PrimaryButton onPress={onClickNext} disabled={!!currentLocation}>
          Weiter
        </PrimaryButton>
      </View>
    </View>
  );
}

export default Calibration;
