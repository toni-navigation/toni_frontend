import { LocationType } from './Types';

export interface GeocodingProps {
  version: string;
  attribution: string;
  licence: string;
  query: string;
}
export interface PropertyProps {
  place_id: number;
  osm_type: string;
  osm_key: string;
  osm_id: number;
  type: string;
  accuracy?: number;
  label?: string;
  name?: string;
  country?: string;
  postcode?: string;
  state?: string | null;
  county?: string | null;
  city?: string;
  district?: string | null;
  locality?: string;
  street?: string;
  housenumber?: string;
  admin: {
    level1: string;
    level2: string;
    level3: string;
    level4: string;
    level5: string;
    level6: string;
    level7: string;
    level8: string;
    level9: string;
    level10: string;
  };
}
export interface PropertySearchProps {
  geocoding: PropertyProps;
}

export interface GeometryProps {
  type: string;
  coordinates: [number, number];
}

export interface FeatureProps {
  type: string;
  properties: PropertySearchProps;
  geometry: GeometryProps;
}

export interface NominatimGeoCodeJsonProps {
  features: FeatureProps[];
  geocoding: GeocodingProps;
  type: string;
}
export interface SearchProps {
  id: number;
  query: string;
  location: LocationType;
  suggestions: FeatureProps[] | null;
}
