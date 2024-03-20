import { useMutation } from '@tanstack/react-query';

import { getCurrentPosition } from '@/functions/functions';

export function useCurrentLocation() {
  return useMutation({
    mutationFn: getCurrentPosition,
  });
}
