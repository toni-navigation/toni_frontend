import React from 'react';

import { LocationModal } from '@/components/organisms/LocationModal';
import { getCurrentPosition } from '@/functions/getCurrentPosition';
import { useReverseData } from '@/mutations/useReverseData';
import { CreatePhotonFeatureDto } from '@/services/api-backend';
import { useFavoriteStore } from '@/store/useFavoriteStore';

export default function LocationModalPage() {
  const { addPhotonFeature } = useFavoriteStore((state) => state.actions);
  const photonFeature = useFavoriteStore(
    (state) => state.favorite.photonFeature
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const reverseData = useReverseData();
  const addLocation = async (
    location: CreatePhotonFeatureDto | undefined | null
  ) => {
    if (location === null) {
      setIsLoading(true);
      const position = await getCurrentPosition();
      if (position) {
        const data = await reverseData.mutateAsync({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        addPhotonFeature(data.features[0]);

        setIsLoading(false);

        return;
      }
    }
    addPhotonFeature(location);
  };

  return (
    <LocationModal
      changeLocation={addLocation}
      isLoading={isLoading}
      location={photonFeature}
    >
      Favorit suchen
    </LocationModal>
  );
}
