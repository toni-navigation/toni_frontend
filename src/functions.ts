import axios from 'axios';
import { LocationType, NominatimGeoCodeJsonProps } from './Types';
import VALHALLA_CONFIG from './Valhalla';

const NominatimUrl = 'https://nominatim.openstreetmap.org/';
const ValhallaUrl = 'https://valhalla1.openstreetmap.de/';

export function getCurrentLocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );
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
      `${NominatimUrl}search?q=${query}&limit=5&addressdetails=1&extratags=1&namedetails=1&format=geocodejson&countrycodes=AT`
    );

    return geocodeResponse.data;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export const fetchDirections = async (points: LocationType[]): any => {
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
    console.error(e);
  }
};
/* export async function getCurrentLocation(): Promise<CurrentLocationType> {
    if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition((position: GeolocationPosition)   => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                return { latitude, longitude }
            }, (error)=> {
                console.error('Error getting geolocation:', error.message);
                return null;
            }
        );
    }
    return null;
} */
