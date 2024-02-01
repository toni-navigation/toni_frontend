import { SuggestionsProps } from './Nominatim-Types';

export type LocationType = {
  lat: number;
  lon: number;
  accuary?: number | null;
} | null;
export interface CalibrateProps {
  start: LocationType;
  end: LocationType;
  meters: number | null;
  factor: number | null;
}

export interface CurrentLocationProps {
  coords: {
    speed: number | null;
    heading: number | null;
    accuracy: number | null;
    altitudeAccuracy: number | null;
    altitude: number | null;
    longitude: number;
    latitude: number;
  };
  timestamp: number;
}

export type destinationType = {
  query: string;
  location: LocationType | null;
  suggestions: SuggestionsProps | null;
};

export type startType = {
  query: string;
  location: LocationType | null;
};
export interface PointsProps {
  start: startType;
  destination: destinationType;
}
