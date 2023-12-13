export interface ValhallaConfigProps {
  costing: 'pedestrian';
  costing_options: {
    pedestrian: {
      exclude_polygons: [];
      use_ferry: 1;
      use_living_streets: 0.5;
      use_tracks: 0;
      service_penalty: 15;
      service_factor: 1;
      shortest: false;
      use_hills: 0.5;
      walking_speed: 5.1;
      walkway_factor: 1;
      sidewalk_factor: 1;
      alley_factor: 2;
      driveway_factor: 5;
      step_penalty: 0;
      max_hiking_difficulty: 1;
      use_lit: 0;
      transit_start_end_max_distance: 2145;
      transit_transfer_max_distance: 800;
    };
  };
  exclude_polygons: any[];
  directions_options: {
    units: 'kilometers';
  };
  id: 'valhalla_directions';
}
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

export type LocationType = { lat: number; lon: number } | null;

export interface SearchProps {
  id: number;
  query: string;
  location: LocationType;
  suggestions: FeatureProps[] | null;
}
