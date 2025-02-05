import { LocationObject } from 'expo-location';
import { router } from 'expo-router';
import React, { Suspense, useContext, useEffect } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';

// @ts-ignore
import background from '@/assets/images/background10.png';
import { themes } from '@/colors';
import { ThemeContext } from '@/components/ThemeProvider';
import { Button } from '@/components/atoms/Button';
import { Header } from '@/components/atoms/Header';
import { ToniCurrentLocation } from '@/components/atoms/icons/ToniCurrentLocation';
import { ToniLocation } from '@/components/atoms/icons/ToniLocation';
import { ToniThreeCircles } from '@/components/atoms/icons/ToniThreeCircles';
import { Card } from '@/components/organisms/Card';
import { calculateSteps } from '@/functions/calculateSteps';
import { photonValue } from '@/functions/photonValue';
import { useReverseData } from '@/queries/useReverseData';
import { useTripStore } from '@/store/useTripStore';
import { useUserStore } from '@/store/useUserStore';
import { SummaryProps } from '@/types/Valhalla-Types';

interface RouteOverviewProps {
  onCloseClick: () => void;
  summary: SummaryProps;
  currentLocation: LocationObject;
}

export function RouteOverview({
  onCloseClick,
  summary,
  currentLocation,
}: RouteOverviewProps) {
  const { theme } = useContext(ThemeContext);

  const convertSecondsToMinutes = (seconds: number) => Math.floor(seconds / 60);
  const origin = useTripStore((state) => state.origin);
  const { changeOrigin } = useTripStore((state) => state.actions);
  const destination = useTripStore((state) => state.destination);
  const calibrationFactor = useUserStore((state) => state.calibrationFactor);

  const {
    data: reverseData,
    isPending: reverseIsPending,
    error: reverseIsError,
  } = useReverseData(
    currentLocation.coords.latitude,
    currentLocation.coords.longitude,
    50,
    origin === null
  );
  useEffect(() => {
    if (reverseData && !reverseIsPending) {
      changeOrigin(reverseData.features[0]);
    }
  }, [changeOrigin, reverseData, reverseIsPending]);
  if (reverseIsPending) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Suspense fallback={<ActivityIndicator size="large" />}>
        <ImageBackground source={background} className="flex-1">
          <ScrollView className="flex flex-col flex-1 px-8 mt-8">
            <Header classes="mb-8">Deine Route</Header>
            <Card>
              <Text className="text-small font-generalSansSemi text-textColor mt-2 mb-5">
                Du hast folgende Route gewählt:
              </Text>
              <View className="flex flex-row items-center">
                <ToniCurrentLocation
                  width={30}
                  height={30}
                  strokeWidth={3}
                  fill={themes.external[`--${theme}-mode-icon-button`]}
                  stroke={themes.external[`--${theme}-mode-icon-button`]}
                />
                <View className="flex-1 px-2">
                  <Text className="text-small font-atkinsonRegular text-textColor">
                    {origin ? photonValue(origin) : 'Mein Standort'}
                  </Text>
                </View>
              </View>
              <View className="my-3">
                <ToniThreeCircles
                  fill={themes.external[`--${theme}-mode-primary`]}
                  width={30}
                  height={30}
                />
              </View>
              <View className="flex flex-row items-center">
                <ToniLocation
                  width={30}
                  height={30}
                  stroke={themes.external[`--accent`]}
                  fillInner={themes.external[`--accent`]}
                  strokeWidth={3}
                />
                <View className="flex-1 px-2">
                  <Text className="text-small font-atkinsonRegular text-textColor">
                    {destination ? photonValue(destination) : 'Mein Standort'}
                  </Text>
                </View>
              </View>

              <View className="mt-8 mb-2">
                <Text className="text-medium font-generalSansSemi text-accent">
                  Deine Route beträgt:
                </Text>
                <Text className="text-medium font-generalSansSemi text-primary pt-2">
                  {summary.length} km
                </Text>
                <Text className="text-medium font-generalSansSemi text-primary pt-2">
                  {convertSecondsToMinutes(summary.time)} Minuten
                </Text>
                <Text className="text-medium font-generalSansSemi text-primary pt-2">
                  {calculateSteps(summary.length, calibrationFactor)} Schritte
                </Text>
              </View>
            </Card>
          </ScrollView>

          <View className="flex flex-row px-5 mb-8 gap-1.5">
            <Button
              width="half"
              onPress={() => {
                router.back();
              }}
              buttonType="primaryOutline"
            >
              Zurück
            </Button>
            <Button width="half" onPress={onCloseClick} buttonType="accent">
              Weiter
            </Button>
          </View>
        </ImageBackground>
      </Suspense>
    </SafeAreaView>
  );
}
