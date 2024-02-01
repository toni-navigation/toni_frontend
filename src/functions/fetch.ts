import axios from 'axios';
import { LocationType } from '../../types/Types';
import VALHALLA_CONFIG from '../../valhallaConfig';
import { NominatimGeoCodeJsonProps } from '../../types/Nominatim-Types';
import { ValhallaProps } from '../../types/Valhalla-Types';

const NominatimUrl = 'https://nominatim.openstreetmap.org/';
const ValhallaUrl = 'https://valhalla1.openstreetmap.de/';

export async function fetchReverseDataHandler(
  latlon: LocationType
): Promise<NominatimGeoCodeJsonProps | null> {
  try {
    if (!latlon) return null;
    const geocodeResponse = await axios.get(
      `${NominatimUrl}reverse?lon=${latlon.lon}&lat=${latlon.lat}&countrycodes=de,at&addressdetails=1&format=geocodejson`,
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
  query: string
): Promise<NominatimGeoCodeJsonProps | null> {
  try {
    const geocodeResponse = await axios.get(
      `${NominatimUrl}search?q=${query}&limit=5&addressdetails=1&extratags=1&namedetails=1&format=geocodejson&countrycodes=de,at`
    );

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
      `${ValhallaUrl}route?json=${JSON.stringify(searchJson)}&language=de-DE`
    );

    return newTrip.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
