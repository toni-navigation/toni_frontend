import axios from 'axios';
import { LocationType } from '../../types/Types';
import VALHALLA_CONFIG from '../../valhallaConfig';
import { ValhallaProps } from '../../types/Valhalla-Types';
import { PhotonFeatureCollection } from '../../types/api-photon';

const PhotonUrl = 'https://photon.komoot.io';
const ValhallaUrl = 'https://valhalla1.openstreetmap.de/';

export async function fetchReverseDataHandler(
  latlon: LocationType
): Promise<PhotonFeatureCollection | null> {
  try {
    if (!latlon) return null;
    const geocodeResponse = await axios.get(
      `${PhotonUrl}/reverse?lon=${latlon.lon}&lat=${latlon.lat}`,
      {
        timeout: 5000,
      }
    );
    return geocodeResponse.data;
  } catch (e) {
    console.error(e);
    return null;
  }
}
export async function fetchSearchDataHandler(
  query: string,
  geoPositionPriority?: LocationType | null
): Promise<PhotonFeatureCollection | null> {
  let url = `${PhotonUrl}/api/?q=${query}&limit=5&lang=de`;
  if (geoPositionPriority) {
    url = `${url}&lon=${geoPositionPriority.lon}&lat=${geoPositionPriority.lat}`;
  }
  try {
    const geocodeResponse = await axios.get(url, {
      timeout: 5000,
    });

    return geocodeResponse.data;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export const fetchTripHandler = async (
  points: LocationType[]
): Promise<ValhallaProps | null> => {
  try {
    const searchJson = {
      ...VALHALLA_CONFIG,
      locations: points.map((point) => ({ ...point, type: 'break' })),
    };
    const newTrip = await axios.get(
      `${ValhallaUrl}route?json=${JSON.stringify(searchJson)}&language=de-DE`,
      {
        timeout: 5000,
      }
    );

    return newTrip.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
