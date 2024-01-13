export type LocationType = { lat: number; lon: number } | null;
export interface CalibrationProps {
  start: LocationType;
  end: LocationType;
  meters: number | null;
}
