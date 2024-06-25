import React from 'react';
import { SafeAreaView } from 'react-native';

import { Card } from '@/components/organisms/Card';

interface TripStepProps {
  icon: React.ReactNode;
  instruction: string | null | undefined;
}
export function TripStep({ icon, instruction }: TripStepProps) {
  return (
    <SafeAreaView className="flex-1 m-5">
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
