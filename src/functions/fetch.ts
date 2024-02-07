import axios from 'axios';
import { LocationType } from '../../types/Types';
import VALHALLA_CONFIG from '../../valhallaConfig';
import { ValhallaProps } from '../../types/Valhalla-Types';
import { PhotonFeatureCollection } from '../../types/api-photon';

const PHOTON_URL = 'https://photon.komoot.io';
const VALHALLA_URL = 'https://valhalla1.openstreetmap.de/';

const axiosPhotonInstance = axios.create({ baseURL: PHOTON_URL });
const axiosValhallaInstance = axios.create({ baseURL: VALHALLA_URL });
export async function fetchReverseDataHandler(latlon: {
  lat: number | undefined;
  lon: number | undefined;
}) {
  return (
    await axiosPhotonInstance.get<PhotonFeatureCollection>(
      `reverse?lon=${latlon?.lon}&lat=${latlon?.lat}`,
      { timeout: 5000 }
    )
  ).data;
}
export async function fetchSearchDataHandler(
  query: string
): Promise<PhotonFeatureCollection | null> {
  console.log('fetchSearchDataHandler', query);
  return (
    await axiosPhotonInstance.get<PhotonFeatureCollection>(
      `api/?q=${query}&limit=5&lang=de`,
      { timeout: 5000 }
    )
  ).data;
}

export const fetchTripHandler = async (
  points: (LocationType | undefined)[]
): Promise<ValhallaProps | null> => {
  const searchJson = {
    ...VALHALLA_CONFIG,
    locations: points.map((point) => ({ ...point, type: 'break' })),
  };
  return (
    await axiosValhallaInstance.get<ValhallaProps>(
      `route?json=${JSON.stringify(searchJson)}&language=de-DE`,
      {
        timeout: 5000,
      }
    )
  ).data;
};
