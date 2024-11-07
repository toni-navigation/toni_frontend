import {
  PhotonFeature,
  PhotonFeatureCollection,
} from 'src/services/api-photon';

export interface LocationProps {
  lat: number;
  lon: number;
}
export interface CalibrationProps {
  start?: LocationProps;
  end?: LocationProps;
  meters: number[];
  factors: number[];
}

export interface LocationInputProps {
  query: string;
  location?: LocationProps | null;
  suggestions?: PhotonFeatureCollection | null;
}

export interface PointsProps {
  start: LocationInputProps;
  destination: LocationInputProps;
}

export interface DecodedShapeProps {
  result: number;
  lng: number;
  byte: null | number;
  shift: number;
  coordinates: [number, number][];
  index: number;
  factor: number;
  lat: number;
}

export interface FavoriteProps {
  title: string;
  address: PhotonFeature;
  id: string;
}

export interface DestinationProps {
  address: PhotonFeature;
  key: string;
}
