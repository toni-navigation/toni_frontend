import { Audio } from 'expo-av';
import { Pedometer } from 'expo-sensors';
import * as Speech from 'expo-speech';
import React, { useRef, useState } from 'react';
import { Text, View } from 'react-native';
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
import { CurrentLocationType } from '@/types/Types';

const STOP_CALIBRATION_COUNT = 30;
export const SPEECH_CONFIG = {
  language: 'de',
};
export function Calibration() {
  const { addCalibration } = useCalibrationStore((state) => state.actions);
  const calibration = useCalibrationStore((state) => state.calibration);
  const [steps, setSteps] = useState(0);

  const pedometerSubscription = useRef<Pedometer.Subscription | null>();
  const audioSound = useRef<Audio.Sound>();
  const fallback = useRef<CurrentLocationType>();

  const currentLocationMutation = useCurrentLocation();
  const pedometerAvailableMutation = usePedometerAvailable();
  const startSoundMutation = useStartSound();
  const stopSoundMutation = useStopSound();
  const speakAndWait = (text: string) =>
    new Promise((resolve: any) => {
      Speech.speak(text, {
        ...SPEECH_CONFIG,
        onDone: resolve,
      });
    });
  const stopPedometer = async () => {
    pedometerSubscription.current?.remove();
    pedometerSubscription.current = undefined;

    if (audioSound.current) {
      await stopSoundMutation.mutateAsync(audioSound.current);
      audioSound.current = undefined;
    }
  };

  const fallbackStop = async (_start?: CurrentLocationType, _steps = 30) => {
    await stopPedometer();
    await speakAndWait(
      'Kalibrierung abgeschlossen. Warte bis zum nächsten Audiosignal, wir berechnen deinen Umrechnungsfaktor'
    );
    const currentPositionData = await currentLocationMutation.mutateAsync();
    addCalibration(fallback.current || _start, currentPositionData, _steps);
    const distanceInMeter = getDistanceInMeter(
      fallback.current || _start,
      currentPositionData
    );
    if (!distanceInMeter) {
      await speakAndWait(
        `Es ist ein Fehler aufgetreten, bitte versuche es erneut oder fahre ohne Kalibrierung fort.`
      );

      return;
    }
    await speakAndWait(
      `Du bist ${_steps} Schritte und ${distanceInMeter.toFixed(2)} Meter gegangen. Der Umrechnungsfaktor beträgt ${(distanceInMeter / _steps).toFixed(2)}. Du kannst nun mit dem nächsten Schritt fortfahren.`
    );

    if (fallback.current) {
      fallback.current = undefined;
    }
  };

  const handlePedometerUpdate = async (
    start: CurrentLocationType,
    result: Pedometer.PedometerResult
  ) => {
    setSteps(result.steps);

    if (result.steps >= STOP_CALIBRATION_COUNT) {
      await fallbackStop(start, result.steps);
    }
  };

  const startPedometer = async () => {
    setSteps(0);
    await speakAndWait(
      'Kalibrierung gestartet. Warte einen Moment bis die Musik startet.'
    );
    const pedometerAvailable = await pedometerAvailableMutation.mutateAsync();
    const currentPositionData = await currentLocationMutation.mutateAsync();
    if (!pedometerAvailable) {
      await speakAndWait('Gehe 30 Schritte und klicke dann auf Stopp.');
    }
    const sound = await startSoundMutation.mutateAsync(Song);
    if (!sound) {
      await speakAndWait('Die Musik kann leider nicht abgespielt werden.');
    }

    if (pedometerAvailable) {
      pedometerSubscription.current = Pedometer.watchStepCount((result) =>
        handlePedometerUpdate(currentPositionData, result)
      );
    } else {
      fallback.current = currentPositionData;
    }
    audioSound.current = sound;
  };

  const buttonOutput = () => {
    if (pedometerSubscription.current && audioSound.current) {
      return (
        <Button buttonType="secondary" onPress={stopPedometer}>
          Abbrechen
        </Button>
      );
    }
    // console.log(
    //   pedometerSubscription.current,
    //   audioSound.current,
    //   fallback.current
    // );
    if (
      pedometerSubscription.current === undefined &&
      audioSound.current &&
      fallback.current
    ) {
      return (
        <Button buttonType="secondary" onPress={fallbackStop}>
          Stopp
        </Button>
      );
    }

    return (
      <Button buttonType="secondary" onPress={startPedometer}>
        Start Kalibrierung
      </Button>
    );
  };

  // const locationError =
  //   'Beim Berechnen des Standorts ist leider etwas schiefgelaufen, bitte versuche es nocheinmal';
  // const pedometerError =
  //   'Es ist leider etwas schiefgelaufen, bitte versuche es nocheinmal';
  // const soundError =
  //   'SoundError: Es ist leider etwas schiefgelaufen, bitte versuche es nocheinmal';
  return (
    <View>
      {buttonOutput()}
      {/* {(currentLocationMutation.isPending || */}
      {/*  pedometerAvailableMutation.isPending || */}
      {/*  startSoundMutation.isPending) && ( */}
      {/*  <ActivityIndicator */}
      {/*    className="mt-4 h-[100px]" */}
      {/*    size="large" */}
      {/*    color={stylings.colors['primary-color-light']} */}
      {/*  /> */}
      {/* )} */}
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
        showsUserLocation
        followsUserLocation
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
