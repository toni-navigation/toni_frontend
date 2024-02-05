import { create } from 'zustand';
import { CurrentLocationProps } from '../types/Types';

interface CurrentLocationStoreProps {
  currentLocation: CurrentLocationProps | undefined | null;
  setCurrentLocation: (currentLocation: CurrentLocationProps | null) => void;
}
const useCurrentLocationStore = create<CurrentLocationStoreProps>((set) => ({
  currentLocation: undefined,
  setCurrentLocation: (currentLocation) =>
    set((state) => ({ ...state, currentLocation })),
}));
export default useCurrentLocationStore;
