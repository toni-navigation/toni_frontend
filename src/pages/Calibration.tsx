import React, { useState } from 'react';
import { Audio } from 'expo-av';
import { Pedometer } from 'expo-sensors';
import MapView, { Marker } from 'react-native-maps';
import { ActivityIndicator, Text, View } from 'react-native';
import useUserStore from '../../store/useUserStore';
import { CurrentLocationType } from '../../types/Types';
import {
  useCurrentLocation,
  usePedometer,
  useStartSound,
  useStopSound,
} from '../functions/mutations';
import Button from '../components/atoms/Button';
import { getCalibrationValue } from '../functions/functions';
import Song from '../../assets/Testtrack.mp3';
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
  const pedometerMutation = usePedometer();
  const startSoundMutation = useStartSound();
  const stopSoundMutation = useStopSound();

  const stopCalibrationIndex = 30;

  const cancelCalibration = async () => {
    if (sub?.subscription) {
      sub.subscription.remove();
    }
    if (sub?.sound) {
      await stopSoundMutation.mutateAsync(sub.sound);
    }
    setSub(null);
    setSteps(0);
  };
  const stopPedometer = async (
    start: CurrentLocationType,
    pedometerSteps: number,
    subscription: Pedometer.Subscription | null,
    sound: Audio.Sound
  ) => {
    if (subscription) {
      subscription.remove();
      await stopSoundMutation.mutateAsync(sound);
      const currentPositionData = await currentLocationMutation.mutateAsync();
      actions.setCalibration(start, currentPositionData, pedometerSteps);
      setSub(null);
      setSteps(0);
    }
  };
  const handlePedometerUpdate = async (
    start: CurrentLocationType,
    result: Pedometer.PedometerResult,
    subscription: Pedometer.Subscription | null,
    sound: Audio.Sound
  ) => {
    setSteps(result.steps);
    if (result.steps >= stopCalibrationIndex) {
      await stopPedometer(start, result.steps, subscription, sound);
    }
  };
  const startPedometer = async () => {
    const sound = await startSoundMutation.mutateAsync(Song);
    const currentPositionData = await currentLocationMutation.mutateAsync();
    const pedometerCallback = await pedometerMutation.mutateAsync();
    if (pedometerCallback) {
      const subscription = pedometerCallback((result) =>
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
  // const locationError =
  //   'Beim Berechnen des Standorts ist leider etwas schiefgelaufen, bitte versuche es nocheinmal';
  // const pedometerError =
  //   'Es ist leider etwas schiefgelaufen, bitte versuche es nocheinmal';
  // const soundError =
  //   'SoundError: Es ist leider etwas schiefgelaufen, bitte versuche es nocheinmal';
  return (
    <View>
      {sub ? (
        <Button buttonType="secondary" onPress={cancelCalibration}>
          Abbrechen
        </Button>
      ) : (
        <Button
          buttonType={
            currentLocationMutation.isPending ||
            pedometerMutation.isPending ||
            startSoundMutation.isPending
              ? 'disabled'
              : 'secondary'
          }
          onPress={startPedometer}
        >
          Start Kalibrierung
        </Button>
      )}
      {(currentLocationMutation.isPending ||
        pedometerMutation.isPending ||
        startSoundMutation.isPending) && (
        <ActivityIndicator
          className="mt-4 h-[100px]"
          size="large"
          color={stylings.colors['primary-color-light']}
        />
      )}
      {/*{currentLocationMutation.isError && <Error error={locationError} />}*/}
      {/*{pedometerMutation.isError && <Error error={pedometerError} />}*/}
      {/*{startSoundMutation.isError && <Error error={soundError} />}*/}
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

      <Text className="text-lg mt-4">Schritte: {steps}</Text>
      <Text>Meter: {getCalibrationValue(calibration.meters)}</Text>
      <Text>Umrechnungsfaktor: {getCalibrationValue(calibration.factors)}</Text>
    </View>
  );
}

export default Calibration;
