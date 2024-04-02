import axios from 'axios';

import { fetchTripHandler } from '@/functions/fetchTripHandler';

jest.mock('axios');

describe('fetchTripHandler', () => {
  let mockAxios: jest.Mocked<typeof axios>;

  beforeEach(() => {
    mockAxios = axios as jest.Mocked<typeof axios>;
    mockAxios.create.mockReturnValue(mockAxios);
  });

  it('does not make a request when points array is empty', async () => {
    const result = await fetchTripHandler([]);

    expect(result).toBeNull();
    expect(mockAxios.get).toHaveBeenCalledTimes(0);
  });
});
