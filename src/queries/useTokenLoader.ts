import { useSuspenseQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/query-keys';
import { TOKEN } from '@/services/client';
import { getToken } from '@/store/secureStore';

export const useTokenLoader = () =>
  useSuspenseQuery({
    queryKey: [QUERY_KEYS.token],
    queryFn: () => getToken(TOKEN),
    staleTime: Infinity,
  });
