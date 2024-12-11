import React from 'react';

import { LocationModal } from '@/components/organisms/LocationModal';
import { useTripStore } from '@/store/useTripStore';

export default function DestinationPage() {
  const { changeDestination } = useTripStore((state) => state.actions);
  const destination = useTripStore((state) => state.destination);

  return (
    <LocationModal changeLocation={changeDestination} location={destination}>
      Ziel suchen
    </LocationModal>
  );
}
