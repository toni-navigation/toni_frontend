import { create } from 'zustand';
import { ValhallaProps } from '../types/Valhalla-Types';

interface TripStoreProps {
  trip: ValhallaProps | null | undefined;
  setTrip: (trip: ValhallaProps) => void;
}
const useTripStore = create<TripStoreProps>((set) => ({
  trip: undefined,
  setTrip: (trip: ValhallaProps) =>
    set((state) => {
      return {
        ...state,
        trip,
      };
    }),
}));
export default useTripStore;
