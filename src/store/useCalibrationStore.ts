import AsyncStorage from '@react-native-async-storage/async-storage';
import { produce } from 'immer';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { addCalibrationHelper } from '@/functions/addCalibrationHelper';
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
            produce((state) =>
              addCalibrationHelper(start, end, steps, state.calibration)
            )
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
