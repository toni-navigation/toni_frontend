import AsyncStorage from '@react-native-async-storage/async-storage';
import distance from '@turf/distance';
import * as turf from '@turf/helpers';
import { produce } from 'immer';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

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
    immer((set) => ({
      ...defaultCalibrationState,
      actions: {
        addCalibration: (start, end, steps) =>
          set((state) => {
            if (start && end) {
              const from = turf.point([
                start.coords.longitude,
                start.coords.latitude,
              ]);
              const to = turf.point([
                end.coords.longitude,
                end.coords.latitude,
              ]);
              const distanceInMeter = distance(from, to) * 1000;
              state.calibration.meters.push(distanceInMeter);
              state.calibration.factors.push(distanceInMeter / steps);
            }
          }),
        resetCalibrationStore: () =>
          set((state) => ({ ...state, ...defaultCalibrationState })),
      },
    })),
    {
      name: `CALIBRATION_STORE`,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ actions, ...rest }) => rest,
      version: 1,
    }
  )
);
