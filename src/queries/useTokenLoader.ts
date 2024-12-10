import { useSuspenseQuery } from '@tanstack/react-query';

import { TOKEN } from '@/services/client';
import { getToken } from '@/store/secureStore';

export const useTokenLoader = () =>
  useSuspenseQuery({
    queryKey: ['token'],
    queryFn: () => getToken(TOKEN),
    staleTime: Infinity,
  });
