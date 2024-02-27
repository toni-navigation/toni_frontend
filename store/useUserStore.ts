import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CalibrationProps,
  CurrentLocationType,
  PointsProps,
} from '../types/Types';
import { PhotonFeatureCollection } from '../types/api-photon';
import { ValhallaProps } from '../types/Valhalla-Types';

const INITIAL_POINTS: PointsProps = {
  start: {},
  destination: {
    query: '',
  },
};

const INITIAL_CALIBRATION: CalibrationProps = {};

type UserState = {
  calibration: CalibrationProps;
  points: PointsProps;
  trip: ValhallaProps | null | undefined;
  currentLocation: CurrentLocationType;

  actions: {
    setTrip: (trip: ValhallaProps | null) => void;
    setDestinationQuery: (value: string) => void;
    setSuggestions: (
      searchLocationData: PhotonFeatureCollection | null
    ) => void;
    setTripData: (newPoints: PointsProps) => void;
    setCalibrationStart: (currentLocation: CurrentLocationType) => void;
    setCalibrationStop: (currentLocation: CurrentLocationType) => void;
    setCurrentLocation: (currentLocation: CurrentLocationType) => void;
    resetStore: () => void;
  };
};

const defaultUserState: Omit<UserState, 'actions'> = {
  points: INITIAL_POINTS,
  trip: undefined,
  currentLocation: undefined,
  calibration: INITIAL_CALIBRATION,
};

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      ...defaultUserState,
      actions: {
        setTrip: (trip: ValhallaProps | null) =>
          set((state) => {
            return {
              ...state,
              trip,
            };
          }),
        setDestinationQuery: (value: string) =>
          set((state) => {
            const newPoints = { ...state.points };
            newPoints.destination.query = value;
            return {
              ...state,
              points: newPoints,
            };
          }),
        setSuggestions: (searchLocationData: PhotonFeatureCollection | null) =>
          set((state) => {
            const newPoints = { ...state.points };
            newPoints.destination.suggestions = searchLocationData;
            return {
              ...state,
              points: newPoints,
            };
          }),
        setTripData: (newPoints: PointsProps) =>
          set((state) => ({ ...state, points: newPoints })),
        setCalibrationStart: (currentLocation) =>
          set((state) => {
            const newCalibration = { ...state.calibration };
            newCalibration.start = {
              lat: currentLocation?.coords.latitude,
              lon: currentLocation?.coords.longitude,
              accuracy: currentLocation?.coords.accuracy,
            };
            newCalibration.end = undefined;

            return {
              ...state,
              calibration: newCalibration,
            };
          }),
        setCalibrationStop: (currentLocation) =>
          set((state) => {
            const newCalibration = { ...state.calibration };

            newCalibration.end = {
              lat: currentLocation?.coords.latitude,
              lon: currentLocation?.coords.longitude,
              accuracy: currentLocation?.coords.accuracy ?? undefined,
            };

            return {
              ...state,
              calibration: newCalibration,
            };
          }),
        setCurrentLocation: (currentLocation) =>
          set((state) => ({ ...state, currentLocation })),

        resetStore: () => set(defaultUserState),
      },
    }),
    {
      name: `USER_STORE`,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ actions, ...rest }) => rest,
      version: 1,
    }
  )
);
export const invalidateStore = () => useUserStore.persist.clearStorage();
export default useUserStore;
