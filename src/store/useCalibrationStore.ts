import AsyncStorage from '@react-native-async-storage/async-storage';
import { produce } from 'immer';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { distanceOfLatLon } from '@/functions/functions';
import { CalibrationProps, CurrentLocationType } from '@/types/Types';

const INITIAL_CALIBRATION: CalibrationProps = {
  factors: [],
  meters: [],
};

type CalibrationState = {
  calibration: CalibrationProps;
  actions: {
    addCalibration: (
      start: CurrentLocationType,
      end: CurrentLocationType,
      steps: number
    ) => void;
    resetCalibrationStore: () => void;
  };
};

const defaultCalibrationState: Omit<CalibrationState, 'actions'> = {
  calibration: INITIAL_CALIBRATION,
};

export const useCalibrationStore = create<CalibrationState>()(
  persist(
    (set) => ({
      ...defaultCalibrationState,
      actions: {
        addCalibration: (start, end, steps) =>
          set(
            produce((state) => {
              const newCalibration = { ...state.calibration };

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

              state.calibration = newCalibration;
            })
          ),
        resetCalibrationStore: () =>
          set(produce((state) => ({ ...state, ...defaultCalibrationState }))),
      },
    }),
    {
      name: `CALIBRATION_STORE`,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ actions, ...rest }) => rest,
      version: 1,
    }
  )
);

export const invalidateCalibrationStore = () =>
  useCalibrationStore.persist.clearStorage();
