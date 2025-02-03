import { useQuery } from '@tanstack/react-query/build/modern/index';
import React from 'react';

import { LocationModal } from '@/components/organisms/LocationModal';
import { favoritesControllerFindAllFavoritesOptions } from '@/services/api-backend/@tanstack/react-query.gen';
import { useAuthStore } from '@/store/useAuthStore';
import { useTripStore } from '@/store/useTripStore';

export default function HomeAddressPage() {
  const { changeDestination } = useTripStore((state) => state.actions);
  const destination = useTripStore((state) => state.destination);
  const token = useAuthStore((state) => state.token);

  const {
    data: favorites,
    error,
    isError,
    isPending,
  } = useQuery({
    ...favoritesControllerFindAllFavoritesOptions(),
    queryKey: ['favorites', token],
  });
  const home =
    favorites &&
    favorites.filter((favorite) => favorite.destinationType === 'home')[0];

  const { mutateAsync: updateHome } = useMutation({
    ...favoritesControllerCreateFavoriteMutation(),
    onSuccess: (successData) => {},
    onError: (errorHome) => {
      Alert.alert(errorHome.message);
    },
  });

  return (
    <LocationModal
      changeLocation={changeDestination}
      location={home?.photonFeature}
    >
      Heimatadresse eingeben
    </LocationModal>
  );
}
