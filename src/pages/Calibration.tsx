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
import colors from 'tailwindcss/colors';
import stylings from '../../stylings';

interface CalibrationProps {
  subscription: Pedometer.Subscription | null;
  sound: Audio.Sound | null;
}

function Calibration() {
  const { calibration, actions } = useUserStore();
  const [steps, setSteps] = useState(0);
  const [sub, setSub] = useState<CalibrationProps | null>(null);

  const currentLocationMutation = useCurrentLocation();

  const stopCalibrationIndex = 30;

  const cancelCalibration = async () => {
    if (sub?.subscription && sub.sound) {
      sub.subscription.remove();
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: false,
      });
      await sub.sound.unloadAsync();
      setSub(null);
    }
  };
  const stopPedometer = async (
    start: CurrentLocationType,
    pedometerSteps: number,
    subscription: Pedometer.Subscription | null,
    sound: Audio.Sound | null
  ) => {
    if (subscription) {
      subscription.remove();
      await sound?.unloadAsync();
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: false,
      });
      const currentPositionData = await currentLocationMutation.mutateAsync();
      actions.setCalibration(start, currentPositionData, pedometerSteps);
      setSub(null);
    }
  };
  const handlePedometerUpdate = async (
    start: CurrentLocationType,
    result: Pedometer.PedometerResult,
    subscription: Pedometer.Subscription | null,
    sound: Audio.Sound | null
  ) => {
    setSteps(result.steps);
    if (result.steps >= stopCalibrationIndex) {
      await stopPedometer(start, result.steps, subscription, sound);
    }
  };
  const startPedometer = async () => {
    let subscription: Pedometer.Subscription | null = null;
    let sound: Audio.Sound | null = null;
    const isAvailable = await Pedometer.isAvailableAsync();
    if (isAvailable) {
      setSteps(0);
      const currentPositionData = await currentLocationMutation.mutateAsync();
      sound = new Audio.Sound(); // Initialize the sound object
      await sound.loadAsync(Song); // Load the audio file
      await sound.playAsync(); // Start playing the audio
      // sound = await Audio.Sound.createAsync(Song, {});
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
      });
      if (sound) {
        await sound.playAsync();
      }

      subscription = Pedometer.watchStepCount((result) =>
        handlePedometerUpdate(currentPositionData, result, subscription, sound)
      );
      setSub((prevState) => {
        if (prevState) {
          return {
            ...prevState,
            subscription,
            sound,
          };
        }
        return {
          subscription,
          sound,
        };
      });
    }
  };

  return (
    <View>
      {sub ? (
        <Button buttonType="secondary" onPress={cancelCalibration}>
          Abbrechen
        </Button>
      ) : (
        <Button buttonType="secondary" onPress={startPedometer}>
          Start Calibration
        </Button>
      )}
      {currentLocationMutation.isPending && (
        <ActivityIndicator
          className="mt-4 h-[100px]"
          size="large"
          color={stylings.colors['primary-color-light']}
        />
      )}

      {/*<MapView*/}
      {/*  className="h-36 w-full"*/}
      {/*  region={{*/}
      {/*    latitude: 47.811195,*/}
      {/*    longitude: 13.033229,*/}
      {/*    latitudeDelta: 0.0922,*/}
      {/*    longitudeDelta: 0.0421,*/}
      {/*  }}*/}
      {/*>*/}
      {/*  {calibration.start &&*/}
      {/*    calibration.start.lat &&*/}
      {/*    calibration.start.lon && (*/}
      {/*      <Marker*/}
      {/*        coordinate={{*/}
      {/*          latitude: calibration.start.lat,*/}
      {/*          longitude: calibration.start.lon,*/}
      {/*        }}*/}
      {/*      />*/}
      {/*    )}*/}
      {/*  {calibration.end && calibration.end.lat && calibration.end.lon && (*/}
      {/*    <Marker*/}
      {/*      coordinate={{*/}
      {/*        latitude: calibration.end.lat,*/}
      {/*        longitude: calibration.end.lon,*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*</MapView>*/}

      <Text className="text-lg mt-4">Schritte: {steps}</Text>
      <Text>Meter: {getCalibrationValue(calibration.meters)}</Text>
      <Text>Umrechnungsfaktor: {getCalibrationValue(calibration.factors)}</Text>
    </View>
  );
}

export default Calibration;
