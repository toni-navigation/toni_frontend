import { ValhallaManeuverProps } from '@/types/Valhalla-Types';
import { calculateSteps } from '@/functions/calculateSteps';

export const tripInstructionOutput = (
  maneuver: ValhallaManeuverProps,
  factor: number
) => {
  if (factor) {
    const stepcount = calculateSteps(maneuver.length, factor);
    if (stepcount > 1) {
      if (
        maneuver.type == 9 ||
        maneuver.type == 10 ||
        maneuver.type == 11 ||
        maneuver.type == 14 ||
        maneuver.type == 15 ||
        maneuver.type == 16
      ) {
        return `In ${stepcount} Schritten ${maneuver.instruction.replace(maneuver.instruction.charAt(0), maneuver.instruction.charAt(0).toLowerCase())}`;
      }
      return `${stepcount} Schritte ${maneuver.instruction.replace(maneuver.instruction.charAt(0), maneuver.instruction.charAt(0).toLowerCase())}`;
    } else {
      return `${maneuver.instruction}`;
    }
  }

  return `${maneuver.instruction} ${maneuver.length * 1000} Meter`;
};
