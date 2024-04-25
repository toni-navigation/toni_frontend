import { Audio } from 'expo-av';
import { Pedometer } from 'expo-sensors';
import * as Speech from 'expo-speech';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import Song from '@/assets/Testtrack.mp3';
import { Button } from '@/components/atoms/Button';
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
  const [steps, setSteps] = useState(0);
  const pedometerSubscription = useRef<Pedometer.Subscription | null>();
  const audioSound = useRef<Audio.Sound>();
  const fallback = useRef<CurrentLocationType>();

  const currentLocationMutation = useCurrentLocation();
  const pedometerAvailableMutation = usePedometerAvailable();
  const startSoundMutation = useStartSound(() => Speech.stop());
  const stopSoundMutation = useStopSound();

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
    Speech.speak(
      'Kalibrierung abgeschlossen. Warte bis zum nächsten Audiosignal, wir berechnen deinen Umrechnungsfaktor',
      SPEECH_CONFIG
    );
    const currentPositionData = await currentLocationMutation.mutateAsync();
    addCalibration(fallback.current || _start, currentPositionData, _steps);
    const distanceInMeter = getDistanceInMeter(
      fallback.current || _start,
      currentPositionData
    );
    if (!distanceInMeter) {
      Speech.speak(
        `Es ist ein Fehler aufgetreten, bitte versuche es erneut oder fahre ohne Kalibrierung fort.`,
        SPEECH_CONFIG
      );

      return;
    }
    Speech.speak(
      `Du bist ${_steps} Schritte und ${distanceInMeter.toFixed(2)} Meter gegangen. Der Umrechnungsfaktor beträgt ${(distanceInMeter / _steps).toFixed(2)}. Du kannst nun mit dem nächsten Schritt fortfahren.`,
      SPEECH_CONFIG
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
    Speech.speak(
      'Kalibrierung gestartet. Warte einen Moment bis die Musik startet.',
      SPEECH_CONFIG
    );
    const pedometerAvailable = await pedometerAvailableMutation.mutateAsync();
    const currentPositionData = await currentLocationMutation.mutateAsync();
    if (!pedometerAvailable) {
      Speech.speak('Gehe 30 Schritte und klicke dann auf Stopp.');
    }
    const sound = await startSoundMutation.mutateAsync(Song);
    if (!sound) {
      Speech.speak('Die Musik kann leider nicht abgespielt werden.');
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
        <Button buttonType="primary" onPress={stopPedometer} disabled={false}>
          Abbrechen
        </Button>
      );
    }
    if (
      pedometerSubscription.current === undefined &&
      audioSound.current &&
      fallback.current
    ) {
      return (
        <Button buttonType="primary" onPress={fallbackStop} disabled={false}>
          Stopp
        </Button>
      );
    }

    return (
      <>
        <Text className="text-2xl font-atkinsonRegular">
          Sobald du auf Start Kalibrierung klickst, wird eine Melodie ertönen.
          Laufe so lange gerade aus, bis die Melodie stoppt.
        </Text>
        <Button
          buttonType="primary"
          disabled={
            currentLocationMutation.isPending ||
            startSoundMutation.isPending ||
            pedometerAvailableMutation.isPending
          }
          onPress={startPedometer}
        >
          Start Kalibrierung
        </Button>
      </>
    );
  };

  return (
    <View>
      {buttonOutput()}
      {(currentLocationMutation.isPending ||
        pedometerAvailableMutation.isPending ||
        startSoundMutation.isPending) && (
        <ActivityIndicator className="mt-4 h-[100px]" size="large" />
      )}

      <Text className="text-lg mt-4">Schritte: {steps}</Text>
    </View>
  );
}
