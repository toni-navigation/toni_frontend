import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { Card } from '@/components/organisms/Card';

interface TripStepProps {
  notOnRoute: boolean;
  onReroute: () => void;
  icon: React.ReactNode;
  instruction: string | null | undefined;
}
export function TripStep({
  notOnRoute,
  onReroute,
  icon,
  instruction,
}: TripStepProps) {
  return (
    <SafeAreaView className="flex-1 m-5">
      {notOnRoute && (
        <View>
          <Text>
            Du befindest dich nicht auf der Route. Möchtest du die Route neu
            berechnen?
          </Text>
          <Button onPress={onReroute} buttonType="primary">
            Reroute
          </Button>
        </View>
      )}
      {/* <Map */}
      {/*  origin={parseCoordinate(tripData.origin)} */}
      {/*  destination={parseCoordinate(tripData.destination)} */}
      {/*  nearestPoint={nearestPoint} */}
      {/*  decodedShape={decodedShape} */}
      {/*  maneuvers={data.trip.legs[0].maneuvers} */}
      {/*  currentManeuverIndex={calculatedManeuvers.maneuverIndex} */}
      {/* /> */}
      {instruction && <Card icon={icon}>{instruction}</Card>}
    </SafeAreaView>
  );
}
