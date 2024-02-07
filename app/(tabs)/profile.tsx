import { router } from 'expo-router';
import Calibration from '../../src/pages/Calibration';
import useUserStore from '../../store/useUserStore';

export default function Page() {
  const { currentLocation, calibration, actions } = useUserStore();
  const calibrationHandler = () => {
    if (currentLocation) {
      actions.setCalibration(currentLocation, calibration);
    }
  };
  return (
    <Calibration
      currentLocation={currentLocation}
      onCalibrate={calibrationHandler}
      calibration={calibration}
      onClickNext={() => router.push('/home')}
    />
  );
}
