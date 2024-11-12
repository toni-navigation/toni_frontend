import { useSuspenseQuery } from '@tanstack/react-query';

import { PhotonService } from '@/services/api-photon';

export function useReverseData(
  lat: number,
  lon: number,
  radius?: number,
  enabled?: boolean
) {
  return useSuspenseQuery({
    queryKey: ['reverseData', lat, lon, radius, enabled],
    queryFn: () =>
      enabled ? PhotonService.reverse({ lat, lon, radius }) : null,
  });
}
