import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchReverseDataHandler, fetchSearchDataHandler } from './fetch';

export function useSearchData() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['searchData'],
    mutationFn: (data: string) => fetchSearchDataHandler(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['searchData'] });
    },
    onError: (error) => error,
  });
}

export function useReverseData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['reverseData'],
    mutationFn: (data: { lat: number | undefined; lon: number | undefined }) =>
      fetchReverseDataHandler(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['reverseData'] });
    },
    onError: (error) => error,
  });
}
