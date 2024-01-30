export type LocationType = {
  lat: number;
  lon: number;
  accuary?: number;
} | null;
export interface CalibrateProps {
  start: LocationType;
  end: LocationType;
  meters: number | null;
  factor: number | null;
}
