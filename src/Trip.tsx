import React from 'react';
import { ValhallaManeuverProps } from '../types/Valhalla-Types';

interface TripProps {
  maneuver: ValhallaManeuverProps;
}
function Trip(props: TripProps) {
  const { maneuver } = props;

  return <div>{JSON.stringify(maneuver)}</div>;
}

export default Trip;
