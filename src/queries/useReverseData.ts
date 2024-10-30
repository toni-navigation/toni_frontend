import { useQuery } from '@tanstack/react-query';

import { PhotonService } from '@/services/api-photon';

export function useReverseData(lat: number, lon: number) {
  return useQuery({
    queryKey: ['reverseData', lat, lon],
    queryFn: () => PhotonService.reverse({ lat, lon }),
  });
}
