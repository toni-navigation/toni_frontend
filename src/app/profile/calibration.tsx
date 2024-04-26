import { Audio } from 'expo-av';
import { router, useLocalSearchParams } from 'expo-router';
import { Pedometer } from 'expo-sensors';
import * as Speech from 'expo-speech';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Song from '@/assets/Testtrack.mp3';
import { CalibrationText } from '@/components/CalibrationText';
import { Button } from '@/components/atoms/Button';
import { Header } from '@/components/atoms/Header';
import { Icon } from '@/components/atoms/Icon';
import { Logo } from '@/components/atoms/Logo';
import { getDistanceInMeter } from '@/functions/getDistanceInMeter';
import { useCurrentLocation } from '@/mutations/useCurrentLocation';
import { usePedometerAvailable } from '@/mutations/usePedometerAvailable';
import { useStartSound } from '@/mutations/useStartSound';
import { useStopSound } from '@/mutations/useStopSound';
import { useCalibrationStore } from '@/store/useCalibrationStore';
import styling from '@/stylings';
import { CurrentLocationType } from '@/types/Types';

const STOP_CALIBRATION_COUNT = 30;
export const SPEECH_CONFIG = {
  language: 'de',
};

export default function CalibrationPage() {
  const { resetCalibrationStore } = useCalibrationStore(
    (state) => state.actions
  );
  const colorscheme = useColorScheme();
  const [index, setIndex] = React.useState(0);
  const { addCalibration } = useCalibrationStore((state) => state.actions);
  const [steps, setSteps] = useState(0);
  const pedometerSubscription = useRef<Pedometer.Subscription | null>();
  const audioSound = useRef<Audio.Sound>();
  const fallback = useRef<CurrentLocationType>();
  const params = useLocalSearchParams();
  const isFromProfile = Number(params.fromProfile);

  const currentLocationMutation = useCurrentLocation();
  const pedometerAvailableMutation = usePedometerAvailable();
  const startSoundMutation = useStartSound(() => Speech.stop());
  const stopSoundMutation = useStopSound();

  const stopPedometer = async (cancelFlag: boolean = false) => {
    pedometerSubscription.current?.remove();
    pedometerSubscription.current = undefined;

    if (audioSound.current) {
      await stopSoundMutation.mutateAsync(audioSound.current);
      audioSound.current = undefined;
    }
    if (cancelFlag) {
      setIndex(index);
    } else {
      setIndex(index + 1);
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
    if (distanceInMeter === null) {
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
        <Button
          buttonType="primary"
          onPress={() => stopPedometer(true)}
          disabled={false}
        >
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
    );
  };

  return (
    <SafeAreaView
      className={`flex-1 ${colorscheme === 'light' ? 'bg-background-light' : 'bg-background-dark'}`}
    >
      <ScrollView className="mx-8 mt-8">
        <View className="flex items-center pb-6">
          <Logo mode={colorscheme} size={85} />
        </View>
        <Header>Schrittlänge konfigurieren</Header>
        {index === 0 && <CalibrationText index={0} />}
        {index === 1 && <CalibrationText index={1} />}
        {index === 2 && <CalibrationText index={2} />}
        {index === 3 && (
          <>
            <CalibrationText index={3} />
            <Text
              className={`text-lg font-atkinsonRegular mt-4 ${colorscheme === 'light' ? 'text-text-color-light' : 'text-background-light'}`}
            >
              Schritte: {steps}
            </Text>
            <View className="flex-1 items-center pb-6">
              <Icon
                icon="musicNote"
                color={
                  colorscheme === 'light'
                    ? styling.colors['primary-color-dark']
                    : styling.colors['primary-color-light']
                }
                size={83}
              />
            </View>
            {(currentLocationMutation.isPending ||
              pedometerAvailableMutation.isPending ||
              startSoundMutation.isPending) && (
              <ActivityIndicator className="mt-4 h-[100px]" size="large" />
            )}
          </>
        )}
        {index === 4 && <CalibrationText index={4} />}
      </ScrollView>

      <View className="mx-8 mb-3">
        {index === 0 && (
          <>
            <Text
              className={`mx-auto font-atkinsonRegular text-xl ${colorscheme === 'light' ? 'text-text-color-light' : 'text-background-light'}`}
            >
              Schritt 1 / 4
            </Text>

            <Button
              buttonType="primaryOutline"
              disabled={false}
              onPress={() =>
                isFromProfile ? router.back() : router.push('/home')
              }
            >
              {isFromProfile ? 'Zurück' : 'Überspringen'}
            </Button>
            <Button
              buttonType="primary"
              disabled={false}
              onPress={() => setIndex(index + 1)}
            >
              Weiter
            </Button>
          </>
        )}
        {index === 1 && (
          <>
            <Text
              className={`mx-auto font-atkinsonRegular text-xl ${colorscheme === 'light' ? 'text-text-color-light' : 'text-background-light'}`}
            >
              Schritt 2 / 4
            </Text>
            <Button
              buttonType="primaryOutline"
              disabled={false}
              onPress={() => {
                setIndex(index - 1);
              }}
            >
              Zurück
            </Button>
            <Button
              buttonType="primary"
              disabled={false}
              onPress={() => setIndex(index + 1)}
            >
              Weiter
            </Button>
          </>
        )}
        {index === 2 && (
          <>
            <Text
              className={`mx-auto font-atkinsonRegular text-xl ${colorscheme === 'light' ? 'text-text-color-light' : 'text-background-light'}`}
            >
              Schritt 3 / 4
            </Text>
            <Button
              buttonType="primaryOutline"
              disabled={false}
              onPress={() => {
                setIndex(index - 1);
              }}
            >
              Zurück
            </Button>
            <Button
              buttonType="primary"
              disabled={false}
              onPress={() => setIndex(index + 1)}
            >
              Los gehts
            </Button>
          </>
        )}
        {index === 3 && (
          <>
            <Text
              className={`mx-auto font-atkinsonRegular text-xl ${colorscheme === 'light' ? 'text-text-color-light' : 'text-background-light'}`}
            >
              Schritt 4 / 4
            </Text>
            <Button
              buttonType="primaryOutline"
              disabled={false}
              onPress={() => {
                setIndex(index - 1);
              }}
            >
              Zurück
            </Button>
            {buttonOutput()}
          </>
        )}
        {index === 4 && (
          <>
            <Button
              buttonType="primaryOutline"
              disabled={false}
              onPress={() => {
                setIndex(index - 1);
                resetCalibrationStore();
              }}
            >
              Wiederholen
            </Button>
            <Button
              buttonType="accent"
              disabled={false}
              onPress={() =>
                isFromProfile ? router.push('/profile') : router.push('/home')
              }
            >
              Fertig
            </Button>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
