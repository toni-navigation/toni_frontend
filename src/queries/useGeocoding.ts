import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getBbox } from '@/functions/getBbox';
import { getCurrentPosition } from '@/functions/getCurrentPosition';
import { PhotonService } from '@/services/api-photon';

export function useGeocoding(
  debouncedInputValue: string,
  focused: boolean,
  limit = 5
) {
  const parameters: Parameters<typeof PhotonService.geocoding>[0] = {
    q: debouncedInputValue,
    limit,
    lang: 'de',
  };

  return useQuery({
    queryKey: ['photon', parameters],
    queryFn: async () => {
      const currentLocation = await getCurrentPosition();
      const defaultBbox = currentLocation && getBbox(currentLocation);

      return PhotonService.geocoding({
        ...parameters,
        ...(defaultBbox ? { bbox: defaultBbox.join(',') } : {}),
      });
    },
    enabled: focused,
    placeholderData: keepPreviousData,
  });
}
