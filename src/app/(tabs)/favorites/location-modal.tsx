import React from 'react';

import { LocationModal } from '@/components/organisms/LocationModal';
import { useFavoriteStore } from '@/store/useFavoriteStore';

export default function LocationModalPage() {
  const { addPhotonFeature } = useFavoriteStore((state) => state.actions);
  const photonFeature = useFavoriteStore(
    (state) => state.favorite.photonFeature
  );

  return (
    <LocationModal changeLocation={addPhotonFeature} location={photonFeature}>
      Favorit suchen
    </LocationModal>
  );
}
