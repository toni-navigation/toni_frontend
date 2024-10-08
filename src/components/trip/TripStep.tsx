import React from 'react';
import { SafeAreaView } from 'react-native';

import { Card } from '@/components/organisms/Card';

interface TripStepProps {
  icon: React.ReactNode;
  instruction: string | undefined;
}
export function TripStep({ icon, instruction }: TripStepProps) {
  return (
    <SafeAreaView className="flex-1 m-5">
      {instruction && <Card icon={icon}>{instruction}</Card>}
    </SafeAreaView>
  );
}
