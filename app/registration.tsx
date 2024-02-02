import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { router } from 'expo-router';
import Calibration from '../src/pages/Calibration';
import { CalibrateProps, CurrentLocationProps } from '../types/Types';
import {
  calibrationHelper,
  getCurrentPosition,
} from '../src/functions/functions';

export default function Page() {
  const [currentLocation, setCurrentLocation] =
    useState<CurrentLocationProps | null>();
  const [calibration, setCalibration] = useState<CalibrateProps>({
    start: null,
    end: null,
    meters: null,
    factor: null,
  });
  // const [currentPage, setCurrentPage] = useState<number>(0);
  // const previousPageHandler = () => {
  //   setCurrentPage((prevState) => (prevState > 0 ? prevState - 1 : prevState));
  // };

  const calibrationHandler = () => {
    if (currentLocation) {
      const newCalibration = calibrationHelper(currentLocation, calibration);
      setCalibration((prevState) => {
        return {
          ...prevState,
          ...newCalibration,
        };
      });
    }
  };

  // const nextPageHandler = () => {
  //   setCurrentPage((prevState) => prevState + 1);
  // };

  useEffect(() => {
    (async () => {
      const position = await getCurrentPosition();
      setCurrentLocation(position);
    })();
  }, []);

  return (
    <Calibration
      onCalibrate={calibrationHandler}
      calibration={calibration}
      onClickNext={() => router.replace('/')}
      currentLocation={currentLocation}
    />
  );
}
