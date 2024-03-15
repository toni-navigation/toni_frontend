import { Audio } from 'expo-av';
import { Pedometer } from 'expo-sensors';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import Song from '@/assets/Testtrack.mp3';
import { Button } from '@/components/atoms/Button';
import { getCalibrationValue } from '@/functions/functions';
import {
  useCurrentLocation,
  usePedometerAvailable,
  useStartSound,
  useStopSound,
} from '@/functions/mutations';
import { useUserStore } from '@/store/useUserStore';
import stylings from '@/stylings';
import { CurrentLocationType } from '@/types/Types';

const STOP_CALIBRATION_COUNT = 30;

export function Calibration() {
  const { calibration, actions } = useUserStore();
  const [steps, setSteps] = useState(0);

  const pedometerSubscription = useRef<Pedometer.Subscription>();
  const audioSound = useRef<Audio.Sound>();

  const currentLocationMutation = useCurrentLocation();
  const pedometerAvailableMutation = usePedometerAvailable();
  const startSoundMutation = useStartSound();
  const stopSoundMutation = useStopSound();

  const stopPedometer = async () => {
    pedometerSubscription.current?.remove();
    pedometerSubscription.current = undefined;

    if (audioSound.current) {
      await stopSoundMutation.mutateAsync(audioSound.current);
      audioSound.current = undefined;
    }
  };

  const handlePedometerUpdate = async (
    start: CurrentLocationType,
    result: Pedometer.PedometerResult
  ) => {
    setSteps(result.steps);

    if (result.steps >= STOP_CALIBRATION_COUNT) {
      await stopPedometer();
      const currentPositionData = await currentLocationMutation.mutateAsync();

      actions.addCalibration(start, currentPositionData, result.steps);
    }
  };

  const startPedometer = async () => {
    setSteps(0);
    const sound = await startSoundMutation.mutateAsync(Song);
    const currentPositionData = await currentLocationMutation.mutateAsync();
    const pedometerAvailable = await pedometerAvailableMutation.mutateAsync();

    if (pedometerAvailable) {
      pedometerSubscription.current = Pedometer.watchStepCount((result) =>
        handlePedometerUpdate(currentPositionData, result)
      );
      audioSound.current = sound;
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
      {pedometerSubscription.current && audioSound.current ? (
        <Button buttonType="secondary" onPress={stopPedometer}>
          Abbrechen
        </Button>
      ) : (
        <Button
          buttonType={
            currentLocationMutation.isPending ||
            pedometerAvailableMutation.isPending ||
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
        pedometerAvailableMutation.isPending ||
        startSoundMutation.isPending) && (
        <ActivityIndicator
          className="mt-4 h-[100px]"
          size="large"
          color={stylings.colors['primary-color-light']}
        />
      )}
      {/* {currentLocationMutation.isError && <Error error={locationError} />} */}
      {/* {pedometerMutation.isError && <Error error={pedometerError} />} */}
      {/* {startSoundMutation.isError && <Error error={soundError} />} */}
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
