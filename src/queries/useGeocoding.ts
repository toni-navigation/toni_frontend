import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { PhotonService } from '@/services/api-photon';

export function useGeocoding(
  debouncedInputValue: string,
  focused: boolean,
  bbox?: number[][],
  limit = 5
) {
  console.log(bbox);
  const parameters: Parameters<typeof PhotonService.geocoding>[0] = {
    q: debouncedInputValue,
    limit,
    lang: 'de',
    ...(bbox ? { bbox } : {}),
  };

  return useQuery({
    queryKey: ['photon', parameters],
    queryFn: () => PhotonService.geocoding(parameters),
    enabled: focused,
    placeholderData: keepPreviousData,
  });
}
