import { LocationObject } from 'expo-location';
import { router } from 'expo-router';
import React, { Suspense, useEffect } from 'react';
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
import { Button } from '@/components/atoms/Button';
import { Header } from '@/components/atoms/Header';
import { photonValue } from '@/functions/photonValue';
import { useReverseData } from '@/queries/useReverseData';
import { useTripStore } from '@/store/useTripStore';
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
  const convertSecondsToMinutes = (seconds: number) => Math.floor(seconds / 60);
  const origin = useTripStore((state) => state.origin);
  const { changeOrigin } = useTripStore((state) => state.actions);
  const destination = useTripStore((state) => state.destination);
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
      <ImageBackground source={background} className="flex-1">
        <Suspense fallback={<ActivityIndicator size="large" />}>
          <ScrollView className="flex flex-col flex-1 px-8 mt-8">
            <Header>Deine Route</Header>
            <Text className="text-2xl font-generalSansSemi text-primary">
              Von
            </Text>
            <Text className="text-2xl font-atkinsonRegular flex-1 text-textColor">
              {origin ? photonValue(origin) : 'Mein Standort'}
            </Text>
            <Text className="text-2xl font-generalSansSemi text-primary pt-2">
              Nach
            </Text>
            <Text className="pb-4">
              {destination ? (
                <>
                  {destination?.properties?.name && (
                    <>
                      <Text className="text-2xl font-atkinsonRegular flex-1 text-textColor">
                        {destination?.properties?.name}
                      </Text>
                      {'\n'}
                    </>
                  )}
                  {destination?.properties?.street &&
                    destination?.properties.housenumber && (
                      <>
                        <Text className="text-2xl font-atkinsonRegular flex-1 text-textColor">
                          {destination?.properties?.street}{' '}
                          {destination?.properties.housenumber}
                        </Text>
                        {'\n'}
                      </>
                    )}
                  {destination?.properties?.postcode &&
                    destination?.properties.city && (
                      <Text className="text-2xl font-atkinsonRegular flex-1 text-textColor">
                        {destination?.properties?.postcode}{' '}
                        {destination?.properties?.city}
                      </Text>
                    )}
                </>
              ) : (
                <Text className="text-2xl font-atkinsonRegular flex-1 text-textColor">
                  Kein Ziel eingegeben
                </Text>
              )}
            </Text>
            <Text className="text-2xl font-generalSansSemi text-accent py-4">
              Deine Route beträgt:
            </Text>
            <Text className="text-4xl font-generalSansSemi text-primary pt-2">
              {summary.length} km
            </Text>
            <Text className="text-4xl font-generalSansSemi text-primary pt-2">
              {convertSecondsToMinutes(summary.time)} Minuten
            </Text>
          </ScrollView>

          <View className="px-8 mb-8">
            <Button
              width="full"
              onPress={() => router.back()}
              buttonType="primaryOutline"
            >
              Zurück
            </Button>
            <Button width="full" onPress={onCloseClick} buttonType="primary">
              Weiter
            </Button>
          </View>
        </Suspense>
      </ImageBackground>
    </SafeAreaView>
  );
}
