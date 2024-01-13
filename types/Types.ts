export type LocationType = {
  lat: number;
  lon: number;
  accuary?: number;
} | null;
export interface CalibrationProps {
  start: LocationType;
  end: LocationType;
  meters: number | null;
  factor: number | null;
}
