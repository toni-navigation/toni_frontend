import React from 'react';
import { SafeAreaView } from 'react-native';

interface TripStepProps {
  icon: React.ReactNode;
  // instruction: string | null | false | undefined;
}
export function TripStep({ icon }: TripStepProps) {
  return (
    <SafeAreaView className="flex-1 m-5">
      {/* {instruction && <Card icon={icon}>{instruction}</Card>} */}
    </SafeAreaView>
  );
}
