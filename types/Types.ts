import { PhotonFeature } from './api-photon';

export type LocationType = {
  lat: number;
  lon: number;
  accuary?: number | null;
};
export interface CalibrateProps {
  start?: LocationType;
  end?: LocationType;
  meters?: number | null;
  factor?: number | null;
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
  location?: LocationType;
  suggestions?: PhotonFeature[];
};

export type startType = {
  query: string;
  location?: LocationType;
};
export interface PointsProps {
  start: startType;
  destination: destinationType;
}
