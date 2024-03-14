import axios from 'axios';

import VALHALLA_CONFIG from '../../valhallaConfig';
import { CurrentLocationType, LocationProps } from '../types/Types';
import { ValhallaProps } from '../types/Valhalla-Types';
import { PhotonFeatureCollection } from '../types/api-photon';

const PHOTON_URL = 'https://photon.komoot.io';
const VALHALLA_URL = 'https://valhalla1.openstreetmap.de/';

const axiosPhotonInstance = axios.create({ baseURL: PHOTON_URL });
const axiosValhallaInstance = axios.create({ baseURL: VALHALLA_URL });
export async function fetchReverseDataHandler(latlon: LocationProps) {
  return (
    await axiosPhotonInstance.get<PhotonFeatureCollection>(
      `reverse?lon=${latlon?.lon}&lat=${latlon?.lat}`,
      { timeout: 5000 }
    )
  ).data;
}
export async function fetchSearchDataHandler(
  query: string,
  currentLocation: CurrentLocationType
): Promise<PhotonFeatureCollection | null> {
  let url = `api/?q=${query}&limit=5&lang=de`;
  if (currentLocation) {
    url = `api/?q=${query}&lat=${currentLocation.coords.latitude}&lon=${currentLocation.coords.longitude}&limit=5&lang=de`;
  }

  return (
    await axiosPhotonInstance.get<PhotonFeatureCollection>(url, {
      timeout: 5000,
    })
  ).data;
}

export const fetchTripHandler = async (
  points: (LocationProps | undefined | null)[]
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
