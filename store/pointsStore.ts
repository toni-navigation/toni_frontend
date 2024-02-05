import { create } from 'zustand';
import {
  CurrentLocationProps,
  LocationType,
  PointsProps,
} from '../types/Types';
import { ValhallaProps } from '../types/Valhalla-Types';
import { fetchTripHandler } from '../src/functions/fetch';
import {
  NominatimGeoCodeJsonProps,
  SuggestionsProps,
} from '../types/Nominatim-Types';
import { suggestionsHelper } from '../src/functions/functions';

const INITIAL_POINTS: PointsProps = {
  start: {
    query: '',
    location: null,
  },
  destination: {
    query: '',
    location: null,
    suggestions: null,
  },
};
interface PointsStoreProps {
  points: PointsProps;
  setDestinationQuery: (value: string) => void;
  setSuggestions: (searchLocationData: NominatimGeoCodeJsonProps) => void;
  setTripData: (newPoints: PointsProps) => void;
}
const usePointsStore = create<PointsStoreProps>((set) => ({
  points: INITIAL_POINTS,
  setDestinationQuery: (value: string) =>
    set((state) => {
      const newPoints = { ...state.points };
      newPoints.destination.query = value;
      return {
        ...state,
        points: newPoints,
      };
    }),
  setSuggestions: (searchLocationData: NominatimGeoCodeJsonProps) =>
    set((state) => {
      const newPoints = suggestionsHelper(state.points, searchLocationData);
      return {
        ...state,
        points: newPoints,
      };
    }),
  setTripData: (newPoints: PointsProps) =>
    set((state) => ({ ...state, points: newPoints })),
}));
export default usePointsStore;
