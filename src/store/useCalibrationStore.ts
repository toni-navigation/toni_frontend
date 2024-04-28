import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { getDistanceInMeter } from '@/functions/getDistanceInMeter';
import { CalibrationProps, CurrentLocationType } from '@/types/Types';

const INITIAL_CALIBRATION: CalibrationProps = {
  factors: [],
  meters: [],
};

type CalibrationState = {
  calibration: CalibrationProps;
  skipped: boolean;
  actions: {
    addCalibration: (
      start: CurrentLocationType,
      end: CurrentLocationType,
      steps: number
    ) => void;
    resetCalibrationStore: () => void;
    toggleSkipped: () => void;
  };
};

const defaultCalibrationState: Omit<CalibrationState, 'actions'> = {
  calibration: INITIAL_CALIBRATION,
  skipped: false,
};

export const useCalibrationStore = create<CalibrationState>()(
  persist(
    immer((set) => ({
      ...defaultCalibrationState,
      actions: {
        addCalibration: (start, end, steps) =>
          set((state) => {
            const distanceInMeter = getDistanceInMeter(start, end);
            if (!distanceInMeter) return;
            state.calibration.meters.push(distanceInMeter);
            state.calibration.factors.push(distanceInMeter / steps);
          }),
        toggleSkipped: () =>
          set((state) => ({ ...state, skipped: !state.skipped })),
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
