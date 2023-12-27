import axios from 'axios';
import { LocationType } from '../types/Types';
import VALHALLA_CONFIG from '../valhalla.config.json';
import { NominatimGeoCodeJsonProps } from '../types/Nominatim-Types';
import { ValhallaProps } from '../types/Valhalla-Types';

const NominatimUrl = 'https://nominatim.openstreetmap.org/';
const ValhallaUrl = 'https://valhalla1.openstreetmap.de/';
export async function getCurrentLocation(): Promise<GeolocationCoordinates> {
  return new Promise((resolve) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position.coords);
        },
        (error) => {
          throw new Error(`Error getting location: ${error.message}`);
          // reject(`Error getting location: ${error.message}`);
        }
      );
    } else {
      throw new Error('Geolocation is not supported by your browser');
      // reject('Geolocation is not supported by your browser');
    }
  });
}

export async function fetchReverseDataHandler(
  latlon: LocationType
): Promise<NominatimGeoCodeJsonProps | undefined> {
  try {
    if (!latlon) return undefined;
    const geocodeResponse = await axios.get(
      `${NominatimUrl}reverse?lon=${latlon.lon}&lat=${latlon.lat}&countrycodes=DE&addressdetails=1&format=geocodejson`
    );
    return geocodeResponse.data;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}
export async function fetchSearchDataHandler(
  query: string
): Promise<NominatimGeoCodeJsonProps | undefined> {
  try {
    const geocodeResponse = await axios.get(
      `${NominatimUrl}search?q=${query}&limit=5&addressdetails=1&extratags=1&namedetails=1&format=geocodejson&countrycodes=DE`
    );

    return geocodeResponse.data;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export const fetchDirectionsHandler = async (
  points: LocationType[]
): Promise<ValhallaProps | undefined> => {
  try {
    const searchJson = {
      ...VALHALLA_CONFIG,
      locations: points.map((point) => ({ ...point, type: 'break' })),
    };

    const newDirections = await axios.get(
      `${ValhallaUrl}route?json=${JSON.stringify(searchJson)}&language=de-DE`
    );

    return newDirections.data;
  } catch (e) {
    return undefined;
    console.error(e);
  }
};
