import { lineString } from '@turf/helpers';
import length from '@turf/length';
import lineSlice from '@turf/line-slice';

export function calculateTotalManeuverLength(maneuvers, decodedShape) {
  let totalLength = 0;
  for (let maneuver = 0; maneuver < maneuvers.length - 1; maneuver++) {
    const start = decodedShape.coordinates[maneuvers[maneuver].end_shape_index];
    const end =
      decodedShape.coordinates[maneuvers[maneuver + 1].end_shape_index];
    const sliced = lineSlice(start, end, lineString(decodedShape.coordinates));
    totalLength += length(sliced);
  }

  return parseFloat(totalLength.toFixed(2));
}
