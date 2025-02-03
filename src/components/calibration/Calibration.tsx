import { Audio } from 'expo-av';
import { LocationObject } from 'expo-location';
import { router } from 'expo-router';
import { Pedometer } from 'expo-sensors';
import React, { useRef, useState } from 'react';
import { SafeAreaView, View } from 'react-native';

import Song from '@/assets/calibration.wav';
import { Button } from '@/components/atoms/Button';
import { CalibrationHeader } from '@/components/calibration/CalibrationHeader';
import { CalibrationMusicNote } from '@/components/calibration/CalibrationMusicNote';
import { CalibrationNavigation } from '@/components/calibration/CalibrationNavigation';
import { CalibrationSteps } from '@/components/calibration/CalibrationSteps';
import { getDistanceInMeter } from '@/functions/getDistanceInMeter';
import { useCurrentLocation } from '@/mutations/useCurrentLocation';
import { useSpeak } from '@/mutations/useSpeak';
import { useStartSound } from '@/mutations/useStartSound';
import { useStopSound } from '@/mutations/useStopSound';
import { usePedometerAvailable } from '@/queries/usePedometerAvailable';
import { useUserStore } from '@/store/useUserStore';

const STOP_CALIBRATION_COUNT = 30;
const MOCK_PEDOMETER = false;
interface CalibrationProps {
  isFromIntro?: boolean;
}
export function Calibration({ isFromIntro = false }: CalibrationProps) {
  const { data: pedometerIsAvailable } = usePedometerAvailable();
  const { addCalibration } = useUserStore((state) => state.actions);
  const [steps, setSteps] = useState(0);

  // const calibrationFactor = useUserStore((state) => state.calibrationFactor);
  const pedometerSubscription = useRef<Pedometer.Subscription | null>();
  const audioSound = useRef<Audio.Sound>();
  const fallback = useRef<any>();
  const currentLocationMutation = useCurrentLocation();
  const pedometerAvailableMutation = usePedometerAvailable();
  const startSoundMutation = useStartSound();
  const stopSoundMutation = useStopSound();
  const speakMutation = useSpeak();

  const stopPedometer = async () => {
    pedometerSubscription.current?.remove();
    pedometerSubscription.current = undefined;

    if (audioSound.current) {
      await stopSoundMutation.mutateAsync(audioSound.current);
      audioSound.current = undefined;
    }
  };

  const fallbackStop = async (_start?: LocationObject, _steps = 30) => {
    await stopPedometer();

    let destination = await currentLocationMutation.mutateAsync();

    if (MOCK_PEDOMETER && _start) {
      const { latitude } = _start.coords;

      const mockLatitudeOffset = 32 / 111_139;
      destination = {
        ..._start,
        coords: {
          ..._start.coords,
          latitude: latitude + mockLatitudeOffset,
        },
      };
    }

    const distanceInMeter = getDistanceInMeter(
      fallback.current || _start,
      destination
    );

    if (distanceInMeter === null) {
      return;
    }

    addCalibration(distanceInMeter, _steps);
    router.push('/profile/calibration/finished');
    if (fallback.current) {
      fallback.current = undefined;
    }
  };

  const handlePedometerUpdate = async (
    start: LocationObject | undefined,
    result: Pedometer.PedometerResult
  ) => {
    setSteps(result.steps);
    if (result.steps >= STOP_CALIBRATION_COUNT) {
      await fallbackStop(start, result.steps);
    }
  };
  const startMockPedometer = (
    callback: (result: { steps: number }) => void
  ) => {
    let mockSteps = 0;
    const interval = setInterval(() => {
      mockSteps += 1; // Simulate steps
      callback({ steps: mockSteps });
      if (mockSteps >= 30) {
        clearInterval(interval);
      }
    }, 500);

    return {
      remove: () => clearInterval(interval),
    };
  };
  const startPedometer = async () => {
    setSteps(0);
    const currentPositionData = await currentLocationMutation.mutateAsync();
    const sound = await startSoundMutation.mutateAsync(Song);

    const isAvailable = await Pedometer.isAvailableAsync();

    if (isAvailable || MOCK_PEDOMETER) {
      if (MOCK_PEDOMETER) {
        pedometerSubscription.current = startMockPedometer((result) =>
          handlePedometerUpdate(currentPositionData, result)
        );
      } else {
        pedometerSubscription.current = Pedometer.watchStepCount((result) =>
          handlePedometerUpdate(currentPositionData, result)
        );
      }
    } else {
      fallback.current = currentPositionData;
    }

    audioSound.current = sound;
  };
  const isLoading =
    currentLocationMutation.isPending ||
    pedometerAvailableMutation.isPending ||
    speakMutation.isPending ||
    startSoundMutation.isPending;

  // const isInCalibrationMode =
  //   !!(pedometerSubscription.current && audioSound.current) ||
  //   !!(
  //     pedometerSubscription.current === undefined &&
  //     audioSound.current &&
  //     fallback.current
  //   ) ||
  //   isLoading;

  // const calibrationFinished =
  //   !isInCalibrationMode && steps >= STOP_CALIBRATION_COUNT;
  const buttonOutput = () => {
    if (pedometerSubscription.current && audioSound.current) {
      return (
        <Button
          width="full"
          buttonType="primary"
          onPress={() => stopPedometer()}
        >
          Abbrechen
        </Button>
      );
    }
    if (!pedometerIsAvailable && fallback.current) {
      return (
        <>
          <Button
            width="half"
            buttonType="primaryOutline"
            onPress={() => {
              fallback.current = undefined;
              stopPedometer();
              router.back();
            }}
          >
            Abbrechen
          </Button>
          <Button width="half" buttonType="primary" onPress={fallbackStop}>
            Stopp
          </Button>
        </>
      );
    }

    return (
      <>
        {isFromIntro && (
          <Button
            onPress={() => {
              router.replace('/home');
            }}
            buttonType="primaryOutline"
            width="half"
          >
            Überspringen
          </Button>
        )}
        <Button
          width={isFromIntro ? 'half' : 'full'}
          buttonType="accent"
          disabled={isLoading}
          isLoading={isLoading}
          onPress={startPedometer}
        >
          Start
        </Button>
      </>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background" testID="calibrationID">
      <View className="px-8 mt-8 flex-1 flex-grow">
        <CalibrationHeader pedometerIsAvailable={pedometerIsAvailable} />
        <CalibrationMusicNote steps={steps} />
      </View>
      {pedometerSubscription.current && <CalibrationSteps steps={steps} />}
      <CalibrationNavigation>{buttonOutput()}</CalibrationNavigation>
    </SafeAreaView>
  );
}
