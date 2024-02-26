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
  start: {
    query: '',
  },
  destination: {
    query: '',
  },
};

const INITIAL_CALIBRATION: CalibrationProps = {
  isStart: true,
};

type UserState = {
  calibration: CalibrationProps;
  points: PointsProps;
  trip: ValhallaProps | null | undefined;
  currentLocation: CurrentLocationType;

  actions: {
    setTrip: (trip: ValhallaProps) => void;
    setDestinationQuery: (value: string) => void;
    setStartPositionQuery: (value: string) => void;
    setSuggestionsDestination: (
      searchLocationData: PhotonFeatureCollection | null
    ) => void;
    setSuggestionsStart: (
      searchLocationData: PhotonFeatureCollection | null
    ) => void;
    setTripData: (newPoints: PointsProps) => void;
    setCalibration: (currentLocation: CurrentLocationType) => void;
    setCurrentLocation: (currentLocation: CurrentLocationType) => void;
    setStartPosition: (
      reverseData: PhotonFeatureCollection | undefined
    ) => void;
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
        setStartPositionQuery: (value: string) =>
          set((state) => {
            const newPoints = { ...state.points };
            newPoints.start.query = value;
            return {
              ...state,
              points: newPoints,
            };
          }),
        setSuggestionsDestination: (
          searchLocationData: PhotonFeatureCollection | null
        ) =>
          set((state) => {
            const newPoints = { ...state.points };
            newPoints.destination.suggestions = searchLocationData;
            return {
              ...state,
              points: newPoints,
            };
          }),
        setSuggestionsStart: (
          searchLocationData: PhotonFeatureCollection | null
        ) =>
          set((state) => {
            const newPoints = { ...state.points };
            newPoints.start.suggestions = searchLocationData;
            return {
              ...state,
              points: newPoints,
            };
          }),
        setTripData: (newPoints: PointsProps) =>
          set((state) => ({ ...state, points: newPoints })),
        setCalibration: (currentLocation) =>
          set((state) => {
            const newCalibration = { ...state.calibration };
            if (newCalibration.isStart) {
              newCalibration.start = {
                lat: currentLocation?.coords.latitude,
                lon: currentLocation?.coords.longitude,
                accuracy: currentLocation?.coords.accuracy,
              };
              newCalibration.isStart = false;
            } else {
              newCalibration.end = {
                lat: currentLocation?.coords.latitude,
                lon: currentLocation?.coords.longitude,
                accuracy: currentLocation?.coords.accuracy ?? undefined,
              };
              newCalibration.isStart = true;
            }
            return {
              ...state,
              calibration: newCalibration,
            };
          }),
        setCurrentLocation: (currentLocation) =>
          set((state) => ({ ...state, currentLocation })),

        setStartPosition: (reverseData) =>
          set((state) => {
            console.log(
              `${reverseData?.features[0].properties.street} ${reverseData?.features[0].properties.housenumber}, ${reverseData?.features[0].properties.postcode} ${reverseData?.features[0].properties.city}, ${reverseData?.features[0].properties.country}`
            );
            const start = `${reverseData?.features[0].properties.street} ${reverseData?.features[0].properties.housenumber}, ${reverseData?.features[0].properties.postcode} ${reverseData?.features[0].properties.city}, ${reverseData?.features[0].properties.country}`;

            const newPoints = { ...state.points };
            newPoints.start.query = start;
            return {
              ...state,
              points: newPoints,
            };
          }),
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
