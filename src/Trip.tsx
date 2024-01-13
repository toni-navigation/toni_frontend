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
      <div>{maneuver.length * 1000} Meter</div>
      {factor && (
        <div>
          Umgerechnet in Schritte:{' '}
          {Math.ceil((maneuver.length * 1000) / factor)} Schritte
        </div>
      )}
    </div>
  );
}

export default Trip;
