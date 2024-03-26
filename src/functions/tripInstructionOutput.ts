import { ValhallaManeuverProps } from '@/types/Valhalla-Types';

export const tripInstructionOutput = (
  maneuver: ValhallaManeuverProps,
  factor: number
) => {
  if (factor) {
    return `${maneuver.instruction} ${maneuver.length * 1000} Meter, Schritte: ${Math.ceil((maneuver.length * 1000) / factor)}`;
  }

  return `${maneuver.instruction} ${maneuver.length * 1000} Meter`;
};
