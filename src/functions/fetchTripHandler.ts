import axios from 'axios';

import { SearchParamType } from '@/components/trip/Trip';
import { parseCoordinate } from '@/functions/parseCoordinate';
import { ValhallaProps } from '@/types/Valhalla-Types';
import { VALHALLA_CONFIG } from '@/valhallaConfig';

const VALHALLA_URL = 'https://valhalla1.openstreetmap.de/';

const axiosValhallaInstance = axios.create({ baseURL: VALHALLA_URL });

export const fetchTripHandler = async (
  tripData: SearchParamType,
  _axios = axiosValhallaInstance
): Promise<ValhallaProps> => {
  const origin = parseCoordinate(tripData.origin);
  const destination = parseCoordinate(tripData.destination);

  const searchJson = {
    ...VALHALLA_CONFIG,
    locations: [
      { ...origin, type: 'break' },
      { ...destination, type: 'break' },
    ],
  };

  return (
    await _axios.get<ValhallaProps>(
      `route?json=${JSON.stringify(searchJson)}&language=de-DE`,
      {
        timeout: 5000,
      }
    )
  ).data;
};
