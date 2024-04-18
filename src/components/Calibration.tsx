import { Audio } from 'expo-av';
import { Pedometer } from 'expo-sensors';
import * as Speech from 'expo-speech';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import Song from '@/assets/Testtrack.mp3';
import { Button } from '@/components/atoms/Button';
import { getCalibrationValue } from '@/functions/getCalibrationValue';
import { getDistanceInMeter } from '@/functions/getDistanceInMeter';
import { useCurrentLocation } from '@/mutations/useCurrentLocation';
import { usePedometerAvailable } from '@/mutations/usePedometerAvailable';
import { useStartSound } from '@/mutations/useStartSound';
import { useStopSound } from '@/mutations/useStopSound';
import { useCalibrationStore } from '@/store/useCalibrationStore';
import stylings from '@/stylings';
import { CurrentLocationType } from '@/types/Types';

const STOP_CALIBRATION_COUNT = 30;

export function Calibration() {
  const { addCalibration } = useCalibrationStore((state) => state.actions);
  const calibration = useCalibrationStore((state) => state.calibration);
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
      Speech.speak(
        'Kalibrierung abgeschlossen. Warte bis zum nächsten Audiosignal, wir berechnen deinen Umrechnungsfaktor'
      );
      await stopPedometer();
      const currentPositionData = await currentLocationMutation.mutateAsync();

      addCalibration(start, currentPositionData, result.steps);
      const distanceInMeter = getDistanceInMeter(start, currentPositionData);
      if (!distanceInMeter) {
        Speech.speak(
          `Es ist ein Fehler aufgetreten, bitte versuche es erneut oder fahre ohne Kalibrierung fort.`
        );

        return;
      }
      Speech.speak(
        `Du bist ${result.steps} Schritte und ${distanceInMeter.toFixed(2)} Meter gegangen. Der Umrechnungsfaktor beträgt ${(distanceInMeter / result.steps).toFixed(2)}. Du kannst nun mit dem nächsten Schritt fortfahren.`
      );
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
              : 'primary'
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
