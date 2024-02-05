import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CalibrateProps,
  CurrentLocationProps,
  PointsProps,
} from '../types/Types';
import {
  calibrationHelper,
  suggestionsHelper,
} from '../src/functions/functions';
import { PhotonFeatureCollection } from '../types/api-photon';
import { ValhallaProps } from '../types/Valhalla-Types';

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

const INITIAL_CALIBRATION: CalibrateProps = {
  start: null,
  end: null,
  meters: null,
  factor: null,
};

type UserState = {
  calibration: CalibrateProps;
  points: PointsProps;
  trip: ValhallaProps | null | undefined;
  currentLocation: CurrentLocationProps | undefined | null;

  actions: {
    setTrip: (trip: ValhallaProps) => void;
    setDestinationQuery: (value: string) => void;
    setSuggestions: (searchLocationData: PhotonFeatureCollection) => void;
    setTripData: (newPoints: PointsProps) => void;
    setCalibration: (
      currentLocation: CurrentLocationProps,
      calibration: CalibrateProps
    ) => void;
    setCurrentLocation: (currentLocation: CurrentLocationProps | null) => void;
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
        setTrip: (trip: ValhallaProps) =>
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
        setSuggestions: (searchLocationData: PhotonFeatureCollection) =>
          set((state) => {
            const newPoints = suggestionsHelper(
              state.points,
              searchLocationData
            );
            return {
              ...state,
              points: newPoints,
            };
          }),
        setTripData: (newPoints: PointsProps) =>
          set((state) => ({ ...state, points: newPoints })),
        setCalibration: (currentLocation, calibration) =>
          set((state) => {
            const newCalibration = calibrationHelper(
              currentLocation,
              calibration
            );
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
export default useUserStore;
