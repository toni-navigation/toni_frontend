import React from 'react';

import { LocationModal } from '@/components/organisms/LocationModal';
import { useTripStore } from '@/store/useTripStore';

export default function StartPage() {
  const { changeOrigin } = useTripStore((state) => state.actions);
  const origin = useTripStore((state) => state.origin);

  return (
    <LocationModal changeLocation={changeOrigin} location={origin}>
      Startpunkt suchen
    </LocationModal>
  );
}
