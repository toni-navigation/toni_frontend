import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { distanceOfLatLon } from '../functions/functions';
import { CalibrationProps, CurrentLocationType } from '../types/Types';
import { ValhallaProps } from '../types/Valhalla-Types';

const INITIAL_CALIBRATION: CalibrationProps = {
  factors: [],
  meters: [],
};

type UserState = {
  calibration: CalibrationProps;
  trip: ValhallaProps | null | undefined;
  currentLocation: CurrentLocationType;

  actions: {
    setTrip: (trip: ValhallaProps | null) => void;
    // setCalibrationStart: (currentLocation: CurrentLocationType) => void;
    setCalibration: (
      start: CurrentLocationType,
      end: CurrentLocationType,
      steps: number
    ) => void;
    setCurrentLocation: (currentLocation: CurrentLocationType) => void;
    setResetCalibration: () => void;
    resetStore: () => void;
  };
};

const defaultUserState: Omit<UserState, 'actions'> = {
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
          set((state) => ({
              ...state,
              trip,
            })),
        setResetCalibration: () =>
          set((state) => ({
            ...state,
            calibration: {
              factors: [],
              meters: [],
            },
          })),
        setCalibration: (start, end, steps) =>
          set((state) => {
            const newCalibration = { ...state.calibration };
            newCalibration.start = {
              lat: start?.coords.latitude,
              lon: start?.coords.longitude,
              accuracy: start?.coords.accuracy ?? undefined,
            };
            newCalibration.end = {
              lat: end?.coords.latitude,
              lon: end?.coords.longitude,
              accuracy: end?.coords.accuracy ?? undefined,
            };
            if (start && end) {
              const distance = distanceOfLatLon(
                start.coords.latitude,
                start.coords.longitude,
                end.coords.latitude,
                end.coords.longitude,
                'K'
              );
              const distanceInMeter = distance * 1000;

              newCalibration.meters.push(distanceInMeter);
              newCalibration.factors.push(distanceInMeter / steps);
            }

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
