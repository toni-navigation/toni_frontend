import { PhotonFeatureCollection } from './api-photon';

export interface LocationProps {
  lat?: number;
  lon?: number;
  accuracy?: number | null;
}
export interface CalibrationProps {
  start?: LocationProps;
  end?: LocationProps;
  meters?: number | null;
  factor?: number | null;
  isStart: boolean;
}

export type CurrentLocationType = CurrentLocationProps | null | undefined;
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

export interface DestinationProps {
  query: string;
  location?: LocationProps | null;
  suggestions?: PhotonFeatureCollection | null;
}

export interface StartProps {
  query?: string;
  location?: LocationProps | null;
}
export interface PointsProps {
  start: StartProps;
  destination: DestinationProps;
}
