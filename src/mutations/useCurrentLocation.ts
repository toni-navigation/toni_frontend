import { useMutation } from '@tanstack/react-query';

import { getCurrentPosition } from '@/functions/getCurrentPosition';

export function useCurrentLocation() {
  return useMutation({
    mutationFn: getCurrentPosition,
  });
}
