import { useQuery, keepPreviousData } from '@tanstack/react-query';

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
    queryFn: () => PhotonService.geocoding(parameters),
    enabled: focused,
    placeholderData: keepPreviousData,
  });
}
