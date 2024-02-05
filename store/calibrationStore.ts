import { create } from 'zustand';
import { CalibrateProps, CurrentLocationProps } from '../types/Types';
import { calibrationHelper } from '../src/functions/functions';

const INITIAL_CALIBRATION: CalibrateProps = {
  start: null,
  end: null,
  meters: null,
  factor: null,
};
interface CalibrationStoreProps {
  calibration: CalibrateProps;
  setCalibration: (
    currentLocation: CurrentLocationProps,
    calibration: CalibrateProps
  ) => void;
}
const useCalibrationStore = create<CalibrationStoreProps>((set) => ({
  calibration: INITIAL_CALIBRATION,
  setCalibration: (currentLocation, calibration) =>
    set((state) => {
      const newCalibration = calibrationHelper(currentLocation, calibration);
      return {
        ...state,
        calibration: {
          start: newCalibration.start,
          end: newCalibration.end,
          meters: newCalibration.meters,
          factor: newCalibration.factor,
        },
      };
    }),
}));
export default useCalibrationStore;
