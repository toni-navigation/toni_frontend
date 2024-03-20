import { useMutation } from '@tanstack/react-query';

import { PhotonService } from '@/services/api-photon';

export function useReverseData() {
  return useMutation({
    mutationKey: ['reverseData'],
    mutationFn: PhotonService.reverse,
  });
}
