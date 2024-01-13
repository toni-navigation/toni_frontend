import React from 'react';
import { ValhallaManeuverProps } from '../types/Valhalla-Types';

interface TripProps {
  maneuver: ValhallaManeuverProps;
  factor: number | null;
}
function Trip(props: TripProps) {
  const { maneuver, factor } = props;
  return (
    <div>
      <div>
        {maneuver.verbal_pre_transition_instruction}, {maneuver.instruction}
        {maneuver.verbal_post_transition_instruction}
      </div>
      <div>{maneuver.length}</div>
      {factor && (
        <div>Umgerechnet in Schritte: {(maneuver.length * 100) / factor}</div>
      )}
    </div>
  );
}

export default Trip;
