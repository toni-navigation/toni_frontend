import { router } from 'expo-router';
import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';

import background from '@/assets/images/background10.png';
import { BigHeader } from '@/components/atoms/BigHeader';
import { Button } from '@/components/atoms/Button';
import { Route } from '@/components/atoms/icons/Route';
import { useTripStore } from '@/store/useTripStore';
import { SummaryProps } from '@/types/Valhalla-Types';

interface RouteOverviewProps {
  onCloseClick: () => void;
  summary: SummaryProps;
}

export function RouteOverview({ onCloseClick, summary }: RouteOverviewProps) {
  const convertSecondsToMinutes = (seconds: number) => Math.floor(seconds / 60);
  const origin = useTripStore((state) => state.origin);
  const destination = useTripStore((state) => state.destination);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ImageBackground source={background} className="flex-1">
        <BigHeader classes="text-invertedPrimary">Deine Route</BigHeader>
        <ScrollView className="flex flex-col flex-1 px-8 mt-8">
          <Text className="text-2xl font-generalSansSemi text-primary">
            Von
          </Text>
          <Text>
            {origin ? (
              <>
                {origin?.properties?.name && (
                  <>
                    <Text className="text-2xl font-atkinsonRegular flex-1 text-textColor">
                      {origin?.properties?.name}
                    </Text>
                    {'\n'}
                  </>
                )}
                {origin?.properties?.street &&
                  origin?.properties.housenumber && (
                    <>
                      <Text className="text-2xl font-atkinsonRegular flex-1 text-textColor">
                        {origin?.properties?.street}{' '}
                        {origin?.properties?.housenumber}
                      </Text>
                      {'\n'}
                    </>
                  )}
                {origin?.properties?.postcode && origin?.properties.city && (
                  <Text className="text-2xl font-atkinsonRegular flex-1 text-textColor">
                    {origin?.properties?.postcode} {origin?.properties?.city}
                  </Text>
                )}
              </>
            ) : (
              <Text className="text-2xl font-atkinsonRegular flex-1 text-textColor">
                Mein Standort
              </Text>
            )}
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
                Mein Standort
              </Text>
            )}
          </Text>
          <View className="flex-1 justify-center items-center">
            <Route
              transform="rotate(30) translate(35 -40)"
              viewBox="0,0,150,140"
            />
          </View>

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
          <Button onPress={() => router.back()} buttonType="primaryOutline">
            Zurück
          </Button>
          <Button onPress={onCloseClick} buttonType="primary">
            Weiter
          </Button>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
