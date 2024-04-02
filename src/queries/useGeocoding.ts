import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { getBbox } from '@/functions/getBbox';
import { PhotonService } from '@/services/api-photon';
import { useCurrentLocationStore } from '@/store/useCurrentLocationStore';

export function useGeocoding(
  debouncedInputValue: string,
  focused: boolean,
  limit = 5
) {
  const currentLocation = useCurrentLocationStore(
    (state) => state.currentLocation
  );
  const defaultBbox = currentLocation && getBbox(currentLocation);

  const parameters: Parameters<typeof PhotonService.geocoding>[0] = {
    q: debouncedInputValue,
    limit,
    lang: 'de',
    ...(defaultBbox ? { bbox: defaultBbox.join(',') } : {}),
  };

  return useQuery({
    queryKey: ['photon', parameters],
    queryFn: () => PhotonService.geocoding(parameters),
    enabled: focused,
    placeholderData: keepPreviousData,
  });
}
